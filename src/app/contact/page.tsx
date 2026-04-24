import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Inscription",
  description: "Contactez le GVVB ou inscrivez-vous au club de volley-ball de Garches et Vaucresson.",
};

const contacts = [
  {
    nom: "Stéphane Feldman",
    role: "Président",
    tel: "06 83 89 27 62",
  },
  {
    nom: "Benoît Rousseau",
    role: "Trésorier — Inscriptions",
    tel: "06 80 85 02 37",
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Rejoignez-nous"
        title="Contact & Inscription"
        description="Une question ? Envie de nous rejoindre ? Toutes les informations pour nous contacter."
        bgImage="/photos/banc-gvvb.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Coordonnées */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              Courrier
            </span>
            <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-4">
              Nous écrire
            </h2>
            <address className="not-italic text-gray-600 leading-relaxed">
              Garches Vaucresson Volley-Ball<br />
              20, rue de Suresnes<br />
              92380 Garches
            </address>
            <a
              href="mailto:contact@gvvb.fr"
              className="inline-flex items-center gap-2 mt-4 font-heading text-sm uppercase tracking-wider text-gvvb-red hover:underline"
            >
              contact@gvvb.fr
            </a>
          </div>

          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              Téléphone
            </span>
            <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-4">
              Nous téléphoner
            </h2>
            <div className="flex flex-col gap-4">
              {contacts.map((c) => (
                <div key={c.nom} className="flex items-start gap-4 border-l-2 border-gvvb-red pl-4">
                  <div>
                    <span className="font-heading text-xs uppercase tracking-widest text-gray-400 block">
                      {c.role}
                    </span>
                    <span className="font-heading font-bold text-gvvb-navy">{c.nom}</span>
                    <a
                      href={`tel:${c.tel.replace(/\s/g, "")}`}
                      className="block text-gray-600 hover:text-gvvb-red transition-colors mt-1"
                    >
                      {c.tel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              Réseaux sociaux
            </span>
            <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-4">
              Nous suivre
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/volley_gvvb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-10 h-10 bg-gray-100 group-hover:bg-gvvb-red flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </span>
                <span className="font-heading text-sm text-gray-600 group-hover:text-gvvb-red transition-colors">
                  @volley_gvvb
                </span>
              </a>
              <a
                href="https://facebook.com/gvvb.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-10 h-10 bg-gray-100 group-hover:bg-gvvb-red flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <span className="font-heading text-sm text-gray-600 group-hover:text-gvvb-red transition-colors">
                  facebook.com/gvvb.fr
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Carte / Infos pratiques */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              S&apos;inscrire
            </span>
            <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-4">
              Rejoindre le club
            </h2>
            {/* Télécharger le dossier */}
            <a
              href="/docs/dossier-inscription-2025-2026.pdf"
              download
              className="flex items-center gap-4 bg-gvvb-red text-white p-5 hover:bg-gvvb-red-dark transition-colors group"
            >
              <svg className="w-10 h-10 flex-shrink-0 opacity-80 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 9v4.5l1.5-1.5 1.06 1.06L13 17.62l-2.56-2.56L11.5 14l1.5 1.5V11h1zm1-7 5 5h-5V4z"/>
              </svg>
              <div>
                <p className="font-heading font-bold text-base uppercase tracking-wide">
                  Dossier d&apos;inscription 2025-2026
                </p>
                <p className="text-red-100 text-sm mt-0.5">Télécharger le PDF · 333 Ko</p>
              </div>
              <svg className="w-5 h-5 ml-auto flex-shrink-0 opacity-70 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </a>

            <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col gap-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Téléchargez et remplissez le dossier ci-dessus, puis transmettez-le
                à notre trésorier Benoît Rousseau. Nous accueillons aussi les essais
                — venez tester un créneau avant de vous engager.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gvvb-red font-bold mt-0.5">→</span>
                  <span className="text-gray-600">Benoît Rousseau au <a href="tel:0680850237" className="text-gvvb-red hover:underline">06 80 85 02 37</a></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gvvb-red font-bold mt-0.5">→</span>
                  <span className="text-gray-600">Par email : <a href="mailto:contact@gvvb.fr" className="text-gvvb-red hover:underline">contact@gvvb.fr</a></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gvvb-red font-bold mt-0.5">→</span>
                  <a href="/entrainements" className="text-gray-600 hover:text-gvvb-red transition-colors">
                    Voir les créneaux d&apos;entraînement
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              Gymnases
            </span>
            <h2 className="font-heading font-bold text-2xl text-gvvb-navy mt-2 mb-4">
              Nous trouver
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  nom: "Gymnase Yves du Manoir",
                  adresse: "13 allée des Lauriers",
                  ville: "92420 Vaucresson",
                  maps: "https://www.google.com/maps/search/?api=1&query=13+all%C3%A9e+des+Lauriers+92420+Vaucresson",
                },
                {
                  nom: "Gymnase Yves Bodin",
                  adresse: "20 rue de Suresnes",
                  ville: "92380 Garches",
                  maps: "https://www.google.com/maps/search/?api=1&query=20+rue+de+Suresnes+92380+Garches",
                },
                {
                  nom: "Gymnase Le Rallec",
                  adresse: "86 Grande Rue",
                  ville: "92380 Garches",
                  maps: "https://www.google.com/maps/search/?api=1&query=86+Grande+Rue+92380+Garches",
                },
              ].map((gym) => (
                <div key={gym.nom} className="bg-gray-50 border border-gray-200 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading font-bold text-gvvb-navy text-sm">{gym.nom}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{gym.adresse}</p>
                    <p className="text-gray-500 text-sm">{gym.ville}</p>
                  </div>
                  <a
                    href={gym.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-gvvb-red hover:underline mt-1"
                    aria-label={`Ouvrir ${gym.nom} dans Google Maps`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
