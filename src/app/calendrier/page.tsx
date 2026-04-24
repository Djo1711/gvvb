import PageHeader from "@/components/PageHeader";
import { fetchPoule, formatDate, matchResult, opponentName, type Match } from "@/lib/ffvb";
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

function MatchRow({ match }: { match: Match }) {
  const result = matchResult(match);
  const opponent = opponentName(match);
  const isHome = match.home.includes("GARCHES");

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">
        {formatDate(match.date)}
        <span className="block text-xs text-gray-400">{match.time}</span>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-block font-heading text-xs uppercase tracking-wide px-2 py-0.5 mr-2 ${isHome ? "bg-gvvb-red text-white" : "bg-gray-100 text-gray-500"}`}>
          {isHome ? "Dom." : "Ext."}
        </span>
      </td>
      <td className="py-3 px-4 text-sm text-gray-700 font-medium">
        {opponent || <span className="text-gray-400 italic">À déterminer</span>}
      </td>
      <td className="py-3 px-4 text-center">
        {result ? (
          <span className={`font-heading font-bold text-sm px-3 py-1 ${result.win ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {result.gvvbScore} – {result.opponentScore}
          </span>
        ) : (
          <span className="text-gray-300 text-xs">À jouer</span>
        )}
      </td>
    </tr>
  );
}

function PouleSection({ label, matches }: { label: string; matches: Match[] }) {
  if (matches.length === 0) return null;
  const played = matches.filter((m) => matchResult(m) !== null);
  const wins = played.filter((m) => matchResult(m)?.win).length;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-heading font-bold text-xl text-gvvb-navy">{label}</h2>
        {played.length > 0 && (
          <span className="font-heading text-xs uppercase tracking-widest text-gray-500">
            {played.length} matchs joués · {wins}V / {played.length - wins}D
          </span>
        )}
      </div>
      <div className="border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-2 px-4 text-left font-heading text-xs uppercase tracking-wide text-gray-400">Date</th>
              <th className="py-2 px-4 text-left font-heading text-xs uppercase tracking-wide text-gray-400">Lieu</th>
              <th className="py-2 px-4 text-left font-heading text-xs uppercase tracking-wide text-gray-400">Adversaire</th>
              <th className="py-2 px-4 text-center font-heading text-xs uppercase tracking-wide text-gray-400">Score</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <MatchRow key={m.code} match={m} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function Calendrier() {
  const results = await Promise.all(poules.map((p) => fetchPoule(p.code)));
  const pouleData = poules.map((p, i) => ({ ...p, matches: results[i] }));

  return (
    <>
      <PageHeader
        label="Compétition"
        title="Calendrier & Résultats"
        description="Saison 2025/2026 — Tous les matchs du GVVB."
      />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {pouleData.every((p) => p.matches.length === 0) ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Impossible de charger les données FFVB.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {poules.map((p) => (
                <a
                  key={p.code}
                  href={`https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=${p.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs uppercase tracking-wider text-gvvb-red border border-gvvb-red px-4 py-2 hover:bg-gvvb-red hover:text-white transition-colors"
                >
                  {p.label} ↗
                </a>
              ))}
            </div>
          </div>
        ) : (
          pouleData.map((p) => (
            <PouleSection key={p.code} label={p.label} matches={p.matches} />
          ))
        )}
      </section>
    </>
  );
}
