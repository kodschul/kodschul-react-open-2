"use client";

// ============================================================
// TAG 5 – DEMO: Favoriten-System mit Drag & Drop
// ============================================================
//
// Diese Demo zeigt useDrag + useDrop live in Aktion:
//   - Charakterkarten sind ziehbar (useDrag)
//   - Favoriten-Box ist eine Drop-Zone (useDrop)
//   - canDrop verhindert Duplikate
//   - isOver zeigt visuelles Feedback
//
// Route: /lernpfad/tag-5/demo
// ============================================================

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "CHARACTER";

type Character = { id: number; name: string; status: string; image: string };

// Statische Demo-Daten (kein API-Aufruf nötig für die Demo)
const DEMO_CHARACTERS: Character[] = [
  { id: 1, name: "Rick Sanchez", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg" },
  { id: 2, name: "Morty Smith", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg" },
  { id: 3, name: "Summer Smith", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg" },
  { id: 4, name: "Beth Smith", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg" },
  { id: 5, name: "Jerry Smith", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg" },
  { id: 6, name: "Abadango Cluster", status: "Alive", image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg" },
];

// ── Draggable Character Card ──────────────────────────────────
function DraggableCharacter({ character }: { character: Character }) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: character,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      className="bg-white rounded-xl overflow-hidden shadow cursor-grab active:cursor-grabbing hover:shadow-lg transition-all hover:-translate-y-1 select-none"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full aspect-square object-cover pointer-events-none"
      />
      <div className="p-2 text-center">
        <p className="font-semibold text-xs">{character.name}</p>
        {isDragging && <p className="text-blue-400 text-xs">Ziehe mich…</p>}
      </div>
    </div>
  );
}

// ── Favorites Drop Zone ───────────────────────────────────────
function FavoritesZone({
  favorites,
  onDrop,
  onRemove,
}: {
  favorites: Character[];
  onDrop: (c: Character) => void;
  onRemove: (id: number) => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: Character) => onDrop(item),
    canDrop: (item: Character) => !favorites.some((f) => f.id === item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const highlight = isOver && canDrop
    ? "border-green-400 bg-green-50 scale-[1.01]"
    : isOver && !canDrop
    ? "border-red-400 bg-red-50"
    : "border-dashed border-gray-300";

  return (
    <div
      ref={drop}
      className={`border-2 rounded-2xl p-4 transition-all min-h-[180px] ${highlight}`}
    >
      <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span>⭐ Favoriten</span>
        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
          {favorites.length}
        </span>
      </h3>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          Charaktere hierher ziehen
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm text-sm"
            >
              <img src={fav.image} alt={fav.name} className="w-5 h-5 rounded-full" />
              <span>{fav.name}</span>
              <button
                onClick={() => onRemove(fav.id)}
                className="text-gray-400 hover:text-red-500 ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {isOver && (
        <p className={`text-xs text-center mt-2 ${canDrop ? "text-green-500" : "text-red-400"}`}>
          {canDrop ? "Hier ablegen!" : "Bereits in Favoriten"}
        </p>
      )}
    </div>
  );
}

// ── Demo Page ─────────────────────────────────────────────────
export default function Tag5Demo() {
  const [favorites, setFavorites] = useState<Character[]>([]);

  function addFavorite(character: Character) {
    if (!favorites.some((f) => f.id === character.id)) {
      setFavorites((prev) => [...prev, character]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tag 5 – Drag & Drop Demo
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Charaktere in die Favoriten-Box ziehen
          </p>

          {/* Favoriten Drop-Zone */}
          <div className="mb-8">
            <FavoritesZone
              favorites={favorites}
              onDrop={addFavorite}
              onRemove={removeFavorite}
            />
          </div>

          {/* Charakter-Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {DEMO_CHARACTERS.map((character) => (
              <DraggableCharacter key={character.id} character={character} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
