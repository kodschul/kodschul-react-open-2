import type { CSSProperties } from "react";

// Starter Lab 1.3: Kopie nach src/playground/App.tsx

// TODO Aufgabe 5: Typ "Character" mit id, name, status, species und image definieren.

// TODO Aufgabe 6: Ein Objekt "rick" dieses Typs anlegen.

const App = () => {
  // TODO Aufgabe 2: Konstante "startValue" mit dem Wert 100 anlegen.

  return (
    <main style={styles.container}>
      <h1>Counter App</h1>
      {/* TODO Aufgabe 2-4: Zahl (mit style) und die Buttons "+" und "–" ergänzen, ohne Logik */}
      {/* TODO Aufgabe 6: Namen und Status von "rick" anzeigen */}
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
    backgroundColor: "darkblue",
    color: "white",
  },
} satisfies Record<string, CSSProperties>;

export default App;
