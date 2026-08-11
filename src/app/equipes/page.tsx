import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  EQUIPES_COMPETITION,
  EQUIPES_JEUNES,
  EQUIPES_LOISIR,
  TOUTES_EQUIPES,
  ffvbUrl,
  type Equipe,
} from "@/lib/saison";

export const metadata: Metadata = {
  title: "Équipes",
  description:
    "Toutes les équipes du GVVB : départementales masculine et féminine, jeunes du M11 au M21, loisir et 4×4 féminine.",
};

function FfvbLinks({ equipe, compact = false }: { equipe: Equipe; compact?: boolean }) {
  if (equipe.liens.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {equipe.liens.map((lien) => (
        <a
          key={lien.poule}
          href={ffvbUrl(lien.poule)}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-heading uppercase tracking-wider text-gvvb-red border border-gvvb-red hover:bg-gvvb-red hover:text-white transition-colors ${
            compact ? "text-[0.65rem] px-3 py-1.5" : "text-xs px-4 py-2"
          }`}
        >
          {lien.label} ↗
        </a>
      ))}
    </div>
  );
}

function Coachs({ equipe, marge }: { equipe: Equipe; marge: string }) {
  if (equipe.coachs.length === 0) return null;
  return (
    <p className={`text-sm text-gray-500 ${marge}`}>
      <span className="font-heading text-xs uppercase tracking-widest text-gray-400">
        {equipe.coachs.length > 1 ? "Coachs · " : "Coach · "}
      </span>
      {equipe.coachs.join(" et ")}
    </p>
  );
}

function Creneaux({ equipe }: { equipe: Equipe }) {
  if (equipe.creneaux.length === 0) return null;
  return (
    <div className="mb-4">
      <span className="font-heading text-xs uppercase tracking-widest text-gray-400 block mb-1.5">
        Créneaux
      </span>
      <ul className="flex flex-col gap-1">
        {equipe.creneaux.map((c) => (
          <li key={c} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-gvvb-red mt-0.5 flex-shrink-0" aria-hidden="true">·</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Grand format alterné photo / texte, réservé aux équipes seniors compétition. */
function EquipeFeature({ equipe, reverse }: { equipe: Equipe; reverse: boolean }) {
  return (
    <article
      id={equipe.id}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-start scroll-mt-20`}
    >
      <div className="w-full md:w-2/5 flex-shrink-0 order-2 md:order-1">
        {equipe.photo ? (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={equipe.photo}
              alt={`Équipe ${equipe.nom} GVVB`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200">
            <span className="font-heading text-sm text-gray-400 uppercase tracking-wide">
              Photo à venir
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 py-2 order-1 md:order-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            {equipe.niveau}
          </span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span className="font-heading text-xs uppercase tracking-widest text-gray-400">
            {equipe.genre}
          </span>
        </div>
        <h3 className="font-heading font-bold text-3xl text-gvvb-navy mb-4">{equipe.nom}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{equipe.description}</p>
        <Creneaux equipe={equipe} />
        <Coachs equipe={equipe} marge="mb-6" />
        <FfvbLinks equipe={equipe} />
      </div>
    </article>
  );
}

/** Carte compacte, utilisée pour les groupes jeunes et loisir. */
function EquipeCard({ equipe }: { equipe: Equipe }) {
  return (
    <article
      id={equipe.id}
      className="bg-white border border-gray-200 hover:border-gvvb-red transition-colors flex flex-col scroll-mt-20"
    >
      {equipe.photo && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={equipe.photo}
            alt={`Équipe ${equipe.nom} GVVB`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            {equipe.niveau}
          </span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span className="font-heading text-xs uppercase tracking-widest text-gray-400">
            {equipe.genre}
          </span>
        </div>
        <h3 className="font-heading font-bold text-xl text-gvvb-navy mb-3">{equipe.nom}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{equipe.description}</p>
        <div className="mt-auto">
          <Creneaux equipe={equipe} />
          <Coachs equipe={equipe} marge="mb-4" />
          <FfvbLinks equipe={equipe} compact />
        </div>
      </div>
    </article>
  );
}

export default function Equipes() {
  return (
    <>
      <PageHeader
        label="GVVB"
        title="Nos équipes"
        description={`${TOUTES_EQUIPES.length} équipes et groupes pour tous les âges et tous les niveaux : compétition, formation et loisir.`}
        bgImage="/photos/volleyballs.jpg"
      />

      {/* Compétition Seniors */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Championnat départemental
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-10">
            Compétition Seniors
          </h2>
          <div className="flex flex-col gap-12">
            {EQUIPES_COMPETITION.map((equipe, idx) => (
              <EquipeFeature key={equipe.id} equipe={equipe} reverse={idx % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Jeunes */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Du M11 au M21
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-2">
            Jeunes
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            De l&apos;école de volley aux groupes compétition, nos jeunes s&apos;entraînent au gymnase
            Le Rallec et à Yves Bodin, à Garches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPES_JEUNES.map((equipe) => (
              <EquipeCard key={equipe.id} equipe={equipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Loisir */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
            Sans pression
          </span>
          <h2 className="font-heading font-bold text-3xl text-gvvb-navy mt-2 mb-2">
            Loisir
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Du jeu libre du dimanche matin au championnat loisir, plusieurs formats pour jouer
            à son rythme.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPES_LOISIR.map((equipe) => (
              <EquipeCard key={equipe.id} equipe={equipe} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Vous voulez rejoindre une équipe ou vous n&apos;êtes pas sûr(e) de votre niveau ?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center bg-gvvb-red text-white font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-gvvb-red-dark transition-colors"
            >
              Tarifs & inscription
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-gvvb-red text-gvvb-red font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-gvvb-red hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
