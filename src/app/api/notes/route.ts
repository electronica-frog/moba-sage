import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'gamer-frog/moba-sage';
const NOTES_PATH = 'data/community-notes.json';

interface CommunityNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  status: 'idea' | 'doing' | 'done';
}

interface NotesFile {
  lastUpdated: string;
  notes: CommunityNote[];
}

// Cache
let cached: { data: NotesFile; sha: string } | null = null;
let cacheTime = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 min

async function githubRead(): Promise<{ data: NotesFile; sha: string } | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${NOTES_PATH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' },
    });
    if (!res.ok) return null;
    const file = await res.json();
    const content = Buffer.from(file.content, 'base64').toString('utf-8');
    return { data: JSON.parse(content), sha: file.sha };
  } catch {
    return null;
  }
}

async function githubWrite(data: NotesFile, sha: string): Promise<boolean> {
  try {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${NOTES_PATH}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `note: ${data.notes.length} notas comunitarias`,
        content,
        sha,
        branch: 'main',
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function getNotes(): Promise<{ data: NotesFile; sha: string }> {
  const now = Date.now();
  if (cached && now - cacheTime < CACHE_TTL) return cached;

  const result = await githubRead();
  if (result) {
    cached = result;
    cacheTime = now;
    return result;
  }

  // Fallback
  const fallback: NotesFile = { lastUpdated: new Date().toISOString(), notes: [] };
  return { data: fallback, sha: '' };
}

// GET /api/notes — Read all notes
export async function GET() {
  try {
    const { data } = await getNotes();
    return NextResponse.json({
      notes: data.notes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      lastUpdated: data.lastUpdated,
      count: data.notes.length,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST /api/notes — Add a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, content } = body;

    if (!author || !content) {
      return NextResponse.json({ error: 'Author and content are required' }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Note too long (max 500 chars)' }, { status: 400 });
    }

    const { data, sha } = await getNotes();

    const newNote: CommunityNote = {
      id: `n${Date.now()}`,
      author: String(author).slice(0, 30),
      content: String(content).slice(0, 500),
      timestamp: new Date().toISOString(),
      status: 'idea',
    };

    data.notes.push(newNote);
    data.lastUpdated = new Date().toISOString();

    const success = await githubWrite(data, sha);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
    }

    // Invalidate cache
    cached = null;
    cacheTime = 0;

    return NextResponse.json({ note: newNote, count: data.notes.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE /api/notes — Remove a note by id
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note id is required' }, { status: 400 });
    }

    const { data, sha } = await getNotes();
    const before = data.notes.length;
    data.notes = data.notes.filter(n => n.id !== id);

    if (data.notes.length === before) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    data.lastUpdated = new Date().toISOString();
    const success = await githubWrite(data, sha);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
    }

    cached = null;
    cacheTime = 0;

    return NextResponse.json({ deleted: id, count: data.notes.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
