import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie photos",
  description: "Photos des matchs et événements du GVVB.",
};

export default function Galerie() {
  return (
    <>
      <PageHeader
        label="Médias"
        title="Galerie photos"
        description="Revivez les moments forts du club en images."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Contenu à venir — photos à collecter.</p>
      </section>
    </>
  );
}
