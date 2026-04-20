// ============================================================
// SCHRITT 3 – not-found.tsx + notFound(): Eigene 404-Seite
// ============================================================
//
// Zwei Teile arbeiten zusammen:
//
//   1. not-found.tsx → die UI, die bei 404 angezeigt wird
//   2. notFound()    → wirft einen 404 aus einer Server Component
//
// Dateiname: not-found.tsx  (GENAU so)
// Ort:       app/not-found.tsx            → globale 404-Seite
//            app/characters/not-found.tsx  → nur für /characters/*
//
// Hierarchie:
//   Das nächste not-found.tsx in der Ordner-Struktur greift.
//   Root-Level (app/) ist der globale Fallback.
//
// Diese Datei gehört nach: app/characters/[id]/not-found.tsx
// ============================================================

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <p className="text-8xl font-black text-gray-200 mb-4">404</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Charakter nicht gefunden
        </h2>
        <p className="text-gray-500 mb-6">
          Dieser Charakter existiert nicht oder wurde aus dem Universum
          entfernt.
        </p>
        <Link
          href="/characters"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// So wird notFound() in der Server Component eingesetzt:
// ============================================================
//
// import { notFound } from "next/navigation";
//
// export default async function CharacterDetailPage({ params }) {
//   const { id } = await params;
//   const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
//
//   if (!res.ok) {
//     notFound(); // ← wirft NEXT_NOT_FOUND, rendert not-found.tsx
//   }
//
//   const character = await res.json();
//   return <div>{character.name}</div>;
// }
//
// Wichtig: nach notFound() wird NICHTS mehr in der Funktion ausgeführt.
// Der Aufruf ist wie ein "return" + Fehler-Weitergabe an Next.js.
