"use client";

// ============================================================
// TAG 3 – TRANSFER AUFGABE: Characters mit Redux
// ============================================================
//
// Ziel: Die bestehende CharactersPage so umbauen, dass der
//       Lade-State (loading, error, characters) in Redux lebt
//       statt in React Query.
//
// Was bereits vorhanden ist:
//   ✓ app/api/characters/route.ts  (API-Route vom Tag 1)
//   ✓ app/characters/CharactersPage.tsx (mit React Query)
//
// ── AUFGABE 1: charactersSlice erstellen ─────────────────────
//
//   Erstellt: app/lernpfad/tag-3/demo/charactersSlice.ts
//
//   Braucht:
//   - type Character = { id, name, status, image }
//   - type CharactersState = { items, loading, error, page }
//   - createAsyncThunk fetchCharacters(page: number)
//     → ruft /api/characters?page=X auf
//   - extraReducers für pending / fulfilled / rejected
//   - Selectors: selectCharacters, selectLoading, selectError, selectPage
//
// ── AUFGABE 2: Store um charactersReducer erweitern ──────────
//
//   Öffnet: app/lernpfad/tag-3/demo/store.ts
//   Fügt characters: charactersReducer hinzu.
//
// ── AUFGABE 3: Komponente bauen ──────────────────────────────
//
//   Erstellt: app/lernpfad/tag-3/aufgabe/CharactersReduxPage.tsx
//   (Starter unten)
//
// ── AUFGABE 4 (Bonus): kanbanSlice ───────────────────────────
//
//   Erstellt einen kanbanSlice mit:
//   - Spalten: "todo" | "inProgress" | "done"
//   - Action moveCard(id, vonSpalte, zuSpalte)
//   - Jede Bewegung ist im Redux DevTools sichtbar
//
// ============================================================

// ── Starter für Aufgabe 3 ────────────────────────────────────

import { useEffect, useState } from "react";
// TODO: Store und Slice importieren
// import { useAppDispatch, useAppSelector } from "../demo/store";
// import { fetchCharacters, selectCharacters, selectLoading, selectError } from "./charactersSlice";

export default function CharactersReduxPage() {
  // TODO: useAppDispatch und useAppSelector nutzen
  const [characters] = useState([]); // ← durch Redux ersetzen
  const loading = false;             // ← durch Redux ersetzen
  const error = null;                // ← durch Redux ersetzen

  // TODO: useEffect → dispatch(fetchCharacters(1))

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        {/* TODO: Retry-Button mit dispatch(fetchCharacters(1)) */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Charaktere (Redux State)
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {characters.map((c: { id: number; name: string; status: string; image: string }) => (
          <div key={c.id} className="bg-white rounded-xl shadow overflow-hidden">
            <img src={c.image} alt={c.name} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-gray-500">{c.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
