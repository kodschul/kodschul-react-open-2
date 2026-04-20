"use client";

// ============================================================
// SCHRITT 1 – Kanban-Board: State-Struktur & Spalten
// ============================================================
//
// Ein Kanban-Board hat:
//   - Karten (Cards): die beweglichen Elemente
//   - Spalten (Columns): die Drop-Zonen
//
// State-Design:
//   Jede Karte kennt ihre Spalte → einfaches Verschieben
//
// Spalten: "todo" | "inProgress" | "done"
//
// ============================================================

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ── Typen ─────────────────────────────────────────────────────
type Column = "todo" | "inProgress" | "done";

type Card = {
  id: number;
  title: string;
  column: Column;
};

const ITEM_TYPE = "CARD";

// ── Spalten-Konfiguration ─────────────────────────────────────
const COLUMNS: { id: Column; label: string; color: string }[] = [
  { id: "todo", label: "📋 To Do", color: "bg-gray-100" },
  { id: "inProgress", label: "🔄 In Progress", color: "bg-blue-50" },
  { id: "done", label: "✅ Done", color: "bg-green-50" },
];

// ── KanbanCard: Ziehbare Karte ────────────────────────────────
function KanbanCard({ card }: { card: Card }) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: card.id, fromColumn: card.column },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="bg-white rounded-lg shadow-sm p-3 mb-2 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow select-none"
    >
      <p className="text-sm font-medium text-gray-800">{card.title}</p>
      <p className="text-xs text-gray-400 mt-1">#{card.id}</p>
    </div>
  );
}

// ── KanbanColumn: Drop-Zone für eine Spalte ───────────────────
type KanbanColumnProps = {
  column: typeof COLUMNS[number];
  cards: Card[];
  onDrop: (cardId: number, toColumn: Column) => void;
};

function KanbanColumn({ column, cards, onDrop }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: number; fromColumn: Column }) => {
      // Nur verschieben wenn Spalte sich ändert
      if (item.fromColumn !== column.id) {
        onDrop(item.id, column.id);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div
      ref={drop}
      className={`flex-1 rounded-xl p-4 min-h-[400px] transition-colors ${
        column.color
      } ${isOver ? "ring-2 ring-blue-400" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-700">{column.label}</h3>
        <span className="bg-white rounded-full px-2 py-0.5 text-xs font-medium text-gray-500 shadow-sm">
          {cards.length}
        </span>
      </div>

      {cards.map((card) => (
        <KanbanCard key={card.id} card={card} />
      ))}

      {isOver && (
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center text-blue-400 text-sm">
          Hier ablegen
        </div>
      )}
    </div>
  );
}

// ── Kanban Board: Haupt-Komponente ────────────────────────────
const initialCards: Card[] = [
  { id: 1, title: "React DnD installieren", column: "done" },
  { id: 2, title: "useDrag verstehen", column: "done" },
  { id: 3, title: "useDrop implementieren", column: "inProgress" },
  { id: 4, title: "Kanban Board bauen", column: "inProgress" },
  { id: 5, title: "Redux Integration", column: "todo" },
  { id: 6, title: "Tests schreiben", column: "todo" },
];

export function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  function moveCard(cardId: number, toColumn: Column) {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, column: toColumn } : c))
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Kanban Board
        </h1>
        <div className="flex gap-4 max-w-5xl mx-auto">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={cards.filter((c) => c.column === column.id)}
              onDrop={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default function KanbanPage() {
  return <KanbanBoard />;
}
