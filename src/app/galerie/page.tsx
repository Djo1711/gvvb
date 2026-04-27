import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie photos",
  description: "Photos des matchs et événements du GVVB — saison 2025/2026.",
};

const sections = [
  {
    label: "Action & Matchs",
    photos: [
      { src: "/photos/action-smash.jpg",   alt: "Smash au filet",              featured: true },
      { src: "/photos/entree-jeu.jpg",      alt: "Entrée en jeu" },
      { src: "/photos/action-f2.jpg",       alt: "Action en match féminin" },
      { src: "/photos/filet-m.jpg",         alt: "Concentration au filet",      featured: true },
      { src: "/photos/filet-f.jpg",         alt: "Au filet" },
      { src: "/photos/apres-match.jpg",     alt: "Après le match" },
    ],
  },
  {
    label: "Émotions & Portraits",
    photos: [
      { src: "/photos/celebration-f.jpg",   alt: "Célébration féminine",        featured: true },
      { src: "/photos/celebration-m.jpg",   alt: "Célébration masculine",        featured: true },
      { src: "/photos/portrait-f.jpg",      alt: "Concentration" },
      { src: "/photos/joueur-ballon.jpg",   alt: "Prêt à servir" },
      { src: "/photos/ballon-tattoo.jpg",   alt: "Avec le ballon" },
      { src: "/photos/hero-bg.jpg",         alt: "Avant le match" },
    ],
  },
  {
    label: "Équipes & Ambiance",
    photos: [
      { src: "/equipes/dep-feminine.jpg",   alt: "Équipe Départementale Féminine", featured: true },
      { src: "/photos/supporters.jpg",      alt: "Les supporters" },
      { src: "/photos/banc-gvvb.jpg",       alt: "Le banc GVVB" },
      { src: "/equipes/dep-masculine.jpg",  alt: "Équipe Départementale Masculine" },
      { src: "/equipes/m15-feminine.jpg",   alt: "M15 Féminines",                  featured: true },
      { src: "/equipes/loisir-or.jpg",      alt: "Loisir OR" },
      { src: "/photos/volleyballs.jpg",     alt: "Entraînement" },
    ],
  },
];

export default function Galerie() {
  return (
    <>
      <PageHeader
        label="Médias"
        title="Galerie photos"
        description="Saison 2025/2026 — Photos David Adet Photo & Vidéo."
        bgImage="/photos/celebration-m.jpg"
        objectPosition="center 40%"
      />


      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-16">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                {section.label}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {section.photos.map((photo) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden ${photo.featured ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={photo.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <a
          href="https://www.instagram.com/davidadet_photo_video/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-gvvb-red transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          <span className="font-heading text-xs uppercase tracking-widest text-gray-400 group-hover:text-gvvb-red transition-colors">
            Photos © @davidadet_photo_video
          </span>
        </a>
      </div>
    </>
  );
}
