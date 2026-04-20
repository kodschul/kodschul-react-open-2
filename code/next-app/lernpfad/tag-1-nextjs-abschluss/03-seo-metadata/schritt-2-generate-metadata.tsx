// ============================================================
// SCHRITT 2 – generateMetadata: Dynamische Metadata
// ============================================================
//
// Problem: Bei dynamischen Routen (z.B. /characters/42) ist der
//          Seitentitel erst zur Laufzeit bekannt – nicht beim Build.
//
// Lösung: generateMetadata({ params, searchParams }) – eine async
//         Funktion, die Metadata nach einem API-Aufruf zurückgibt.
//
// Wichtig:
//   ✓ Async erlaubt → kann fetch, Datenbankzugriff etc. nutzen
//   ✓ params ist in Next.js 15+ ein Promise → await!
//   ✓ generateMetadata und die Page teilen denselben fetch-Cache
//     → kein doppelter API-Aufruf!
//
// Diese Datei gehört nach: app/characters/[id]/page.tsx
// ============================================================

import { Metadata } from "next";

// Hilfsfunktion – wird sowohl von generateMetadata als auch der Page genutzt.
// Next.js dedupliziert identische fetch-Aufrufe automatisch (Request Memoization).
async function fetchCharacter(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 300 }, // 5 Minuten cachen
  });
  if (!res.ok) return null;
  return res.json();
}

// ── generateMetadata ──────────────────────────────────────────
// Wird von Next.js aufgerufen bevor die Page gerendert wird.
// Gibt Metadata zurück – inklusive Open Graph für Social Cards.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = await fetchCharacter(id);

  // Fallback wenn Charakter nicht gefunden
  if (!character) {
    return { title: "Charakter nicht gefunden" };
  }

  return {
    // Seitentitel = Name des Charakters (+ Template aus Root-Layout)
    title: character.name,
    description: `${character.species} – Status: ${character.status}`,

    // Open Graph: Wenn jemand diese Seite teilt, sieht er das Charakter-Bild
    openGraph: {
      title: character.name,
      description: `${character.species} aus ${character.origin.name}`,
      images: [
        {
          url: character.image,
          width: 300,
          height: 300,
          alt: character.name,
        },
      ],
    },
  };
}

// ── Page Component ────────────────────────────────────────────
// fetch-Aufruf wird vom Cache bedient – keine doppelte HTTP-Anfrage
export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await fetchCharacter(id);

  if (!character) {
    // notFound() aus next/navigation würde hier not-found.tsx rendern
    return <div>Nicht gefunden</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{character.name}</h1>
      <p>{character.status} – {character.species}</p>
      <img src={character.image} alt={character.name} className="rounded-lg mt-4" />
    </div>
  );
}
