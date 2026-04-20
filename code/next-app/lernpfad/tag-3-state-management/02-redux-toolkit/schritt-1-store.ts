// ============================================================
// SCHRITT 1 – Redux Store einrichten
// ============================================================
//
// Redux Toolkit (RTK) ist das moderne Redux.
// Das alte Redux hatte viel Boilerplate – RTK hat das gelöst.
//
// Kernkonzepte:
//   Store    → Die einzige Wahrheitsquelle ("single source of truth")
//   Slice    → Reducer + Actions in einer Datei (createSlice)
//   Selector → Teile des State lesen
//   Dispatch → Actions an den Store schicken
//
// Installation:
//   npm install @reduxjs/toolkit react-redux
//
// Diese Datei: store.ts
// Gehört nach: app/lernpfad/tag-3/demo/store.ts
// ============================================================

import { configureStore } from "@reduxjs/toolkit";

// Slices werden in separaten Dateien definiert (Schritt 2)
// import { counterReducer } from "./counterSlice";
// import { todoReducer } from "./todoSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // todos: todoReducer,
    // characters: charactersReducer,
  },
});

// ── TypeScript-Typen ableiten ─────────────────────────────────
//
// RootState: der komplette State-Typ (für useSelector)
// AppDispatch: der Dispatch-Typ (für useDispatch)
//
// Diese Typen NICHT manuell schreiben – aus dem Store ableiten!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ── Typisierte Hooks (best practice) ─────────────────────────
//
// Statt useSelector/useDispatch direkt, typisierte Versionen nutzen.
// Diese Hooks ein Mal definieren und überall importieren.

import { useDispatch, useSelector } from "react-redux";

// Gibt dispatch mit dem korrekten AppDispatch-Typ zurück
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Gibt den State mit dem korrekten RootState-Typ zurück
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

// ============================================================
// Tipp: Redux DevTools
// ============================================================
//
// configureStore() aktiviert Redux DevTools automatisch!
// Browser-Extension installieren:
//   https://chrome.google.com/webstore/detail/redux-devtools/
//
// Features:
//   ✓ State-Verlauf als Timeline
//   ✓ Zeit-Reise-Debugging (zu jedem State-Moment springen)
//   ✓ Action-Log mit Payload
//   ✓ State-Diff zwischen Actions
