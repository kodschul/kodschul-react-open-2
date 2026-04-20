// ============================================================
// SCHRITT 1 – Zustand: Einfacher globaler State
// ============================================================
//
// Zustand ist eine minimalistische State-Management-Bibliothek.
//
// Vergleich mit Redux:
//   Redux:   Store + Slice + Provider + useDispatch + useSelector
//   Zustand: create() → fertig. Kein Provider nötig!
//
// Installation:
//   npm install zustand
//
// Wann Zustand, wann Redux?
//   Zustand:  Kleinere Apps, schneller Einstieg, wenig Boilerplate
//   Redux:    Große Teams, strenge Typisierung, DevTools, Zeit-Reise
//
// ============================================================

import { create } from "zustand";

// ── Variante 1: Counter Store ─────────────────────────────────
type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,

  // set() nimmt entweder ein Objekt oder eine Funktion
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  reset: () => set({ count: 0 }),
}));

// ── Variante 2: Todo Store ────────────────────────────────────
type Todo = { id: number; text: string; done: boolean };

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: (state.todos[state.todos.length - 1]?.id ?? 0) + 1,
          text,
          done: false,
        },
      ],
    })),

  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
}));

// ── Verwendung in Komponenten ─────────────────────────────────
//
// "use client";
//
// export function Counter() {
//   // Nur das subscriben was gebraucht wird → minimale Re-renders
//   const count = useCounterStore((state) => state.count);
//   const { increment, decrement, reset } = useCounterStore();
//
//   return (
//     <div>
//       <button onClick={decrement}>-</button>
//       <span>{count}</span>
//       <button onClick={increment}>+</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }
//
// Wichtig: Kein <Provider> nötig! Direkt in jeder Komponente nutzen.
