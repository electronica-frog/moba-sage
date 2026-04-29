import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

interface PatchEntry {
  id: number;
  version: string;
  title: string;
  date: string;
  summary: string;
  digest: string;
  url: string;
  sourceGame: string;
  highlights?: string[];
  changes?: Record<string, string[]>;
}

const FALLBACK_PATCHES: PatchEntry[] = [
  {
    id: 1,
    version: '26.9',
    title: 'Patch 26.9 — Nuevo Campeón Zaahen',
    date: '2026-04-29',
    summary: 'Zaahen llega como nuevo campeón rompiendo top lane. Nerfs a Mordekaiser, Briar y Ambessa. Buffs a Viktor y Camille.',
    digest: 'Patch 26.9 trae a Zaahen como nuevo campeón rompiendo top lane. Nerfs significativos a Mordekaiser, Briar y Ambessa. Buffs a Viktor y Camille. Meta shift hacia hypercarries ADC y enchanters support.',
    url: 'https://www.leagueoflegends.com/en-us/news/game-updates/patch-26-9-notes/',
    sourceGame: 'LoL',
  },
  {
    id: 2,
    version: '26.8',
    title: 'Patch 26.8 — Ajustes de Temporada',
    date: '2026-04-17',
    summary: 'Ajustes de balance para la temporada 2026. Meta estable pre-Season 2. Cambios a Ornn, Garen, Nocturne y varios bruisers.',
    digest: 'Patch 26.8 trae cambios significativos al meta actual. Se ajustan items mythic y objetos legendarios, se modifican las ratios de la jungla, y varios campeones reciben buffs y nerfs de balance.',
    url: 'https://www.leagueoflegends.com/en-us/news/game-updates/patch-26-8-notes/',
    sourceGame: 'LoL',
  },
  {
    id: 3,
    version: '6.8',
    title: 'Patch 6.8 — Wild Rift Mid Season',
    date: '2026-04-15',
    summary: 'Ajustes de balance para Wild Rift mid-season. Buffs a Master Yi, Lee Sin. Ahri y Darius se consolidan.',
    digest: 'Patch 6.8 de Wild Rift trae ajustes significativos al meta móvil. Master Yi recibe buffs en su Alpha Strike, Lee Sin tiene mejor scaling con items bruiser.',
    url: 'https://www.leagueoflegends.com/en-us/news/game-updates/wild-rift-patch-6-8-notes/',
    sourceGame: 'WR',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameFilter = searchParams.get('game') || undefined;

  // ===== PRIORITY 1: Local curated patches-feed.json =====
  try {
    const feedPath = join(process.cwd(), 'public', 'patches-feed.json');
    const feedContent = readFileSync(feedPath, 'utf-8');
    const feedData = JSON.parse(feedContent);

    let patches: PatchEntry[] = [];

    // Handle both array and { patches: [...] } formats
    const feedPatches = Array.isArray(feedData) ? feedData : (feedData.patches || []);

    for (const fp of feedPatches) {
      const normalizedGame = fp.game === 'lol' ? 'LoL' : fp.game === 'wildrift' ? 'WR' : fp.game || 'LoL';
      patches.push({
        id: typeof fp.id === 'number' ? fp.id : patches.length + 1,
        version: fp.version,
        title: fp.title || `Patch ${fp.version}`,
        date: fp.date || new Date().toISOString().split('T')[0],
        summary: fp.summary || '',
        digest: fp.digest || '',
        url: fp.url || '',
        sourceGame: normalizedGame,
        highlights: fp.highlights,
        changes: fp.changes,
      });
    }

    // Sort by date descending
    patches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply game filter
    if (gameFilter === 'lol') patches = patches.filter(p => p.sourceGame === 'LoL');
    else if (gameFilter === 'wildrift') patches = patches.filter(p => p.sourceGame === 'WR');

    if (patches.length > 0) {
      return NextResponse.json(patches);
    }
  } catch {
    // patches-feed.json not found or invalid — continue to next source
  }

  // ===== PRIORITY 2: CommunityDragon (live fallback) =====
  try {
    const cdResponse = await fetch(
      'https://raw.communitydragon.org/latest/cdragon/patches.json',
      { next: { revalidate: 3600 } }
    );

    if (cdResponse.ok) {
      const cdData = await cdResponse.json();
      const patches: PatchEntry[] = [];

      if (Array.isArray(cdData.patches)) {
        const latestPatches = cdData.patches.slice(0, 10);
        latestPatches.forEach((patch: { id?: string; name?: string; patch?: string; title?: string; date?: string; banner?: string; notes?: string }, index: number) => {
          const version = patch.id || patch.name || patch.patch || `16.${8 - index}`;
          const title = patch.title || `Patch ${version}`;
          const date = patch.date || new Date(Date.now() - index * 14 * 86400000).toISOString().split('T')[0];
          const url = patch.banner
            ? `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${version.replace(/\./g, '-')}-notes/`
            : `https://www.leagueoflegends.com/en-us/news/game-updates/`;

          patches.push({
            id: index + 1,
            version,
            title,
            date,
            summary: patch.notes || `Notas del parche ${version} con ajustes de balance.`,
            digest: patch.notes || `Cambios en el parche ${version}.`,
            url,
            sourceGame: 'LoL',
          });
        });
      }

      // Add WR fallback
      patches.push({
        id: patches.length + 1,
        version: '6.8',
        title: 'Patch 6.8 — Wild Rift Mid Season',
        date: '2026-04-15',
        summary: 'Ajustes de balance para Wild Rift mid-season.',
        digest: 'Patch 6.8 de Wild Rift trae ajustes significativos al meta móvil.',
        url: 'https://www.leagueoflegends.com/en-us/news/game-updates/wild-rift-patch-6-8-notes/',
        sourceGame: 'WR',
      });

      let filtered = patches;
      if (gameFilter === 'lol') filtered = patches.filter(p => p.sourceGame === 'LoL');
      else if (gameFilter === 'wildrift') filtered = patches.filter(p => p.sourceGame === 'WR');

      return NextResponse.json(filtered);
    }
  } catch {
    // CommunityDragon failed — continue to fallback
  }

  // ===== PRIORITY 3: Hardcoded fallback =====
  let filtered = FALLBACK_PATCHES;
  if (gameFilter === 'lol') filtered = FALLBACK_PATCHES.filter(p => p.sourceGame === 'LoL');
  else if (gameFilter === 'wildrift') filtered = FALLBACK_PATCHES.filter(p => p.sourceGame === 'WR');

  return NextResponse.json(filtered);
}
