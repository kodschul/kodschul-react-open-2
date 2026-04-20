"use client";

// ============================================================
// SCHRITT 2 – useDrag: Ein Element ziehbar machen
// ============================================================
//
// useDrag() gibt zurück:
//   [{isDragging}, drag, dragPreview]
//
//   isDragging   → true während das Element gezogen wird
//   drag         → ref → ans ziehbare DOM-Element hängen
//   dragPreview  → ref → optionales Vorschaubild-Element
//
// item:   Was wird gezogen? Welche Daten kommen mit?
// type:   Welcher "Typ" ist dieses Element?
//         (Drop-Zones können nach Typ filtern)
// collect: Funktion die aus dem Monitor relevante Werte ausliest
//
// ============================================================

import { useDrag } from "react-dnd";
import { ItemTypes } from "./schritt-1-konzept-und-provider";

type Character = {
  id: number;
  name: string;
  status: string;
  image: string;
};

type CharacterCardDraggableProps = {
  character: Character;
};

export function CharacterCardDraggable({
  character,
}: CharacterCardDraggableProps) {
  // ── useDrag ────────────────────────────────────────────────
  const [{ isDragging }, drag] = useDrag({
    // type: welcher Item-Type ist das? Drop-Zones reagieren darauf
    type: ItemTypes.CHARACTER,

    // item: Daten die beim Drop verfügbar sind
    item: { id: character.id, name: character.name },

    // collect: Werte aus dem Monitor "sammeln"
    // monitor gibt Zustand während des Drags zurück
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    // drag-ref ans äußere DOM-Element hängen
    <div
      ref={drag}
      style={{
        // isDragging → visuelle Rückmeldung: Element wird "transparent"
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
      }}
      className="bg-white rounded-xl shadow overflow-hidden select-none hover:shadow-md transition-shadow"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full aspect-square object-cover pointer-events-none"
      />
      <div className="p-3">
        <p className="font-semibold text-sm">{character.name}</p>
        <p className="text-xs text-gray-500">{character.status}</p>
        {/* Visueller Hinweis für Drag */}
        <p className="text-xs text-blue-400 mt-1">↕ Ziehen</p>
      </div>
    </div>
  );
}

// ============================================================
// Eigenes Drag-Vorschaubild (DragPreviewImage)
// ============================================================
//
// Der Browser zeigt standardmäßig einen Screenshot des Elements.
// Mit dragPreview kann ein eigenes Bild genutzt werden:
//
// import { DragPreviewImage, useDrag } from "react-dnd";
//
// const [{ isDragging }, drag, dragPreview] = useDrag({ ... });
//
// return (
//   <>
//     {/* Vorschaubild – wird beim Drag angezeigt */}
//     <DragPreviewImage connect={dragPreview} src={character.image} />
//     <div ref={drag}>...</div>
//   </>
// );
