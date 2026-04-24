export interface Match {
  code: string;
  date: string;   // DD/MM/YY
  time: string;
  home: string;
  away: string;
  scoreHome: string | null;
  scoreAway: string | null;
  sets: string | null;
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
  for (let i = 0; i < cells.length - 4; i++) {
    if (!codeRe.test(cells[i])) continue;
    if (!dateRe.test(cells[i + 1])) continue;
    if (!timeRe.test(cells[i + 2])) continue;

    const home = cells[i + 3] ?? "";
    let away = cells[i + 4] ?? "";
    let scoreHome: string | null = null;
    let scoreAway: string | null = null;
    let sets: string | null = null;

    if (away === "xxxxx") {
      away = "";
    } else if (cells[i + 5] && scoreRe.test(cells[i + 5])) {
      scoreHome = cells[i + 5];
      scoreAway = cells[i + 6] ?? null;
      sets = cells[i + 7] ?? null;
    }

    matches.push({ code: cells[i], date: cells[i + 1], time: cells[i + 2], home, away, scoreHome, scoreAway, sets });
  }

  return matches.filter((m) => m.home.includes(CLUB) || m.away.includes(CLUB));
}

export async function fetchPoule(poule: string): Promise<Match[]> {
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
    const html = new TextDecoder("latin-1").decode(buf);
    return parseMatches(html);
  } catch {
    return [];
  }
}

export function formatDate(ddmmyy: string): string {
  const [d, m, y] = ddmmyy.split("/");
  const months = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} 20${y}`;
}

export function matchResult(match: Match): { gvvbScore: string; opponentScore: string; win: boolean | null } | null {
  if (match.scoreHome === null) return null;
  const gvvbHome = match.home.includes(CLUB);
  const gvvbScore = gvvbHome ? match.scoreHome! : match.scoreAway!;
  const oppScore = gvvbHome ? match.scoreAway! : match.scoreHome!;
  return { gvvbScore, opponentScore: oppScore, win: parseInt(gvvbScore) > parseInt(oppScore) };
}

export function opponentName(match: Match): string {
  return match.home.includes(CLUB) ? match.away : match.home;
}
