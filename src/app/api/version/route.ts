import { NextResponse } from 'next/server';

interface VersionInfo {
  lol: string;
  lolFull: string;
  wr: string;
  fetchedAt: string;
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

let cachedVersions: VersionInfo | null = null;
let cacheTimestamp = 0;

export async function GET() {
  const now = Date.now();

  // Return cached if still valid
  if (cachedVersions && now - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json(cachedVersions);
  }

  try {
    // Fetch LoL versions from Data Dragon (free, no auth needed)
    const versionRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
      next: { revalidate: 1800 },
    });

    if (!versionRes.ok) {
      throw new Error('Failed to fetch versions');
    }

    const versions: string[] = await versionRes.json();

    // Filter LoL versions (format: X.Y.Z)
    const lolVersions = versions.filter(v => /^\d+\.\d+\.\d+$/.test(v));
    const latestLol = lolVersions[0] || '26.8.1';
    const latestLolShort = latestLol.split('.').slice(0, 2).join('.');

    // Wild Rift version (approximate - WR doesn't have a public version API)
    // WR patches track differently; actual WR is ~6.x-7.x range
    // Use a reasonable mapping based on LoL version
    const lolMinor = parseInt(latestLol.split('.')[1]);
    const wrVersion = `6.${lolMinor <= 8 ? lolMinor : 8}`;

    cachedVersions = {
      lol: latestLol,
      lolFull: latestLol,
      wr: wrVersion,
      fetchedAt: new Date().toISOString(),
    };

    cacheTimestamp = now;

    return NextResponse.json(cachedVersions);
  } catch (error) {
    console.error('Version fetch error:', error);

    // Fallback
    return NextResponse.json({
      lol: '26.8.1',
      lolFull: '26.8.1',
      wr: '6.8',
      fetchedAt: new Date().toISOString(),
    });
  }
}
