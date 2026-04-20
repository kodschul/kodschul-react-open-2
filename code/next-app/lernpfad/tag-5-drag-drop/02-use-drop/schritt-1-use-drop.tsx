"use client";

// ============================================================
// SCHRITT 1 – useDrop: Eine Drop-Zone erstellen
// ============================================================
//
// useDrop() gibt zurück:
//   [{isOver, canDrop}, drop]
//
//   isOver   → true wenn ein Element über der Zone schwebt
//   canDrop  → true wenn das Element hier abgelegt werden kann
//   drop     → ref → ans DOM-Element der Drop-Zone hängen
//
// accept:   Welche Item-Types werden akzeptiert?
// drop:     Was passiert wenn ein Element abgelegt wird?
// canDrop:  Bedingte Logik – darf hier abgelegt werden?
// collect:  Werte aus dem Monitor
//
// ============================================================

import { useDrop } from "react-dnd";
import { ItemTypes } from "../01-use-drag/schritt-1-konzept-und-provider";

type DroppedItem = { id: number; name: string };

type FavoritesZoneProps = {
  onDrop: (item: DroppedItem) => void;
  favorites: DroppedItem[];
};

export function FavoritesZone({ onDrop, favorites }: FavoritesZoneProps) {
  // ── useDrop ────────────────────────────────────────────────
  const [{ isOver, canDrop }, drop] = useDrop({
    // Nur CHARACTER-Items akzeptieren
    accept: ItemTypes.CHARACTER,

    // drop wird aufgerufen wenn ein Item abgelegt wird
    drop: (item: DroppedItem) => {
      onDrop(item);
    },

    // canDrop: Optional – verhindert doppeltes Hinzufügen
    canDrop: (item: DroppedItem) => {
      return !favorites.some((f) => f.id === item.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // ── Visuelles Feedback kombinieren ─────────────────────────
  // isOver && canDrop  → grüner Rahmen (hier ablegen)
  // isOver && !canDrop → roter Rahmen (bereits vorhanden)
  const borderColor = isOver
    ? canDrop
      ? "border-green-400 bg-green-50"
      : "border-red-400 bg-red-50"
    : "border-dashed border-gray-300 bg-gray-50";

  return (
    <div
      ref={drop}
      className={`min-h-[200px] rounded-xl border-2 p-4 transition-colors ${borderColor}`}
    >
      <h3 className="font-bold text-gray-700 mb-3">
        ⭐ Favoriten ({favorites.length})
      </h3>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          Charaktere hierher ziehen
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {favorites.map((fav) => (
            <div key={fav.id} className="bg-white rounded-lg p-2 text-sm shadow-sm">
              {fav.name}
            </div>
          ))}
        </div>
      )}

      {/* Hover-Indikator */}
      {isOver && canDrop && (
        <p className="text-green-500 text-xs text-center mt-2">Hier ablegen!</p>
      )}
      {isOver && !canDrop && (
        <p className="text-red-400 text-xs text-center mt-2">Bereits in Favoriten</p>
      )}
    </div>
  );
}
