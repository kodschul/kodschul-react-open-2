// ============================================================
// SCHRITT 3 – Dynamische Segment-Parameter
// ============================================================
//
// Dateistruktur: app/api/characters/[id]/route.ts
//                                    ^^^^
//                     Das ist das dynamische Segment.
//
// Das [id] im Ordnernamen taucht im zweiten Parameter wieder auf.
//
// ACHTUNG (Next.js 15+): params ist ein Promise → await nicht vergessen!
//
// Erreichbar unter: GET /api/characters/1
//                   GET /api/characters/42
// ============================================================

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  // Next.js 15+: params als Promise typisieren
  { params }: { params: Promise<{ id: string }> }
) {
  // Pflicht: params awaiten
  const { id } = await params;

  // Einfache Validierung: ist id eine gültige Zahl?
  if (isNaN(Number(id))) {
    return NextResponse.json(
      { error: `Ungültige ID: "${id}" ist keine Zahl.` },
      { status: 400 }
    );
  }

  // Externe API aufrufen
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  // Externe API gibt 404 zurück → wir geben auch 404 zurück
  if (!res.ok) {
    return NextResponse.json(
      { error: `Charakter mit ID ${id} nicht gefunden.` },
      { status: 404 }
    );
  }

  const character = await res.json();

  // Nur die relevanten Felder zurückgeben (Response-Shape schlank halten)
  return NextResponse.json({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    origin: character.origin.name,
    location: character.location.name,
  });
}
