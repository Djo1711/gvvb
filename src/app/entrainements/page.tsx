import PageHeader from "@/components/PageHeader";
import EmploiDuTemps from "@/components/EmploiDuTemps";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CATEGORIES_AGE,
  CRENEAUX_ADULTES,
  CRENEAUX_COMPETITION,
  CRENEAUX_JEUNES,
  CRENEAUX_LOISIR,
  JOURS_WEEKEND,
  LIBELLES_TYPE,
  NOTE_CRENEAUX,
  SAISON_CLUB,
  formatHoraire,
  type Creneau,
} from "@/lib/saison";

export const metadata: Metadata = {
  title: "Entraînements & Horaires",
  description: `Emploi du temps des entraînements du GVVB à Garches et Vaucresson pour la saison ${SAISON_CLUB}.`,
};

function TableauDetaille({ rows, groupeLabel }: { rows: Creneau[]; groupeLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[38rem]">
        <thead>
          <tr className="bg-gvvb-red text-white font-heading uppercase tracking-wide text-xs">
            <th scope="col" className="py-3 px-4 text-left">Jour</th>
            <th scope="col" className="py-3 px-4 text-left">Horaire</th>
            <th scope="col" className="py-3 px-4 text-left">Ville</th>
            <th scope="col" className="py-3 px-4 text-left">Gymnase</th>
            <th scope="col" className="py-3 px-4 text-left">{groupeLabel}</th>
            <th scope="col" className="py-3 px-4 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.jour}-${row.debut}-${row.groupe}-${row.type}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="py-3 px-4 font-medium text-gvvb-navy">{row.jour}</td>
              <td className="py-3 px-4 text-gray-700 whitespace-nowrap tabular-nums">{formatHoraire(row)}</td>
              <td className="py-3 px-4 text-gray-600">{row.ville}</td>
              <td className="py-3 px-4 text-gray-600">{row.gymnase}</td>
              <td className="py-3 px-4 text-gray-700">{row.groupe}</td>
              <td className="py-3 px-4 text-gray-500">{LIBELLES_TYPE[row.type]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListeDetaillee() {
  return (
    <details className="border border-gray-200 mt-8 group">
      <summary className="px-5 py-4 cursor-pointer font-heading text-sm uppercase tracking-wider text-gvvb-navy hover:text-gvvb-red transition-colors flex items-center gap-2">
        <svg
          className="w-4 h-4 transition-transform group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Voir la liste détaillée
      </summary>
      <div className="border-t border-gray-200 p-5 flex flex-col gap-8">
        <div>
          <h3 className="font-heading font-bold text-lg text-gvvb-navy mb-3">Jeunes</h3>
          <TableauDetaille rows={CRENEAUX_JEUNES} groupeLabel="Catégorie" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-gvvb-navy mb-3">Seniors Loisirs Mixte</h3>
          <TableauDetaille rows={CRENEAUX_LOISIR} groupeLabel="Type" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-gvvb-navy mb-3">
            Seniors Compétition Départementale
          </h3>
          <TableauDetaille rows={CRENEAUX_COMPETITION} groupeLabel="Équipe" />
        </div>
      </div>
    </details>
  );
}

export default function Entrainements() {
  return (
    <>
      <PageHeader
        label={`Saison ${SAISON_CLUB}`}
        title="Entraînements & Horaires"
        description="L'emploi du temps de la semaine, catégorie par catégorie et gymnase par gymnase."
        bgImage="/equipes/dep-feminine.jpg"
        objectPosition="center 40%"
      />

      {/* Note de confirmation */}
      <section className="bg-gvvb-navy px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <svg className="w-5 h-5 text-gvvb-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-300 text-sm">{NOTE_CRENEAUX}</p>
        </div>
      </section>

      {/* Jeunes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Du M11 au M21
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-2">
            Emploi du temps — Jeunes
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Tous les créneaux jeunes ont lieu à Garches. Plusieurs catégories peuvent
            partager le même gymnase au même horaire, sur deux terrains — et le
            créneau M13 / M15 Filles accueille à la fois la compétition et le loisir.
          </p>
          <EmploiDuTemps creneaux={CRENEAUX_JEUNES} legende={["competition", "loisir"]} />
        </div>
      </section>

      {/* Adultes */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Seniors
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-2">
            Emploi du temps — Adultes
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Loisir et compétition départementale, du lundi au vendredi.
          </p>
          <EmploiDuTemps
            creneaux={CRENEAUX_ADULTES}
            legende={["competition", "loisir"]}
            fond="bg-gray-50"
          />

          {/* Le dimanche a sa propre plage horaire : grille distincte */}
          <h3 className="font-heading font-bold text-xl text-gvvb-navy mt-12 mb-2">
            Le week-end
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Le dimanche suit d&apos;autres horaires : jeu libre le matin, puis les
            matchs des deux équipes départementales l&apos;après-midi.
          </p>
          <EmploiDuTemps
            creneaux={CRENEAUX_ADULTES}
            legende={["competition", "loisir"]}
            jours={JOURS_WEEKEND}
            fond="bg-gray-50"
          />
        </div>
      </section>

      {/* Catégories d'âge + liste détaillée */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Référence
          </span>
          <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-6">
            Catégories d&apos;âge
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES_AGE.map((c) => (
              <div key={c.cat} className="bg-white border border-gray-200 p-4 text-center">
                <span className="font-heading font-bold text-lg text-gvvb-navy block">{c.cat}</span>
                <span className="text-xs text-gray-500 mt-1 block">{c.detail}</span>
              </div>
            ))}
          </div>

          <ListeDetaillee />
        </div>
      </section>

      {/* Contact inscription */}
      <section className="bg-gvvb-red py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-white">Envie de nous rejoindre ?</h2>
            <p className="text-red-100 mt-1">
              Consultez les tarifs et le dossier d&apos;inscription, ou venez essayer un créneau.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/inscription"
              className="bg-white text-gvvb-red font-heading font-semibold px-8 py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              S&apos;inscrire
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-heading font-semibold px-8 py-3 uppercase tracking-wider hover:bg-white hover:text-gvvb-red transition-colors whitespace-nowrap"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
