import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Équipes",
  description: "Toutes les équipes du GVVB : masculins, féminins, jeunes.",
};

export default function Equipes() {
  return (
    <>
      <PageHeader
        label="GVVB"
        title="Nos équipes"
        description="Masculins, féminins, jeunes — retrouvez toutes les équipes du club."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Contenu à venir — en cours de rédaction.</p>
      </section>
    </>
  );
}
