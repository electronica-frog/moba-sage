import { getChampions } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const champions = getChampions({
      role: searchParams.get('role') || undefined,
      tier: searchParams.get('tier') || undefined,
      game: searchParams.get('game') || undefined,
      search: searchParams.get('search') || undefined,
    });
    return NextResponse.json(champions);
  } catch (error) {
    console.error('[API /champions] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch champions' }, { status: 500 });
  }
}
