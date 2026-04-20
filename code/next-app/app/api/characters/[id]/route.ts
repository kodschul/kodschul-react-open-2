import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return NextResponse.json(
      { error: `Ungültige ID: "${id}"` },
      { status: 400 }
    );
  }

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Charakter mit ID ${id} nicht gefunden.` },
      { status: 404 }
    );
  }

  const character = await res.json();

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
