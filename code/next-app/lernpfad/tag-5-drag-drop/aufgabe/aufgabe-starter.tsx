"use client";

// ============================================================
// TAG 5 – TRANSFER AUFGABE: Characters Favoriten + Kanban
// ============================================================
//
// Ziel: Die bestehende CharactersPage um Drag & Drop erweitern.
//       Charaktere sollen in eine "Favoriten"-Zone gezogen werden können.
//
// Was bereits vorhanden ist:
//   ✓ app/characters/CharactersPage.tsx (mit React Query)
//   ✓ app/api/characters/route.ts
//
// Installation (falls noch nicht vorhanden):
//   npm install react-dnd react-dnd-html5-backend
//
// ── AUFGABE 1: CharactersPage mit DndProvider umhüllen ───────
//
//   Öffnet: app/characters/CharactersPage.tsx
//
//   Importiert DndProvider und HTML5Backend:
//     import { DndProvider } from "react-dnd";
//     import { HTML5Backend } from "react-dnd-html5-backend";
//
//   Wickelt das return-Statement in <DndProvider backend={HTML5Backend}>:
//     return (
//       <DndProvider backend={HTML5Backend}>
//         ...bestehender Code...
//       </DndProvider>
//     );
//
// ── AUFGABE 2: Charakter-Karte draggable machen ──────────────
//
//   Die Charakter-Karte (das <Link>-Element) soll ziehbar sein.
//   Fügt useDrag hinzu mit:
//     type: "CHARACTER"
//     item: { id: character.id, name: character.name, image: character.image }
//     collect: isDragging → opacity
//
// ── AUFGABE 3: Favoriten-Box als Drop-Zone ───────────────────
//
//   Fügt unterhalb der Charakter-Liste eine Favoriten-Box hinzu.
//   Nutzt useDrop mit:
//     accept: "CHARACTER"
//     drop: Charakter in favorites-State hinzufügen
//     canDrop: verhindert Duplikate
//     collect: isOver → visuelles Feedback
//
// ── AUFGABE 4 (Bonus): Kanban mit Redux ─────────────────────
//
//   Erstellt einen kanbanSlice.ts mit:
//     - Karten: { id, title, column: "todo" | "inProgress" | "done" }
//     - Action: moveCard(id: number, toColumn: Column)
//     - Jede Bewegung erscheint im Redux DevTools
//
//   Baut das vollständige Kanban-Board das den Redux-Store nutzt
//   (statt lokalem useState wie im Beispiel).
//
// ============================================================
// Starter-Struktur: Favoriten-Box
// ============================================================

import { useState } from "react";
import { useDrop } from "react-dnd";

type FavoriteCharacter = { id: number; name: string; image: string };

// TODO: In CharactersPage.tsx integrieren
export function FavoritesBox() {
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>([]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CHARACTER",
    drop: (item: FavoriteCharacter) => {
      // TODO: favorites-State updaten (Duplikate vermeiden)
    },
    canDrop: (item: FavoriteCharacter) => {
      // TODO: true zurückgeben wenn item noch nicht in favorites
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`border-2 rounded-xl p-4 min-h-[100px] transition-colors ${
        isOver && canDrop
          ? "border-green-400 bg-green-50"
          : isOver
          ? "border-red-400 bg-red-50"
          : "border-dashed border-gray-300 bg-gray-50"
      }`}
    >
      <h3 className="font-bold mb-2">⭐ Favoriten ({favorites.length})</h3>
      {favorites.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          Charaktere hierher ziehen
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {favorites.map((fav) => (
            <span
              key={fav.id}
              className="bg-white rounded-full px-3 py-1 text-sm shadow-sm"
            >
              {fav.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AufgabeTag5() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tag 5 – Transfer Aufgabe</h1>
      <p className="text-gray-600">
        Schaut in diese Datei für die Aufgabenbeschreibung (Kommentare oben).
      </p>
    </div>
  );
}
