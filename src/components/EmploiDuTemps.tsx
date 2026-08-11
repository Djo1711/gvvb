import {
  JOURS_SEMAINE,
  LIBELLES_TYPE,
  afficheCompetition,
  formatHoraire,
  formatMinutes,
  toMinutes,
  type Creneau,
  type CreneauType,
} from "@/lib/saison";

/** Largeur de la colonne des heures. Doit contenir « 10h30 » en `text-sm`. */
const GUTTER = "4rem";
/** Largeur d'une colonne de jour sans entraînement, réduite à un « … ». */
const LARGEUR_VIDE = "2rem";
/** Deux lignes d'en-tête : le jour, puis le gymnase. */
const LIGNES_ENTETE = 2;

/** Une ligne de grille = un quart d'heure. */
const PAS_LIGNE = 15;
/**
 * Hauteur du corps, **identique dans toutes les grilles** : c'est elle qui rend
 * le tableau du dimanche aussi haut que celui de la semaine, alors qu'il couvre
 * trois fois plus de temps. Conséquence assumée : l'échelle minutes/pixel
 * diffère d'une grille à l'autre.
 */
const HAUTEUR_CORPS = 330;
/** Laisse respirer le libellé de l'heure de fin, centré sur le dernier trait. */
const LIGNE_DEBORD = 12;
/** Écart minimal acceptable entre deux libellés d'heure. */
const ECART_MIN_GRADUATION = 34;

/**
 * Cale la plage horaire, le pas des graduations et la hauteur de ligne pour que
 * le corps mesure toujours HAUTEUR_CORPS.
 *
 * Le pas retenu est le plus fin qui laisse au moins ECART_MIN_GRADUATION entre
 * deux libellés, et les bornes sont arrondies **sur ce pas** — sans quoi le
 * dimanche, qui démarre à 10h30, ne tomberait pas juste avec des graduations
 * horaires et son dernier intervalle serait deux fois plus court.
 */
function echelle(minDebut: number, maxFin: number) {
  const candidats = [30, 60].map((pas) => {
    const debutMin = Math.floor(minDebut / pas) * pas;
    const finMin = Math.ceil(maxFin / pas) * pas;
    const nbLignes = (finMin - debutMin) / PAS_LIGNE;
    const rowH = HAUTEUR_CORPS / nbLignes;
    return { pas, debutMin, finMin, nbLignes, rowH, ecart: (pas / PAS_LIGNE) * rowH };
  });
  return candidats.find((c) => c.ecart >= ECART_MIN_GRADUATION) ?? candidats[candidats.length - 1];
}

/** Mêmes deux couleurs dans toutes les grilles, jeunes comme adultes. */
const COULEURS: Record<CreneauType, string> = {
  competition: "bg-gvvb-red text-white",
  loisir: "bg-gvvb-navy text-white",
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
  gymnase: string;
  places: Place[];
  /** Nombre de créneaux imbriqués simultanément. */
  imbriques: number;
}

interface JourLayout {
  jour: string;
  unites: Unite[];
  /** Un jour sans entraînement : une colonne étroite marquée « … ». */
  vide: boolean;
  /** Première colonne de grille du jour (1 = colonne des heures). */
  debutCol: number;
  /** Nombre de colonnes de grille occupées. */
  nbCols: number;
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

function placerSemaine(
  creneaux: Creneau[],
  jours: readonly string[],
): { layout: JourLayout[]; gabarit: string; minWidth: string; maxWidth: string } {
  let debutCol = 2;
  const layout: JourLayout[] = [];

  for (const jour of jours) {
    const unites = placerJour(creneaux.filter((c) => c.jour === jour));
    const vide = unites.length === 0;
    const nbCols = vide ? 1 : unites.length;
    layout.push({ jour, unites, vide, debutCol, nbCols });
    debutCol += nbCols;
  }

  // Colonnes de jour toutes de la même largeur, dimensionnée sur l'unité la
  // plus chargée pour que les créneaux imbriqués restent lisibles. Le facteur
  // est calé pour que la semaine complète des adultes (sept largeurs plus le
  // samedi) tienne dans le conteneur d'un écran de bureau sans scroll.
  const maxImbriques = Math.max(1, ...layout.flatMap((j) => j.unites.map((u) => u.imbriques)));
  const largeurUnite = `${Math.max(7, maxImbriques * 5)}rem`;

  const gabarit = [
    GUTTER,
    ...layout.flatMap((j) =>
      j.vide ? [LARGEUR_VIDE] : Array(j.nbCols).fill("minmax(0, 1fr)"),
    ),
  ].join(" ");

  const minWidth = `calc(${GUTTER}${layout
    .map((j) => (j.vide ? ` + ${LARGEUR_VIDE}` : ` + ${j.nbCols} * ${largeurUnite}`))
    .join("")})`;

  // Plafond de largeur : sans lui, une grille à peu de colonnes (le week-end)
  // verrait ses `1fr` s'étirer sur toute la page. Ne mord que dans ce cas.
  const largeurUniteMax = `${maxImbriques * 9}rem`;
  const maxWidth = `calc(${GUTTER}${layout
    .map((j) => (j.vide ? ` + ${LARGEUR_VIDE}` : ` + ${j.nbCols} * ${largeurUniteMax}`))
    .join("")})`;

  return { layout, gabarit, minWidth, maxWidth };
}

/** Légende du code couleur. Exportée pour être partagée par plusieurs grilles. */
export function Legende({ types }: { types: CreneauType[] }) {
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
  jours = JOURS_SEMAINE,
  fond = "bg-white",
}: {
  creneaux: Creneau[];
  /**
   * Types affichés dans la légende, dans l'ordre voulu. À omettre quand
   * plusieurs grilles se partagent une légende unique rendue par la page.
   */
  legende?: CreneauType[];
  /** Jours affichés en colonnes, dans l'ordre. */
  jours?: readonly string[];
  /**
   * Couleur de fond de la section hôte. La colonne des heures est collante
   * pendant le scroll horizontal : il lui faut un fond opaque assorti.
   */
  fond?: string;
}) {
  const affiches = creneaux.filter((c) => jours.includes(c.jour));

  const { pas, debutMin, finMin, nbLignes, rowH } = echelle(
    Math.min(...affiches.map((c) => toMinutes(c.debut))),
    Math.max(...affiches.map((c) => toMinutes(c.fin))),
  );

  /** Ligne de grille correspondant à une heure. */
  const ligne = (minutes: number) => (minutes - debutMin) / PAS_LIGNE + 1 + LIGNES_ENTETE;
  const derniereLigne = nbLignes + LIGNES_ENTETE;
  const corps = `${LIGNES_ENTETE + 1} / span ${nbLignes}`;

  const { layout, gabarit, minWidth, maxWidth } = placerSemaine(affiches, jours);
  const totalCols = layout.reduce((n, j) => n + j.nbCols, 0);

  // Graduations régulières : les bornes sont arrondies sur le pas retenu.
  const marques = Array.from(
    { length: (finMin - debutMin) / pas + 1 },
    (_, i) => debutMin + i * pas,
  );

  return (
    <>
      {legende && <Legende types={legende} />}

      <div className="overflow-x-auto pb-2">
        <div
          className="grid"
          style={{
            minWidth,
            maxWidth,
            gridTemplateColumns: gabarit,
            /* Ligne de débord finale : les libellés d'heure étant centrés sur
               leur trait, celui de l'heure de fin déborde sous le corps. */
            gridTemplateRows: `auto auto repeat(${nbLignes}, ${rowH}px) ${LIGNE_DEBORD}px`,
          }}
        >
          {/* Fond alterné par jour + frontières de jour, pour distinguer les colonnes */}
          {layout.map((j, i) => (
            <div
              key={`fond-${j.jour}`}
              aria-hidden="true"
              className={`border-l-2 border-gvvb-navy/25 ${i % 2 === 1 ? "bg-black/[0.03]" : ""}`}
              style={{ gridColumn: `${j.debutCol} / span ${j.nbCols}`, gridRow: corps }}
            />
          ))}
          {/* Séparation interne entre deux gymnases d'un même jour */}
          {layout.flatMap((j) =>
            j.unites.slice(1).map((u, k) => (
              <div
                key={`sep-${j.jour}-${u.gymnase}`}
                aria-hidden="true"
                className="border-l border-dashed border-gray-400"
                style={{ gridColumn: j.debutCol + k + 1, gridRow: corps }}
              />
            )),
          )}
          {/* Bandes entre deux graduations */}
          {marques.slice(0, -1).map((t) => (
            <div
              key={`bande-${t}`}
              aria-hidden="true"
              className="border-t border-gray-200"
              style={{
                gridColumn: "2 / -1",
                gridRow: `${ligne(t)} / span ${pas / PAS_LIGNE}`,
              }}
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
            style={{ gridColumn: totalCols + 1, gridRow: corps }}
          />

          {/* Colonne des heures - reste visible pendant le scroll horizontal */}
          <div
            aria-hidden="true"
            className={`sticky left-0 z-20 ${fond}`}
            style={{ gridColumn: 1, gridRow: "1 / -1" }}
          />
          {marques.map((t, i) => (
            <span
              key={`heure-${t}`}
              /* Centré sur son trait via -translate-y-1/2 : calé par le haut, le
                 texte pendait sous la ligne et paraissait décalé. */
              className="sticky left-0 z-30 self-start -translate-y-1/2 leading-none font-heading text-sm font-medium text-gvvb-navy tabular-nums pr-3 text-right"
              style={{
                gridColumn: 1,
                // La dernière graduation tombe sur la ligne de débord.
                gridRow: i === marques.length - 1 ? derniereLigne + 1 : ligne(t),
              }}
            >
              {formatMinutes(t)}
            </span>
          ))}

          {/* En-têtes : le jour, puis le gymnase de chaque largeur de colonne */}
          {layout.map((j, i) => (
            <div
              key={`tete-${j.jour}`}
              title={j.vide ? `${j.jour} - pas d'entraînement` : undefined}
              className={`bg-gvvb-navy text-white font-heading uppercase tracking-wider text-center py-2.5 px-1 ${
                j.vide ? "text-gray-400 text-base" : "text-sm"
              } ${i > 0 ? "border-l-2 border-white/30" : ""}`}
              style={{ gridColumn: `${j.debutCol} / span ${j.nbCols}`, gridRow: 1 }}
            >
              {j.vide ? (
                <>
                  <span aria-hidden="true">…</span>
                  <span className="sr-only">{j.jour} - pas d&apos;entraînement</span>
                </>
              ) : (
                j.jour
              )}
            </div>
          ))}
          {layout.flatMap((j, i) =>
            j.vide
              ? [
                  <div
                    key={`gym-${j.jour}`}
                    aria-hidden="true"
                    className={`bg-gvvb-navy-dark py-1.5 border-b-2 border-white ${
                      i > 0 ? "border-l-2 border-l-white/30" : ""
                    }`}
                    style={{ gridColumn: j.debutCol, gridRow: 2 }}
                  />,
                ]
              : j.unites.map((u, k) => (
                  <div
                    key={`gym-${j.jour}-${u.gymnase}`}
                    /* Le filet blanc du bas évite qu'un bloc loisir, marine lui
                       aussi, se fonde dans l'en-tête juste au-dessus. */
                    className={`bg-gvvb-navy-dark text-white/70 text-[0.68rem] text-center py-1.5 px-1 truncate border-b-2 border-b-white ${
                      i > 0 && k === 0 ? "border-l-2 border-l-white/30" : ""
                    } ${k > 0 ? "border-l border-dashed border-l-white/30" : ""}`}
                    style={{ gridColumn: j.debutCol + k, gridRow: 2 }}
                  >
                    {u.gymnase}
                  </div>
                )),
          )}

          {/* Créneaux */}
          {layout.flatMap((j) =>
            j.unites.flatMap((u, k) =>
              u.places.map(({ creneau, sub, span }) => (
                <div
                  key={`${j.jour}-${creneau.debut}-${creneau.groupe}-${creneau.type}`}
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
                    {afficheCompetition(creneau) && (
                      <span className="font-heading text-[0.6rem] uppercase tracking-widest block opacity-70 leading-tight">
                        Compétition
                      </span>
                    )}
                    <span className="font-heading font-bold text-xs leading-tight block hyphens-auto break-words">
                      {creneau.groupe}
                    </span>
                    <span className="text-[0.68rem] leading-tight block opacity-80 tabular-nums mt-0.5">
                      {formatHoraire(creneau)}
                    </span>
                    <span className="text-[0.68rem] leading-tight block opacity-90 mt-0.5">
                      {creneau.gymnase}
                    </span>
                    <span className="sr-only"> ({creneau.ville})</span>
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
