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
/** Largeur minimale d'un créneau simultané — pilote le scroll horizontal. */
const COL_MIN = "7rem";
/** Largeur de la colonne des heures. */
const GUTTER = "4.5rem";

const COULEURS: Record<CreneauType, string> = {
  competition: "bg-gvvb-red text-white",
  formation: "bg-gvvb-navy text-white",
  loisir: "bg-gvvb-teal text-white",
};

/** Créneau enrichi de sa sous-colonne, calculée par jour. */
interface Place {
  creneau: Creneau;
  /** Index de la sous-colonne au sein du jour (0 = la plus à gauche). */
  sub: number;
}

/**
 * Répartit les créneaux d'un jour en sous-colonnes : deux créneaux qui se
 * chevauchent ne peuvent pas partager la même sous-colonne. Algorithme glouton
 * classique de partitionnement d'intervalles.
 */
function placerJour(creneaux: Creneau[]): { places: Place[]; subCols: number } {
  const tries = [...creneaux].sort(
    (a, b) => toMinutes(a.debut) - toMinutes(b.debut) || toMinutes(a.fin) - toMinutes(b.fin),
  );
  const finDeSousColonne: number[] = [];
  const places: Place[] = [];

  for (const creneau of tries) {
    const debut = toMinutes(creneau.debut);
    let sub = finDeSousColonne.findIndex((fin) => fin <= debut);
    if (sub === -1) {
      sub = finDeSousColonne.length;
      finDeSousColonne.push(0);
    }
    finDeSousColonne[sub] = toMinutes(creneau.fin);
    places.push({ creneau, sub });
  }

  // Un jour sans créneau occupe quand même une colonne, pour rester lisible.
  return { places, subCols: Math.max(1, finDeSousColonne.length) };
}

interface Colonne {
  jour: string;
  places: Place[];
  subCols: number;
  /** Première colonne de grille occupée par ce jour (1 = colonne des heures). */
  debutCol: number;
}

/**
 * Attribue à chaque jour autant de colonnes de grille qu'il a de créneaux
 * simultanés : tous les blocs de la semaine gardent ainsi la même largeur,
 * quel que soit le jour.
 */
function placerSemaine(semaine: Creneau[]): { colonnes: Colonne[]; totalSubCols: number } {
  const colonnes: Colonne[] = [];
  let debutCol = 2;

  for (const jour of JOURS_SEMAINE) {
    const { places, subCols } = placerJour(semaine.filter((c) => c.jour === jour));
    colonnes.push({ jour, places, subCols, debutCol });
    debutCol += subCols;
  }

  return { colonnes, totalSubCols: debutCol - 2 };
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

  /** Ligne de grille correspondant à une heure (1 = en-tête). */
  const ligne = (minutes: number) => (minutes - debutMin) / 15 + 2;

  const { colonnes, totalSubCols } = placerSemaine(semaine);

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
            minWidth: `calc(${GUTTER} + ${totalSubCols} * ${COL_MIN})`,
            gridTemplateColumns: `${GUTTER} repeat(${totalSubCols}, minmax(0, 1fr))`,
            gridTemplateRows: `auto repeat(${nbLignes}, ${ROW_H}px)`,
          }}
        >
          {/* Bandes de demi-heure + séparateurs verticaux (décor) */}
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
            style={{ gridColumn: "2 / -1", gridRow: nbLignes + 1 }}
          />
          {colonnes.map((c) => (
            <div
              key={`sep-${c.jour}`}
              aria-hidden="true"
              className="border-l border-gray-200"
              style={{ gridColumn: `${c.debutCol} / span ${c.subCols}`, gridRow: `2 / span ${nbLignes}` }}
            />
          ))}

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
                style={{ gridColumn: 1, gridRow: dernier ? nbLignes + 1 : ligne(t) }}
              >
                {formatMinutes(t)}
              </span>
            );
          })}

          {/* En-têtes de jours */}
          {colonnes.map((c) => (
            <div
              key={`tete-${c.jour}`}
              className="bg-gvvb-navy text-white font-heading text-xs uppercase tracking-wider text-center py-2.5 px-1"
              style={{ gridColumn: `${c.debutCol} / span ${c.subCols}`, gridRow: 1 }}
            >
              {c.jour}
            </div>
          ))}

          {/* Créneaux */}
          {colonnes.flatMap((c) =>
            c.places.map(({ creneau, sub }) => (
              <div
                key={`${c.jour}-${creneau.debut}-${creneau.groupe}`}
                className={`relative z-10 m-0.5 px-2 py-1.5 overflow-hidden ${COULEURS[creneau.type]}`}
                style={{
                  gridColumn: c.debutCol + sub,
                  gridRow: `${ligne(toMinutes(creneau.debut))} / ${ligne(toMinutes(creneau.fin))}`,
                }}
              >
                <span className="sr-only">{c.jour} · </span>
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
            )),
          )}
        </div>
      </div>
    </>
  );
}
