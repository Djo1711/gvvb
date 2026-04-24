import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entraînements & Horaires",
  description: "Horaires et lieux d'entraînement du GVVB à Garches et Vaucresson.",
};

export default function Entrainements() {
  return (
    <>
      <PageHeader
        label="Organisation"
        title="Entraînements & Horaires"
        description="Retrouvez les créneaux d'entraînement pour chaque équipe dans nos gymnases."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Contenu à venir — en cours de rédaction.</p>
      </section>
    </>
  );
}
