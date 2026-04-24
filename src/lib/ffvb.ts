export interface Match {
  code: string;
  date: string;   // DD/MM/YY
  time: string | null;
  home: string;
  away: string;
  scoreHome: string | null;
  scoreAway: string | null;
  sets: string | null;
}

export interface Standing {
  rank: number;
  team: string;
  pts: number;
  played: number;
  wins: number;
  losses: number;
  isGvvb: boolean;
}

const CLUB = "GARCHES";

function parseCells(html: string): string[] {
  const cells: string[] = [];
  const re = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[1]
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text) cells.push(text);
  }
  return cells;
}

export function parseMatches(html: string): Match[] {
  const cells = parseCells(html);
  const codeRe = /^[A-Z]{2,4}\d{3}$/;
  const dateRe = /^\d{2}\/\d{2}\/\d{2}$/;
  const timeRe = /^\d{2}:\d{2}$/;
  const scoreRe = /^\d$/;

  const matches: Match[] = [];

  for (let i = 0; i < cells.length - 3; i++) {
    if (!codeRe.test(cells[i])) continue;
    if (!dateRe.test(cells[i + 1])) continue;

    // Deux formats possibles: avec heure (standard) ou sans heure (2e match de journée M15)
    const hasTime = timeRe.test(cells[i + 2]);
    const offset = hasTime ? 0 : -1; // décale les index si pas d'heure

    const time = hasTime ? cells[i + 2] : null;
    const home = cells[i + 3 + offset] ?? "";
    let away = cells[i + 4 + offset] ?? "";
    let scoreHome: string | null = null;
    let scoreAway: string | null = null;
    let sets: string | null = null;

    // Sans heure, vérifier que home ressemble à un nom d'équipe (pas un code match ou date)
    if (!hasTime && (codeRe.test(home) || dateRe.test(home) || timeRe.test(home))) continue;

    if (away === "xxxxx") {
      away = "";
    } else if (cells[i + 5 + offset] && scoreRe.test(cells[i + 5 + offset])) {
      scoreHome = cells[i + 5 + offset];
      scoreAway = cells[i + 6 + offset] ?? null;
      sets = cells[i + 7 + offset] ?? null;
    }

    matches.push({ code: cells[i], date: cells[i + 1], time, home, away, scoreHome, scoreAway, sets });
  }

  return matches.filter((m) => m.home.includes(CLUB) || m.away.includes(CLUB));
}

export function parseStandings(html: string): Standing[] {
  const cells = parseCells(html);
  const rankRe = /^\d{1,2}\.$/;
  const numRe = /^\d+$/;
  const standings: Standing[] = [];

  for (let i = 0; i < cells.length - 5; i++) {
    if (!rankRe.test(cells[i])) continue;
    const rank = parseInt(cells[i]);
    const team = cells[i + 1];
    const pts = cells[i + 2];
    const played = cells[i + 3];
    const wins = cells[i + 4];
    const losses = cells[i + 5];
    if (!numRe.test(pts) || !numRe.test(played) || !numRe.test(wins) || !numRe.test(losses)) continue;
    standings.push({
      rank,
      team,
      pts: parseInt(pts),
      played: parseInt(played),
      wins: parseInt(wins),
      losses: parseInt(losses),
      isGvvb: team.includes(CLUB),
    });
  }

  return standings;
}

export async function fetchPoule(poule: string): Promise<{ matches: Match[]; standings: Standing[] }> {
  const url = `https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2025/2026&codent=PTIDF92&poule=${poule}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const buf = await res.arrayBuffer();
    const html = new TextDecoder("iso-8859-1").decode(buf);
    return { matches: parseMatches(html), standings: parseStandings(html) };
  } catch {
    return { matches: [], standings: [] };
  }
}

export function formatDate(ddmmyy: string): string {
  const [d, m, y] = ddmmyy.split("/");
  const months = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} 20${y}`;
}

export function matchResult(match: Match): { gvvbScore: string; opponentScore: string; win: boolean } | null {
  if (match.scoreHome === null) return null;
  const gvvbHome = match.home.includes(CLUB);
  const gvvbScore = gvvbHome ? match.scoreHome! : match.scoreAway!;
  const oppScore = gvvbHome ? match.scoreAway! : match.scoreHome!;
  return { gvvbScore, opponentScore: oppScore, win: parseInt(gvvbScore) > parseInt(oppScore) };
}

export function opponentName(match: Match): string {
  return match.home.includes(CLUB) ? match.away : match.home;
}
