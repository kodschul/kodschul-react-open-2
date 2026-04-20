// ============================================================
// SCHRITT 4 – createAsyncThunk: Async State in Redux
// ============================================================
//
// Das Problem:
//   Reducer müssen synchron sein – kein async/await erlaubt!
//
// Die Lösung: createAsyncThunk
//   → Erzeugt automatisch drei Actions:
//       pending    → Anfrage läuft
//       fulfilled  → Erfolgreich abgeschlossen
//       rejected   → Fehler aufgetreten
//
// In der Komponente:
//   dispatch(fetchCharacters())  ← startet den Thunk
//
// Im Slice:
//   extraReducers reagiert auf die drei Lifecycle-States
//
// Diese Datei: charactersSlice.ts
// ============================================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Character = {
  id: number;
  name: string;
  status: string;
  image: string;
};

type CharactersState = {
  items: Character[];
  loading: boolean;   // true = lädt gerade
  error: string | null; // null = kein Fehler
};

const initialState: CharactersState = {
  items: [],
  loading: false,
  error: null,
};

// ── createAsyncThunk ──────────────────────────────────────────
// Erster Parameter:  Action-Type-Präfix (z.B. "characters/fetch")
// Zweiter Parameter: async Funktion (der eigentliche fetch)
export const fetchCharacters = createAsyncThunk(
  "characters/fetch",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/characters?page=${page}`);
      if (!res.ok) {
        // rejectWithValue für eigene Fehlermeldungen nutzen
        return rejectWithValue("Charaktere konnten nicht geladen werden.");
      }
      const data = await res.json();
      return data.characters as Character[];
    } catch {
      return rejectWithValue("Netzwerkfehler – bitte prüft eure Verbindung.");
    }
  }
);

// ── Slice mit extraReducers ───────────────────────────────────
const charactersSlice = createSlice({
  name: "characters",
  initialState,

  // reducers: synchrone Actions (hier nicht nötig)
  reducers: {},

  // extraReducers: reagiert auf createAsyncThunk-Actions
  extraReducers: (builder) => {
    // Anfrage gestartet → loading = true
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Erfolgreich → Daten speichern
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    // Fehler → Fehlermeldung speichern
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? "Unbekannter Fehler";
    });
  },
});

// Selectors
import type { RootState } from "./schritt-1-store";
export const selectCharacters = (state: RootState) => state.characters.items;
export const selectCharactersLoading = (state: RootState) => state.characters.loading;
export const selectCharactersError = (state: RootState) => state.characters.error;

export default charactersSlice.reducer;
