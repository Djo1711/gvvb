import PageHeader from "@/components/PageHeader";
import CalendrierClient from "@/components/CalendrierClient";
import { fetchPoule } from "@/lib/ffvb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier & Résultats",
  description: "Calendrier et résultats de toutes les équipes du GVVB.",
};

const poules = [
  { code: "AMA", label: "Départementale M — Poule principale" },
  { code: "AMF", label: "Départementale M — Poule intermédiaire 2" },
  { code: "AFC", label: "Départementale F — Poule principale" },
  { code: "AFF", label: "Départementale F — Poule basse" },
  { code: "ORA", label: "Loisir OR" },
  { code: "MFB", label: "M15 Féminines" },
];

export default async function Calendrier() {
  const results = await Promise.all(poules.map((p) => fetchPoule(p.code)));
  const pouleData = poules.map((p, i) => ({ ...p, matches: results[i].matches, standings: results[i].standings }));

  return (
    <>
      <PageHeader
        label="Compétition"
        title="Calendrier & Résultats"
        description="Saison 2025/2026 — Cliquez sur une équipe pour voir ses matchs."
        bgImage="/photos/filet-m.jpg"
        objectPosition="20% 30%"
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <CalendrierClient pouleData={pouleData} />
      </section>
    </>
  );
}
