"use client";

// ============================================================
// TAG 1 – TRANSFER AUFGABE
// ============================================================
//
// Ziel: Die bestehende CharactersPage so umbauen, dass sie nicht
//       mehr direkt die Rick & Morty API aufruft, sondern über
//       eure eigene Next.js API-Route (/api/characters) geht.
//
// Was ihr dafür braucht:
//   ✓ app/api/characters/route.ts    (bereits vorhanden – Schritt 4)
//   ✓ app/characters/loading.tsx     (bereits vorhanden – Schritt 1)
//   ✓ app/characters/error.tsx       (bereits vorhanden – Schritt 2)
//   ✓ app/characters/not-found.tsx   (bereits vorhanden – Schritt 3)
//
// ── AUFGABE 1: BFF-Proxy aktivieren ──────────────────────────
//
//   Öffnet: app/characters/CharactersPage.tsx
//   Ändert den API-Aufruf von:
//     api.get(`/character?page=${pageToFetch}`)    ← direkt extern
//   auf:
//     api.get(`/api/characters?page=${pageToFetch}`) ← eigene Route
//
//   Tipp: Die baseURL im axios-Client muss angepasst werden,
//         oder ihr nutzt direkt den relativen Pfad ohne baseURL.
//
// ── AUFGABE 2: notFound() einbauen ───────────────────────────
//
//   Öffnet: app/characters/[id]/page.tsx
//   Fügt notFound() ein wenn fetchCharacterContent() null zurückgibt.
//
//   Import: import { notFound } from "next/navigation";
//   Einsatz: if (!character) { notFound(); }
//
// ── AUFGABE 3: generateMetadata für characters/page.tsx ──────
//
//   Die bestehende generateMetadata in app/characters/page.tsx
//   gibt noch keinen sinnvollen Titel zurück.
//   Ändert es auf: title: "Alle Charaktere | Rick & Morty App"
//
// ── AUFGABE 4 (Bonus): sitemap.ts erweitern ──────────────────
//
//   app/sitemap.ts lädt aktuell nur Seite 1 der API.
//   Erweitert sie so, dass ALLE Charakter-IDs (alle Seiten) geladen
//   und als URLs eingetragen werden.
//
//   Tipp: data.info.pages gibt die Gesamtanzahl der Seiten an.
//         Macht mehrere fetch-Aufrufe mit Promise.all().
//
// ============================================================
// Starter-Struktur – zeigt wo die Änderungen hingehören
// ============================================================

// ── AUFGABE 1 – Starter ──────────────────────────────────────
// Datei: app/characters/CharactersPage.tsx
//
// VORHER:
// const api = axios.create({
//   baseURL: "https://rickandmortyapi.com/api",
// });
// const fetchCharacters = async (pageToFetch = 1) =>
//   (await api.get(`/character?page=${pageToFetch}`))?.data?.results;
//
// NACHHER (TODO: implementieren):
// const fetchCharacters = async (pageToFetch = 1) => {
//   const res = await fetch(`/api/characters?page=${pageToFetch}`);
//   const data = await res.json();
//   return data.characters; // ← unser Proxy gibt { characters: [...] }
// };

// ── AUFGABE 2 – Starter ──────────────────────────────────────
// Datei: app/characters/[id]/page.tsx
// (nach dem fetchCharacterContent-Aufruf einfügen)
//
// import { notFound } from "next/navigation";
//
// export default async function CharacterDetailServerPage({ params }) {
//   const { id } = await params;
//   const character = await fetchCharacterContent(id);
//
//   // TODO: notFound() aufrufen wenn character null/undefined ist
//
//   return <CharacterDetailPage character={character} />;
// }

export default function AufgabeTag1() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tag 1 – Transfer Aufgabe</h1>
      <p className="text-gray-600">
        Schaut in diese Datei für die Aufgabenbeschreibung (Kommentare oben).
      </p>
    </div>
  );
}
