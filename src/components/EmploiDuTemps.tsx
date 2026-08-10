import {
  JOURS_SEMAINE,
  LIBELLES_TYPE,
  formatHoraire,
  formatMinutes,
  toMinutes,
  type Creneau,
  type CreneauType,
} from "@/lib/saison";

/** Hauteur d'une tranche de 15 minutes, en pixels. */
const ROW_H = 22;
/** Largeur de la colonne des heures. */
const GUTTER = "4.5rem";
/** Deux lignes d'en-tête : le jour, puis le gymnase. */
const LIGNES_ENTETE = 2;

const COULEURS: Record<CreneauType, string> = {
  competition: "bg-gvvb-red text-white",
  formation: "bg-gvvb-navy text-white",
  loisir: "bg-gvvb-teal text-white",
};

/** Créneau et sa position imbriquée au sein d'une largeur de colonne. */
interface Place {
  creneau: Creneau;
  /** Index d'imbrication (0 = à gauche). */
  sub: number;
  /**
   * Nombre de sous-colonnes occupées. Un créneau s'étale sur les sous-colonnes
   * libres à sa droite : le M11 du mardi, que rien ne chevauche, prend toute la
   * largeur du jour même si le créneau suivant se dédouble.
   */
  span: number;
}

/**
 * Une largeur de colonne : un gymnase, un jour. Les créneaux qui s'y
 * chevauchent s'imbriquent côte à côte à l'intérieur de cette largeur.
 */
interface Unite {
  /** null pour un jour sans entraînement. */
  gymnase: string | null;
  places: Place[];
  /** Nombre de créneaux imbriqués simultanément. */
  imbriques: number;
}

interface JourLayout {
  jour: string;
  /** Au moins une unité, même pour un jour vide. */
  unites: Unite[];
  /** Première colonne de grille du jour (1 = colonne des heures). */
  debutCol: number;
}

/**
 * Répartit des créneaux d'un même gymnase en sous-positions : deux créneaux qui
 * se chevauchent ne peuvent pas partager la même. Partitionnement glouton
 * d'intervalles.
 */
function imbriquer(creneaux: Creneau[]): { places: Place[]; imbriques: number } {
  const tries = [...creneaux].sort(
    (a, b) => toMinutes(a.debut) - toMinutes(b.debut) || toMinutes(a.fin) - toMinutes(b.fin),
  );
  const finDeSousColonne: number[] = [];
  const attribues: { creneau: Creneau; sub: number }[] = [];

  for (const creneau of tries) {
    const debut = toMinutes(creneau.debut);
    let sub = finDeSousColonne.findIndex((fin) => fin <= debut);
    if (sub === -1) {
      sub = finDeSousColonne.length;
      finDeSousColonne.push(0);
    }
    finDeSousColonne[sub] = toMinutes(creneau.fin);
    attribues.push({ creneau, sub });
  }

  const imbriques = Math.max(1, finDeSousColonne.length);

  const chevauche = (a: Creneau, b: Creneau) =>
    toMinutes(a.debut) < toMinutes(b.fin) && toMinutes(b.debut) < toMinutes(a.fin);

  const places: Place[] = attribues.map(({ creneau, sub }) => {
    let span = 1;
    while (
      sub + span < imbriques &&
      !attribues.some((autre) => autre.sub === sub + span && chevauche(creneau, autre.creneau))
    ) {
      span += 1;
    }
    return { creneau, sub, span };
  });

  return { places, imbriques };
}

/**
 * Un jour = une largeur de colonne par gymnase. Le mercredi adultes en compte
 * donc deux (Yves Bodin et Le Rallec), tous les autres jours une seule.
 */
function placerJour(creneaux: Creneau[]): Unite[] {
  if (creneaux.length === 0) return [{ gymnase: null, places: [], imbriques: 1 }];

  const parGymnase = new Map<string, Creneau[]>();
  for (const c of creneaux) {
    parGymnase.set(c.gymnase, [...(parGymnase.get(c.gymnase) ?? []), c]);
  }

  return [...parGymnase.entries()]
    .map(([gymnase, liste]) => ({ gymnase, ...imbriquer(liste) }))
    .sort(
      (a, b) =>
        toMinutes(a.places[0].creneau.debut) - toMinutes(b.places[0].creneau.debut) ||
        a.gymnase.localeCompare(b.gymnase),
    );
}

function placerSemaine(semaine: Creneau[]): { jours: JourLayout[]; totalUnites: number } {
  const jours: JourLayout[] = [];
  let debutCol = 2;

  for (const jour of JOURS_SEMAINE) {
    const unites = placerJour(semaine.filter((c) => c.jour === jour));
    jours.push({ jour, unites, debutCol });
    debutCol += unites.length;
  }

  return { jours, totalUnites: debutCol - 2 };
}

function Legende({ types }: { types: CreneauType[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5">
      {types.map((t) => (
        <li key={t} className="flex items-center gap-2">
          <span className={`w-3.5 h-3.5 flex-shrink-0 ${COULEURS[t]}`} aria-hidden="true" />
          <span className="font-heading text-xs uppercase tracking-widest text-gray-500">
            {LIBELLES_TYPE[t]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function EmploiDuTemps({
  creneaux,
  legende,
  fond = "bg-white",
}: {
  creneaux: Creneau[];
  /** Types affichés dans la légende, dans l'ordre voulu. */
  legende: CreneauType[];
  /**
   * Couleur de fond de la section hôte. La colonne des heures est collante
   * pendant le scroll horizontal : il lui faut un fond opaque assorti.
   */
  fond?: string;
}) {
  const semaine = creneaux.filter((c) => (JOURS_SEMAINE as readonly string[]).includes(c.jour));

  // Plage horaire calée sur les demi-heures encadrant les créneaux.
  const debutMin = Math.floor(Math.min(...semaine.map((c) => toMinutes(c.debut))) / 30) * 30;
  const finMin = Math.ceil(Math.max(...semaine.map((c) => toMinutes(c.fin))) / 30) * 30;
  const nbLignes = (finMin - debutMin) / 15;

  /** Ligne de grille correspondant à une heure. */
  const ligne = (minutes: number) => (minutes - debutMin) / 15 + 1 + LIGNES_ENTETE;
  const derniereLigne = nbLignes + LIGNES_ENTETE;

  const { jours, totalUnites } = placerSemaine(semaine);

  // Toutes les colonnes ont la même largeur ; on la dimensionne sur l'unité la
  // plus chargée pour que les créneaux imbriqués restent lisibles.
  const maxImbriques = Math.max(...jours.flatMap((j) => j.unites.map((u) => u.imbriques)));
  const largeurUnite = maxImbriques > 1 ? "10.5rem" : "7rem";

  const marques = Array.from(
    { length: (finMin - debutMin) / 30 + 1 },
    (_, i) => debutMin + i * 30,
  );

  return (
    <>
      <Legende types={legende} />

      <div className="overflow-x-auto pb-2">
        <div
          className="grid"
          style={{
            minWidth: `calc(${GUTTER} + ${totalUnites} * ${largeurUnite})`,
            gridTemplateColumns: `${GUTTER} repeat(${totalUnites}, minmax(0, 1fr))`,
            gridTemplateRows: `auto auto repeat(${nbLignes}, ${ROW_H}px)`,
          }}
        >
          {/* Fond alterné par jour + frontières de jour, pour distinguer les colonnes */}
          {jours.map((j, i) => (
            <div
              key={`fond-${j.jour}`}
              aria-hidden="true"
              className={`border-l-2 border-gvvb-navy/25 ${i % 2 === 1 ? "bg-black/[0.03]" : ""}`}
              style={{
                gridColumn: `${j.debutCol} / span ${j.unites.length}`,
                gridRow: `${LIGNES_ENTETE + 1} / span ${nbLignes}`,
              }}
            />
          ))}
          {/* Séparation interne entre deux gymnases d'un même jour */}
          {jours.flatMap((j) =>
            j.unites.slice(1).map((u, k) => (
              <div
                key={`sep-${j.jour}-${u.gymnase}`}
                aria-hidden="true"
                className="border-l border-dashed border-gray-400"
                style={{
                  gridColumn: j.debutCol + k + 1,
                  gridRow: `${LIGNES_ENTETE + 1} / span ${nbLignes}`,
                }}
              />
            )),
          )}
          {/* Bandes de demi-heure */}
          {marques.slice(0, -1).map((t) => (
            <div
              key={`bande-${t}`}
              aria-hidden="true"
              className="border-t border-gray-200"
              style={{ gridColumn: "2 / -1", gridRow: `${ligne(t)} / span 2` }}
            />
          ))}
          <div
            aria-hidden="true"
            className="border-b border-gray-300"
            style={{ gridColumn: "2 / -1", gridRow: derniereLigne }}
          />
          <div
            aria-hidden="true"
            className="border-r-2 border-gvvb-navy/25"
            style={{ gridColumn: totalUnites + 1, gridRow: `${LIGNES_ENTETE + 1} / span ${nbLignes}` }}
          />

          {/* Colonne des heures — reste visible pendant le scroll horizontal */}
          <div
            aria-hidden="true"
            className={`sticky left-0 z-20 ${fond}`}
            style={{ gridColumn: 1, gridRow: "1 / -1" }}
          />
          {marques.map((t, i) => {
            const dernier = i === marques.length - 1;
            return (
              <span
                key={`heure-${t}`}
                className={`sticky left-0 z-30 font-heading text-xs text-gray-400 tabular-nums pr-3 text-right ${
                  dernier ? "self-end pb-0.5" : "self-start pt-0.5"
                }`}
                style={{ gridColumn: 1, gridRow: dernier ? derniereLigne : ligne(t) }}
              >
                {formatMinutes(t)}
              </span>
            );
          })}

          {/* En-têtes : le jour, puis le gymnase de chaque largeur de colonne */}
          {jours.map((j, i) => (
            <div
              key={`tete-${j.jour}`}
              className={`bg-gvvb-navy text-white font-heading text-sm uppercase tracking-wider text-center py-2.5 px-1 ${
                i > 0 ? "border-l-2 border-white/30" : ""
              }`}
              style={{ gridColumn: `${j.debutCol} / span ${j.unites.length}`, gridRow: 1 }}
            >
              {j.jour}
            </div>
          ))}
          {jours.flatMap((j, i) =>
            j.unites.map((u, k) => (
              <div
                key={`gym-${j.jour}-${u.gymnase ?? "vide"}`}
                className={`bg-gvvb-navy-dark text-white/70 text-[0.68rem] text-center py-1.5 px-1 truncate ${
                  i > 0 && k === 0 ? "border-l-2 border-white/30" : ""
                } ${k > 0 ? "border-l border-dashed border-white/30" : ""}`}
                style={{ gridColumn: j.debutCol + k, gridRow: 2 }}
              >
                {u.gymnase ?? "—"}
              </div>
            )),
          )}

          {/* Créneaux */}
          {jours.flatMap((j) =>
            j.unites.flatMap((u, k) =>
              u.places.map(({ creneau, sub, span }) => (
                <div
                  key={`${j.jour}-${creneau.debut}-${creneau.groupe}`}
                  className="relative z-10 p-px"
                  style={{
                    gridColumn: j.debutCol + k,
                    gridRow: `${ligne(toMinutes(creneau.debut))} / ${ligne(toMinutes(creneau.fin))}`,
                    width: `${(100 / u.imbriques) * span}%`,
                    marginLeft: `${(100 / u.imbriques) * sub}%`,
                  }}
                >
                  <div className={`h-full px-2 py-1.5 overflow-hidden ${COULEURS[creneau.type]}`}>
                    <span className="sr-only">{j.jour} · </span>
                    <span className="font-heading font-bold text-xs sm:text-sm leading-tight block">
                      {creneau.groupe}
                    </span>
                    <span className="text-[0.68rem] leading-tight block opacity-80 tabular-nums mt-0.5">
                      {formatHoraire(creneau)}
                    </span>
                    <span className="text-[0.68rem] leading-tight block opacity-90 mt-0.5">
                      {creneau.gymnase}
                    </span>
                    <span className="sr-only"> ({creneau.ville}) — {LIBELLES_TYPE[creneau.type]}</span>
                  </div>
                </div>
              )),
            ),
          )}
        </div>
      </div>
    </>
  );
}
