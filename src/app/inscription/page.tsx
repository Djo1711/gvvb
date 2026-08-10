import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BUREAU,
  CATEGORIES_AGE,
  DATE_LIMITE,
  DOSSIER,
  MODALITES_PAIEMENT,
  PIECES_DOSSIER,
  SAISON_CLUB,
  TARIFS,
  TARIFS_ANNEXES,
} from "@/lib/saison";

export const metadata: Metadata = {
  title: "Inscription",
  description: `Tarifs, pièces à fournir et dossier d'inscription du GVVB pour la saison ${SAISON_CLUB} — club de volley-ball à Garches et Vaucresson.`,
};

export default function Inscription() {
  return (
    <>
      <PageHeader
        label={`Saison ${SAISON_CLUB}`}
        title="Inscription"
        description="Tarifs, pièces à fournir et dossier à télécharger : tout ce qu'il faut pour rejoindre le club."
        bgImage="/photos/entree-jeu.jpg"
        objectPosition="center 35%"
      />

      {/* Téléchargement du dossier */}
      <section className="bg-gvvb-red py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <a
            href={DOSSIER.href}
            download
            className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="w-14 h-14 bg-gvvb-red flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 9v4.5l1.5-1.5 1.06 1.06L13 17.62l-2.56-2.56L11.5 14l1.5 1.5V11h1zm1-7 5 5h-5V4z" />
              </svg>
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="font-heading font-bold text-gvvb-navy text-lg group-hover:text-gvvb-red transition-colors">
                Dossier d&apos;inscription {SAISON_CLUB}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Demande d&apos;adhésion, formulaire de licence FFVB et notice d&apos;assurance · PDF {DOSSIER.taille}
              </p>
            </div>
            <span className="font-heading text-sm uppercase tracking-wider text-white bg-gvvb-red px-5 py-3 flex-shrink-0 flex items-center gap-2 group-hover:bg-gvvb-red-dark transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger
            </span>
          </a>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Cotisations
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-6">
            Tarifs {SAISON_CLUB}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[32rem]">
              <caption className="sr-only">
                Montant de la cotisation par catégorie, selon la commune de résidence
              </caption>
              <thead>
                <tr className="bg-gvvb-red text-white font-heading uppercase tracking-wide text-xs">
                  <th scope="col" className="py-3 px-4 text-left">Catégorie</th>
                  <th scope="col" className="py-3 px-4 text-right">Garches / Vaucresson</th>
                  <th scope="col" className="py-3 px-4 text-right">Autres communes</th>
                </tr>
              </thead>
              <tbody>
                {TARIFS.map((t, i) => (
                  <tr key={t.categorie} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <th scope="row" className="py-3 px-4 text-left font-medium text-gvvb-navy">
                      {t.categorie}
                    </th>
                    <td className="py-3 px-4 text-right font-heading font-bold text-gvvb-navy tabular-nums">
                      {t.garches}
                    </td>
                    <td className="py-3 px-4 text-right font-heading text-gray-600 tabular-nums">
                      {t.autres}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Frais annexes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {TARIFS_ANNEXES.map((t) => (
              <div key={t.label} className="border border-gray-200 p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-gvvb-navy">{t.label}</p>
                  {t.note && <p className="text-gray-500 text-sm mt-1">{t.note}</p>}
                </div>
                <span className="font-heading font-bold text-xl text-gvvb-red flex-shrink-0 tabular-nums">
                  {t.montant}
                </span>
              </div>
            ))}
          </div>

          {/* Modalités de paiement */}
          <div className="bg-gray-50 border-l-4 border-gvvb-red p-6 mt-6">
            <h3 className="font-heading font-bold text-gvvb-navy mb-3">Modalités de paiement</h3>
            <ul className="flex flex-col gap-2">
              {MODALITES_PAIEMENT.map((m) => (
                <li key={m} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span className="text-gvvb-red font-bold mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pièces à fournir */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Votre dossier
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-6">
            Les pièces à fournir
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Le dossier d&apos;inscription doit impérativement comprendre les pièces suivantes.
            Un dossier incomplet ne permet pas d&apos;enregistrer la licence.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PIECES_DOSSIER.map((piece, i) => (
              <li key={piece.texte} className="bg-white border border-gray-200 p-5 flex items-start gap-4">
                <span
                  className="w-8 h-8 bg-gvvb-red text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-gvvb-navy font-medium leading-snug">{piece.texte}</p>
                  {piece.condition && (
                    <p className="text-gray-500 text-sm mt-1">{piece.condition}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Date limite */}
          <div className="bg-gvvb-navy text-white p-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <svg className="w-10 h-10 text-gvvb-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-heading font-bold text-lg uppercase tracking-wide">
                Date limite : {DATE_LIMITE}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                Merci de rendre votre dossier d&apos;inscription <strong className="text-white">complet</strong> avant
                la fin du mois de septembre 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories d'âge */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Référence
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-2">
            Quelle catégorie ?
          </h2>
          <p className="text-gray-600 mb-6">
            La catégorie dépend de l&apos;année de naissance, pas de l&apos;âge au moment de l&apos;inscription.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES_AGE.map((c) => (
              <div key={c.cat} className="bg-white border border-gray-200 p-4 text-center">
                <span className="font-heading font-bold text-lg text-gvvb-navy block">{c.cat}</span>
                <span className="text-xs text-gray-500 mt-1 block">{c.detail}</span>
              </div>
            ))}
          </div>
          <Link
            href="/entrainements"
            className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-gvvb-red hover:underline mt-6"
          >
            Voir les créneaux d&apos;entraînement →
          </Link>
        </div>
      </section>

      {/* Contacts bureau */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Une question ?
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gvvb-navy mt-2 mb-2">
            Contactez le bureau
          </h2>
          <p className="text-gray-600 mb-8">
            Pour tout renseignement complémentaire, prenez contact avec l&apos;un des membres du bureau.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUREAU.map((m) => (
              <div key={m.nom} className="bg-white border border-gray-200 p-5">
                <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                  {m.role}
                </span>
                <p className="font-heading font-bold text-gvvb-navy mt-1">{m.nom}</p>
                <a
                  href={`tel:${m.tel.replace(/\s/g, "")}`}
                  className="block text-sm text-gray-500 mt-2 hover:text-gvvb-red transition-colors"
                >
                  {m.tel}
                </a>
                <a
                  href={`mailto:${m.email}`}
                  className="block text-sm text-gray-500 mt-1 hover:text-gvvb-red transition-colors truncate"
                >
                  {m.email}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center bg-gvvb-red text-white font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-gvvb-red-dark transition-colors"
            >
              Formulaire de contact
            </Link>
            <a
              href="mailto:contact@gvvb.fr"
              className="inline-flex items-center border border-gvvb-red text-gvvb-red font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-gvvb-red hover:text-white transition-colors"
            >
              contact@gvvb.fr
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
