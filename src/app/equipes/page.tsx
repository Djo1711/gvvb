import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Équipes",
  description: "Toutes les équipes du GVVB : départementale masculine, féminine, loisir OR, VSOP et jeunes M15.",
};

const equipes = [
  {
    id: "dep-masculine",
    nom: "Départementale Masculine",
    niveau: "Compétition",
    genre: "Masculin",
    description:
      "L'équipe phare du club évolue en championnat départemental dans les Hauts-de-Seine. Après une phase principale en poule A, l'équipe a disputé la poule intermédiaire 2.",
    photo: "/equipes/dep-masculine.jpg",
    liens: [
      { label: "Poule principale (AMA)", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=AMA" },
      { label: "Poule intermédiaire 2 (AMF)", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=AMF" },
    ],
  },
  {
    id: "dep-feminine",
    nom: "Départementale Féminine",
    niveau: "Compétition",
    genre: "Féminin",
    description:
      "L'équipe féminine évolue en championnat départemental. Après la phase principale, l'équipe a disputé la poule basse.",
    photo: "/equipes/dep-feminine.jpg",
    liens: [
      { label: "Poule principale (AFC)", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=AFC" },
      { label: "Poule basse (AFF)", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=AFF" },
    ],
  },
  {
    id: "loisir-or",
    nom: "Loisir OR",
    niveau: "Loisir Compétition",
    genre: "Mixte",
    description:
      "L'équipe Loisir OR évolue dans la poule OR du championnat loisir. Une équipe mixte pour ceux qui veulent conjuguer compétition et plaisir du jeu.",
    photo: "/equipes/loisir-or.jpg",
    liens: [
      { label: "Poule OR", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=ORA" },
    ],
  },
  {
    id: "vsop",
    nom: "VSOP",
    niveau: "Ligue Loisir",
    genre: "Mixte",
    description:
      "Le VSOP est une ligue loisir créée dans le sud-ouest parisien, réunissant des clubs de la région pour des rencontres conviviales à haut niveau de jeu.",
    photo: null,
    liens: [],
  },
  {
    id: "m15-feminine",
    nom: "M15 Féminines",
    niveau: "Compétition Jeunes",
    genre: "Féminin",
    description:
      "Notre équipe de jeunes filles dispute le championnat départemental M15. Formation et compétition au programme pour nos futures championnes.",
    photo: "/equipes/m15-feminine.jpg",
    liens: [
      { label: "Championnat M15 F (MFB)", url: "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=MFB" },
    ],
  },
];

export default function Equipes() {
  return (
    <>
      <PageHeader
        label="GVVB"
        title="Nos équipes"
        description="Cinq équipes pour tous les niveaux : compétition, loisir et jeunes."
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {equipes.map((equipe, idx) => (
            <article
              key={equipe.id}
              className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}
            >
              {/* Photo */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                {equipe.photo ? (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={equipe.photo}
                      alt={`Équipe ${equipe.nom} GVVB`}
                      fill
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

              {/* Texte */}
              <div className="flex-1 py-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
                    {equipe.niveau}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="font-heading text-xs uppercase tracking-widest text-gray-400">
                    {equipe.genre}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-3xl text-gvvb-navy mb-4">
                  {equipe.nom}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{equipe.description}</p>
                {equipe.liens.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {equipe.liens.map((lien) => (
                      <a
                        key={lien.url}
                        href={lien.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-xs uppercase tracking-wider text-gvvb-red border border-gvvb-red px-4 py-2 hover:bg-gvvb-red hover:text-white transition-colors"
                      >
                        {lien.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Vous voulez rejoindre une équipe ou vous n&apos;êtes pas sûr(e) de votre niveau ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-gvvb-red text-white font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-gvvb-red-dark transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </>
  );
}
