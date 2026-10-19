import type { CSSProperties } from "react";

// Starter Lab 2.4: Kopie nach src/playground/App.tsx
const initialTodos = ["essen", "trinken", "coden"];

const App = () => {
  // TODO Aufgabe 2: Liste und Eingabetext als State anlegen (Startwert der Liste: initialTodos).

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>
      {/* TODO Aufgabe 3: Eingabefeld ergänzen (value, onChange) */}
      {/* TODO Aufgabe 4: Enter fügt den Text oben in die Liste ein und leert das Feld */}
      <ul style={styles.list}>
        {/* TODO Aufgabe 2: Einträge aus der State-Liste rendern (statt initialTodos), mit key */}
        {initialTodos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
      {/* TODO Aufgabe 5: Klick auf einen Eintrag entfernt ihn */}
      {/* TODO Aufgabe 6: Bei leerer Liste "Alles erledigt" anzeigen */}
    </main>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 32,
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#0a52c6",
    color: "white",
  },
  title: { fontSize: 30, margin: 0 },
  list: { listStyle: "none", padding: 0, margin: 0, fontSize: 24 },
} satisfies Record<string, CSSProperties>;

export default App;
