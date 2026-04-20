// ============================================================
// SCHRITT 1 – DnD Konzept: Warum komplex & welche Library?
// ============================================================
//
// Drag & Drop im Browser klingt einfach – ist es aber nicht:
//
//   ✗ Native HTML5 DnD: kein Touch-Support, inkonsistentes Verhalten
//   ✗ Reaktionsfähige verschachtelte Drop-Targets
//   ✗ Performance bei langen Listen
//   ✗ Barrierefreiheit (Keyboard DnD)
//
// Libraries im Vergleich:
//   react-dnd           → flexibel, gut typisiert, älter, Backend-Konzept
//   dnd-kit             → modern, leichtgewichtig, sehr aktiv, empfohlen
//   react-beautiful-dnd → schöne Animationen, aber nicht mehr aktiv gepflegt
//
// → Wir nutzen react-dnd mit HTML5Backend
//
// Installation:
//   npm install react-dnd react-dnd-html5-backend
//
// Kernarchitektur:
//   DndProvider  → muss die App umschließen (wie QueryClientProvider)
//   useDrag()    → macht ein Element ziehbar
//   useDrop()    → macht eine Zone zum Ablagebereich
//   Monitor      → gibt Zustand zurück (isDragging, isOver, etc.)
//
// ============================================================

// ── DndProvider einrichten ────────────────────────────────────
// Datei: App.tsx oder ein Layout
//
// "use client";
//
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
//
// export default function App({ children }: { children: React.ReactNode }) {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       {children}
//     </DndProvider>
//   );
// }
//
// Tipp: HTML5Backend nutzt die Browser-native DnD API.
//       Für Touch-Geräte: TouchBackend aus react-dnd-touch-backend.

// ── Item Types definieren ─────────────────────────────────────
// Best Practice: Item-Types in einer eigenen Datei als Konstante
//
// export const ItemTypes = {
//   CHARACTER: "character",
//   CARD: "card",
//   TODO: "todo",
// } as const;
//
// Warum?
//   ✓ Keine Tipp-Fehler (Typo würde TypeScript sofort zeigen)
//   ✓ Eine Wahrheitsquelle für alle Types
//   ✓ Leicht erweiterbar

export const ItemTypes = {
  CHARACTER: "character",
  CARD: "card",
} as const;
