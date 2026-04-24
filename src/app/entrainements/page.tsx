import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entraînements & Horaires",
  description: "Horaires et lieux d'entraînement du GVVB à Garches et Vaucresson.",
};

const ageCategories = [
  { cat: "SENIORS", detail: "Né(e) en 2004 et avant" },
  { cat: "M21", detail: "Né(e) en 2005 / 2006 / 2007" },
  { cat: "M18", detail: "Né(e) en 2008 / 2009 / 2010" },
  { cat: "M15", detail: "Né(e) en 2011 / 2012" },
  { cat: "M13", detail: "Né(e) en 2013 / 2014" },
  { cat: "M11", detail: "Né(e) en 2015 / 2016" },
];

const creneauxJeunes = [
  { jour: "Mardi", horaire: "17h – 18h30", ville: "Garches", gymnase: "Le Rallec", categorie: "M11" },
  { jour: "Mardi", horaire: "18h30 – 20h15", ville: "Garches", gymnase: "Le Rallec", categorie: "M13 / M15 Garçons" },
  { jour: "Mercredi", horaire: "18h30 – 20h30", ville: "Garches", gymnase: "Le Rallec", categorie: "M13 / M15 Filles" },
  { jour: "Vendredi", horaire: "18h30 – 20h30", ville: "Garches", gymnase: "Y. Bodin", categorie: "M18 / M21" },
];

const creneauxLoisir = [
  { jour: "Lundi", horaire: "20h – 22h30", ville: "Vaucresson", gymnase: "Yves du Manoir", type: "Loisirs Compétition" },
  { jour: "Mardi", horaire: "20h15 – 22h30", ville: "Garches", gymnase: "Le Rallec", type: "Loisirs" },
  { jour: "Mercredi", horaire: "20h30 – 22h30", ville: "Garches", gymnase: "Le Rallec", type: "Loisirs" },
  { jour: "Vendredi", horaire: "20h30 – 22h30", ville: "Garches", gymnase: "Y. Bodin", type: "Loisirs" },
  { jour: "Dimanche", horaire: "10h30 – 13h", ville: "Garches", gymnase: "Y. Bodin", type: "Jeu libre" },
];

const creneauxCompet = [
  { jour: "Mercredi", horaire: "20h – 22h30", ville: "Garches", gymnase: "Y. Bodin", type: "Féminines" },
  { jour: "Jeudi", horaire: "20h – 22h30", ville: "Vaucresson", gymnase: "Yves du Manoir", type: "Garçons" },
  { jour: "Dimanche", horaire: "13h – 18h", ville: "Garches", gymnase: "Y. Bodin", type: "Compétition féminines" },
  { jour: "Dimanche", horaire: "13h – 18h", ville: "Vaucresson", gymnase: "Yves du Manoir", type: "Compétitions Garçons" },
];

function ScheduleTable({ rows }: { rows: { jour: string; horaire: string; ville: string; gymnase: string; [key: string]: string }[] }) {
  const lastKey = Object.keys(rows[0]).at(-1)!;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gvvb-red text-white font-heading uppercase tracking-wide text-xs">
            <th className="py-3 px-4 text-left">Jour</th>
            <th className="py-3 px-4 text-left">Horaire</th>
            <th className="py-3 px-4 text-left">Ville</th>
            <th className="py-3 px-4 text-left">Gymnase</th>
            <th className="py-3 px-4 text-left">{lastKey === "categorie" ? "Catégorie" : "Type"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="py-3 px-4 font-medium text-gvvb-navy">{row.jour}</td>
              <td className="py-3 px-4 text-gray-700">{row.horaire}</td>
              <td className="py-3 px-4 text-gray-600">{row.ville}</td>
              <td className="py-3 px-4 text-gray-600">{row.gymnase}</td>
              <td className="py-3 px-4 text-gray-700">{row[lastKey]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Entrainements() {
  return (
    <>
      <PageHeader
        label="Organisation"
        title="Entraînements & Horaires"
        description="Retrouvez tous les créneaux d'entraînement pour chaque catégorie dans nos gymnases."
        bgImage="/equipes/dep-feminine.jpg"
      />

      {/* Catégories d'âge */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Référence
          </span>
          <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-6">
            Catégories d&apos;âge
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ageCategories.map((c) => (
              <div key={c.cat} className="bg-white border border-gray-200 p-4 text-center">
                <span className="font-heading font-bold text-lg text-gvvb-navy block">{c.cat}</span>
                <span className="text-xs text-gray-500 mt-1 block">{c.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jeunes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Formations
          </span>
          <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-6">
            Jeunes
          </h2>
          <ScheduleTable rows={creneauxJeunes} />
        </div>
      </section>

      {/* Seniors Loisir */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Adultes
          </span>
          <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-6">
            Seniors Loisirs Mixte
          </h2>
          <ScheduleTable rows={creneauxLoisir} />
        </div>
      </section>

      {/* Compétition */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Adultes
          </span>
          <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-6">
            Seniors Compétition Départementale
          </h2>
          <ScheduleTable rows={creneauxCompet} />
        </div>
      </section>

      {/* Contact inscription */}
      <section className="bg-gvvb-red py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-2xl text-white">Envie de nous rejoindre ?</h3>
            <p className="text-red-100 mt-1">Contactez-nous pour vous inscrire ou essayer un créneau.</p>
          </div>
          <a
            href="/contact"
            className="bg-white text-gvvb-red font-heading font-semibold px-8 py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </>
  );
}
