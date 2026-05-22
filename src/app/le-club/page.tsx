import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Club",
  description: "Histoire, bureau et coachs du GVVB — Garches Vaucresson Volley-Ball.",
};

const bureau = [
  {
    nom: "Stéphane Feldman",
    role: "Président",
    tel: "07 62 92 04 94",
    email: "feldmans@hotmail.fr",
    responsabilites: [],
  },
  {
    nom: "Benoît Rousseau",
    role: "Trésorier",
    tel: "06 80 85 02 37",
    email: "benrousseau@orange.fr",
    responsabilites: ["Courrier", "Dépenses / Comptabilité", "Inscriptions", "Gestion matériel / tenues"],
  },
  {
    nom: "Christelle Mazzuchelli",
    role: "Vice-présidente",
    tel: "06 07 47 35 28",
    email: "cmazzuchelli@gmail.com",
    responsabilites: [],
  },
  {
    nom: "Nicolas Rebière",
    role: "Secrétaire",
    tel: null,
    email: null,
    responsabilites: [],
  },
];

const coachs = [
  { nom: "Christelle Mazzuchelli", equipes: "Vice-présidente & Coach" },
  { nom: "Florian Champagne", equipes: "Coach" },
  { nom: "Lily", equipes: "Coach" },
];

export default function LeClub() {
  return (
    <>
      <PageHeader
        label="GVVB"
        title="Le Club"
        description="Découvrez l'histoire du Garches Vaucresson Volley-Ball, son bureau et ses installations."
        bgImage="/photos/supporters.jpg"
      />

      {/* Bureau */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Gouvernance
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-10">
            Le bureau
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bureau.map((membre) => (
              <div key={membre.nom} className="bg-white border border-gray-200 overflow-hidden">
                {/* Photo placeholder */}
                <div className="bg-gray-100 h-48 flex items-center justify-center border-b border-gray-200">
                  <svg
                    className="w-20 h-20 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="p-5">
                  <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                    {membre.role}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-gvvb-navy mt-1">
                    {membre.nom}
                  </h3>
                  {membre.tel && (
                    <a
                      href={`tel:${membre.tel.replace(/\s/g, "")}`}
                      className="block text-sm text-gray-500 mt-2 hover:text-gvvb-red transition-colors"
                    >
                      {membre.tel}
                    </a>
                  )}
                  {membre.email && (
                    <a
                      href={`mailto:${membre.email}`}
                      className="block text-sm text-gray-500 mt-1 hover:text-gvvb-red transition-colors truncate"
                    >
                      {membre.email}
                    </a>
                  )}
                  {membre.responsabilites.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {membre.responsabilites.map((r) => (
                        <li key={r} className="text-xs text-gray-400 flex items-start gap-1.5">
                          <span className="text-gvvb-red mt-0.5">·</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coachs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Encadrement
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-10">
            Nos coachs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {coachs.map((coach) => (
              <div key={coach.nom} className="border border-gray-200 overflow-hidden">
                {/* Photo placeholder */}
                <div className="bg-gray-100 h-48 flex items-center justify-center border-b border-gray-200">
                  <svg
                    className="w-20 h-20 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="p-5">
                  <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                    {coach.equipes}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-gvvb-navy mt-1">
                    {coach.nom}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gymnases */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Installations
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-10">
            Nos gymnases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-gvvb-red p-6">
              <h3 className="font-heading font-bold text-xl text-gvvb-navy mb-2">
                Gymnase Yves du Manoir
              </h3>
              <p className="text-gray-500 text-sm">Vaucresson (92)</p>
              <p className="text-gray-500 text-sm mt-1">Compétition Garçons · Loisir Compétition</p>
            </div>
            <div className="bg-white border-l-4 border-gvvb-red p-6">
              <h3 className="font-heading font-bold text-xl text-gvvb-navy mb-2">
                Gymnase Yves Bodin / Le Rallec
              </h3>
              <p className="text-gray-500 text-sm">Garches (92)</p>
              <p className="text-gray-500 text-sm mt-1">Compétition Féminines · Loisir · Jeunes</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
