import { NextRequest, NextResponse } from 'next/server';
import { getProPicks } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region') || undefined;
    const picks = getProPicks(region);
    return NextResponse.json(picks);
  } catch (error) {
    console.error('[API /pro-picks] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pro picks' }, { status: 500 });
  }
}
