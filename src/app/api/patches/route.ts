import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface PatchEntry {
  id: number | string;
  version: string;
  title: string;
  date: string;
  summary: string;
  digest: string;
  url: string;
  sourceGame: string;
  highlights?: string[];
  changes?: Record<string, string[]>;
  status?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameFilter = searchParams.get('game') || undefined;

  try {
    // ── PRIMARY: Read curated patches-feed.json ──
    const feedPath = path.join(process.cwd(), 'public', 'patches-feed.json');
    const raw = await fs.readFile(feedPath, 'utf-8').catch(() => null);

    if (raw) {
      let patches: PatchEntry[] = [];

      // Handle both formats: plain array OR { patches: [...] }
      try {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          patches = data;
        } else if (Array.isArray(data.patches)) {
          patches = data.patches;
        }
      } catch {
        // JSON parse failed, try CommunityDragon below
      }

      if (patches.length > 0) {
        // Normalize sourceGame (feed uses lowercase "lol", we use "LoL")
        patches = patches.map((p: any) => ({
          id: p.id,
          version: p.version,
          title: p.title,
          summary: p.summary || '',
          digest: p.digest || '',
          date: p.date,
          url: p.url || '',
          sourceGame: normalizeSourceGame(p.sourceGame || p.game),
          highlights: p.highlights,
          changes: p.changes,
          status: p.status,
        }));

        // Apply game filter
        let filtered = patches;
        if (gameFilter === 'lol') filtered = patches.filter(p => p.sourceGame === 'LoL');
        else if (gameFilter === 'wildrift' || gameFilter === 'wr') filtered = patches.filter(p => p.sourceGame === 'WR');

        return NextResponse.json(filtered);
      }
    }

    // ── FALLBACK: CommunityDragon patches ──
    const cdResponse = await fetch(
      'https://raw.communitydragon.org/latest/cdragon/patches.json',
      { next: { revalidate: 3600 } }
    );

    if (cdResponse.ok) {
      const cdData = await cdResponse.json();
      const patches: PatchEntry[] = [];

      if (Array.isArray(cdData.patches)) {
        const latestPatches = cdData.patches.slice(0, 10);
        latestPatches.forEach((patch: any, index: number) => {
          const version = patch.id || patch.name || patch.patch || `16.${8 - index}`;
          patches.push({
            id: index + 1,
            version,
            title: patch.title || `Patch ${version}`,
            date: patch.date || new Date(Date.now() - index * 14 * 86400000).toISOString().split('T')[0],
            summary: patch.notes || `Notas del parche ${version}.`,
            digest: patch.notes || `Cambios en el parche ${version}.`,
            url: `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${version.replace(/\./g, '-')}-notes/`,
            sourceGame: 'LoL',
          });
        });
      }

      let filtered = patches;
      if (gameFilter === 'lol') filtered = patches.filter(p => p.sourceGame === 'LoL');
      else if (gameFilter === 'wildrift' || gameFilter === 'wr') filtered = patches.filter(p => p.sourceGame === 'WR');

      return NextResponse.json(filtered);
    }
  } catch (err) {
    console.error('[/api/patches] Error:', err);
  }

  // ── LAST RESORT: hardcoded fallback ──
  const fallback: PatchEntry[] = [
    { id: 1, version: '26.9', title: 'Patch 26.9 — Pandemonium', date: '2026-04-29', summary: 'Season 2 Pandemonium launch.', digest: 'Season 2 Pandemonium.', url: '', sourceGame: 'LoL' },
    { id: 2, version: '26.8', title: 'Patch 26.8 — Ajustes de Temporada', date: '2026-04-17', summary: 'Ajustes de balance.', digest: 'Ajustes de balance.', url: '', sourceGame: 'LoL' },
  ];

  let filtered = fallback;
  if (gameFilter === 'lol') filtered = fallback.filter(p => p.sourceGame === 'LoL');
  else if (gameFilter === 'wildrift' || gameFilter === 'wr') filtered = fallback.filter(p => p.sourceGame === 'WR');

  return NextResponse.json(filtered);
}

function normalizeSourceGame(raw: string): string {
  const lower = (raw || '').toLowerCase();
  if (lower === 'lol' || lower === 'league of legends' || lower === 'leagueoflegends') return 'LoL';
  if (lower === 'wr' || lower === 'wildrift' || lower === 'wild rift') return 'WR';
  if (lower === 'val' || lower === 'valorant') return 'VAL';
  return 'LoL';
}
