import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GVVB — Garches Vaucresson Volley-Ball",
  description:
    "Club de volley-ball de Garches et Vaucresson (92). Loisir, compétition et formations jeunes en Hauts-de-Seine.",
};

const teams = [
  { name: "Départementale Masculine", level: "Compétition", gender: "Masculin", href: "/equipes#dep-masculine" },
  { name: "Départementale Féminine", level: "Compétition", gender: "Féminin", href: "/equipes#dep-feminine" },
  { name: "Loisir OR", level: "Loisir Compétition", gender: "Mixte", href: "/equipes#loisir-or" },
  { name: "VSOP", level: "Ligue Loisir", gender: "Mixte", href: "/equipes#vsop" },
  { name: "M15 Féminines", level: "Compétition Jeunes", gender: "Féminin", href: "/equipes#m15-feminine" },
];

const news = [
  {
    date: "Avril 2026",
    title: "Nouveau site en ligne !",
    excerpt:
      "Le site du GVVB fait peau neuve. Restez connectés pour toutes les actualités du club.",
  },
  {
    date: "Avril 2026",
    title: "Inscriptions 2026-2027 bientôt ouvertes",
    excerpt:
      "La prochaine saison approche. Les inscriptions ouvriront en juin. Contactez-nous pour plus d'infos.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gvvb-red overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 41px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 flex flex-col gap-6 items-start">
          <span className="font-heading text-xs uppercase tracking-widest text-white/70">
            Garches · Vaucresson · Hauts-de-Seine
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-white leading-tight max-w-3xl">
            GARCHES
            <br />
            VAUCRESSON
            <br />
            VOLLEY-BALL
          </h1>
          <p className="text-gray-300 text-lg max-w-lg">
            Rejoignez un club passionné dans les Hauts-de-Seine. Loisir,
            compétition, jeunes — il y a une équipe pour vous.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contact"
              className="bg-white text-gvvb-red font-heading font-semibold px-8 py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Nous rejoindre
            </Link>
            <Link
              href="/calendrier"
              className="border-2 border-white text-white font-heading font-semibold px-8 py-3 uppercase tracking-wider hover:bg-white hover:text-gvvb-red transition-colors"
            >
              Calendrier
            </Link>
          </div>
        </div>
      </section>

      {/* Équipes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                Le club
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gvvb-navy mt-1">
                Nos équipes
              </h2>
            </div>
            <Link
              href="/equipes"
              className="font-heading text-sm uppercase tracking-wider text-gvvb-navy hover:text-gvvb-red transition-colors"
            >
              Voir toutes les équipes →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <Link
                key={team.name}
                href={team.href}
                className="border border-gray-200 p-6 hover:border-gvvb-red hover:shadow-md transition-all group"
              >
                <span className="font-heading text-xs uppercase tracking-widest text-gray-400">
                  {team.level} · {team.gender}
                </span>
                <h3 className="font-heading font-bold text-xl text-gvvb-navy mt-1 group-hover:text-gvvb-red transition-colors">
                  {team.name}
                </h3>
              </Link>
            ))}
            <div className="border-2 border-dashed border-gray-200 p-6 flex items-center justify-center">
              <Link
                href="/equipes"
                className="font-heading text-sm text-gray-400 hover:text-gvvb-red transition-colors"
              >
                + Voir toutes les équipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
              Actualités
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gvvb-navy mt-1">
              Dernières nouvelles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item) => (
              <article
                key={item.title}
                className="bg-white p-8 border-l-4 border-gvvb-red shadow-sm hover:shadow-md transition-shadow"
              >
                <time className="font-heading text-xs uppercase tracking-widest text-gray-400">
                  {item.date}
                </time>
                <h3 className="font-heading font-bold text-xl text-gvvb-navy mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                Médias
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gvvb-navy mt-1">
                Sur YouTube
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                Notre coach Florian Champagne filme ses saisons et nos tournois 4x4 sur sa chaîne YouTube.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@lepreneurdelecon"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm uppercase tracking-wider text-gvvb-navy hover:text-gvvb-red transition-colors whitespace-nowrap"
            >
              Voir la chaîne →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://www.youtube.com/@lepreneurdelecon"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gvvb-navy aspect-video flex flex-col items-center justify-center gap-4 hover:bg-gvvb-navy-dark transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gvvb-red/10 group-hover:bg-gvvb-red/20 transition-colors" />
              <svg className="w-16 h-16 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              <div className="relative z-10 text-center px-4">
                <p className="font-heading font-bold text-white text-lg">Départementale Féminine</p>
                <p className="text-gray-300 text-sm mt-1">Saison 2025/2026 — Suivie en vidéo</p>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@lepreneurdelecon"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gvvb-navy aspect-video flex flex-col items-center justify-center gap-4 hover:bg-gvvb-navy-dark transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gvvb-red/10 group-hover:bg-gvvb-red/20 transition-colors" />
              <svg className="w-16 h-16 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              <div className="relative z-10 text-center px-4">
                <p className="font-heading font-bold text-white text-lg">Tournois 4×4</p>
                <p className="text-gray-300 text-sm mt-1">Les tournois du club filmés par Florian</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA rejoindre */}
      <section className="py-20 bg-gvvb-navy">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
            PRÊT À REJOINDRE L&apos;ÉQUIPE ?
          </h2>
          <p className="text-gray-300 max-w-md">
            Débutant ou confirmé, il y a une place pour vous au GVVB.
            Contactez-nous pour en savoir plus sur les inscriptions.
          </p>
          <Link
            href="/contact"
            className="bg-gvvb-red text-white font-heading font-bold px-10 py-4 uppercase tracking-wider hover:bg-gvvb-red-dark transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
