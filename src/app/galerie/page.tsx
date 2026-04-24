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
        description="Saison 2025/2026 — Photos David Adot Photo & Vidéo."
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

        <p className="text-center text-xs text-gray-400 font-heading uppercase tracking-widest">
          Photos © David Adot Photo & Vidéo
        </p>
      </div>
    </>
  );
}
