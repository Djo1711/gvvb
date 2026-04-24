import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Club",
  description: "Histoire, bureau et gymnases du GVVB — Garches Vaucresson Volley-Ball.",
};

export default function LeClub() {
  return (
    <>
      <PageHeader
        label="GVVB"
        title="Le Club"
        description="Découvrez l'histoire du Garches Vaucresson Volley-Ball, son bureau et ses installations."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Contenu à venir — en cours de rédaction.</p>
      </section>
    </>
  );
}
