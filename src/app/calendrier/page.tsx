import PageHeader from "@/components/PageHeader";
import CalendrierClient from "@/components/CalendrierClient";
import { fetchPoule } from "@/lib/ffvb";
import { POULES, SAISON_FFVB } from "@/lib/saison";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier & Résultats",
  description: "Calendrier et résultats de toutes les équipes du GVVB.",
};

export default async function Calendrier() {
  const results = await Promise.all(POULES.map((p) => fetchPoule(p.code)));
  const pouleData = POULES.map((p, i) => ({ ...p, matches: results[i].matches, standings: results[i].standings }));

  return (
    <>
      <PageHeader
        label="Compétition"
        title="Calendrier & Résultats"
        description={`Saison ${SAISON_FFVB} - Cliquez sur une équipe pour voir ses matchs.`}
        bgImage="/photos/filet-m.jpg"
        objectPosition="20% 30%"
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <CalendrierClient pouleData={pouleData} />
      </section>
    </>
  );
}
