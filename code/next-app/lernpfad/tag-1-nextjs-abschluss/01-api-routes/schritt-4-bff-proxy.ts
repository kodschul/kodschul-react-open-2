// ============================================================
// SCHRITT 4 – BFF-Pattern: Externe API über eigene Route proxyen
// ============================================================
//
// "Backend for Frontend" (BFF) – warum?
//
//   Problem ohne BFF:
//     Frontend → direkt externe API
//     ✗ API-Keys landen im Browser-Bundle
//     ✗ Response-Format nicht kontrollierbar
//     ✗ CORS-Probleme möglich
//     ✗ Caching schwer nachrüstbar
//
//   Lösung mit BFF:
//     Frontend → eigene Next.js Route → externe API
//     ✓ Secrets bleiben serverseitig
//     ✓ Response-Shape selbst bestimmen
//     ✓ Next.js fetch-Cache nutzen (revalidate)
//     ✓ Rate-Limiting / Auth leicht einbaubar
//
// Diese Datei gehört nach: app/api/characters/route.ts
// Erreichbar unter: GET /api/characters?page=2
// ============================================================

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Query-Parameter aus der eingehenden URL lesen
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page") ?? "1";

  // Serverseitiger fetch – der API-Key (falls einer gebraucht würde)
  // bleibt hier auf dem Server und kommt NIE ins Browser-Bundle.
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    {
      // Next.js-Erweiterung: Daten für 60 Sekunden cachen, dann neu laden
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Fehler beim Laden der Charaktere von der externen API." },
      { status: res.status }
    );
  }

  const data = await res.json();

  // Response-Shape: nur zurückgeben was das Frontend wirklich braucht.
  // Felder wie "episode", "url", "created" werden weggelassen → kleinere Payloads.
  const simplified = data.results.map(
    (c: { id: number; name: string; status: string; image: string }) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      image: c.image,
    })
  );

  return NextResponse.json({
    page: Number(page),
    totalPages: data.info.pages,
    characters: simplified,
  });
}
