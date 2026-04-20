"use client";

// ============================================================
// SCHRITT 2 – Loading & Error State aus Redux rendern
// ============================================================
//
// Die drei Zustände eines async Thunks immer behandeln:
//   1. loading = true  → Spinner / Skeleton zeigen
//   2. error != null   → Fehlermeldung + Retry-Button
//   3. items.length    → Daten anzeigen
//
// Diese Datei: CharactersRedux.tsx
// ============================================================

import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../02-redux-toolkit/schritt-1-store";
import {
  fetchCharacters,
  selectCharacters,
  selectCharactersLoading,
  selectCharactersError,
} from "./schritt-1-async-thunk";

export function CharactersRedux() {
  const dispatch = useAppDispatch();

  // Drei Selectors – jeder gibt genau seinen Teil des State zurück
  const characters = useAppSelector(selectCharacters);
  const loading = useAppSelector(selectCharactersLoading);
  const error = useAppSelector(selectCharactersError);

  // Beim ersten Render: Charaktere laden
  useEffect(() => {
    dispatch(fetchCharacters(1));
  }, [dispatch]);

  // ── State 1: Laden ────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    );
  }

  // ── State 2: Fehler ───────────────────────────────────────
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        {/* Retry: Thunk nochmal dispatchen */}
        <button
          onClick={() => dispatch(fetchCharacters(1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Nochmal versuchen
        </button>
      </div>
    );
  }

  // ── State 3: Daten vorhanden ──────────────────────────────
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {characters.map((character) => (
        <div
          key={character.id}
          className="bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-full aspect-square object-cover"
          />
          <div className="p-3">
            <p className="font-semibold text-sm">{character.name}</p>
            <p className="text-xs text-gray-500">{character.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Redux DevTools Live-Demo:
// ============================================================
//
// 1. Extension öffnen (F12 → Redux Tab)
// 2. dispatch(fetchCharacters()) auslösen
// 3. Folgende Actions beobachten:
//    characters/fetch/pending    → loading: true
//    characters/fetch/fulfilled  → items: [...], loading: false
//
// 4. Zeit-Reise: Auf "pending" klicken → App zeigt Lade-State
// 5. Zeit-Reise: Auf "fulfilled" klicken → Daten sichtbar
