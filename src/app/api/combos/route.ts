import { NextResponse } from 'next/server';
import { getCombos } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game') || undefined;
    const combos = getCombos(game);
    return NextResponse.json(combos);
  } catch (error) {
    console.error('[API /combos] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch combos' }, { status: 500 });
  }
}
