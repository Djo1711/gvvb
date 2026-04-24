import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier & Résultats",
  description: "Calendrier des matchs et résultats du GVVB.",
};

export default function Calendrier() {
  return (
    <>
      <PageHeader
        label="Compétition"
        title="Calendrier & Résultats"
        description="Suivez les matchs et les résultats de toutes nos équipes."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Contenu à venir — en cours de rédaction.</p>
      </section>
    </>
  );
}
