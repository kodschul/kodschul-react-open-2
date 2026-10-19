import type { CSSProperties } from "react";

// Starter Lab 2.3: Kopie nach src/playground/App.tsx
const App = () => {
  // TODO Aufgabe 2: State "inputValue" mit leerem Text als Startwert anlegen.

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Input App</h1>
      {/* TODO Aufgabe 3-4: Eingabefeld mit value und onChange ergänzen */}
      {/* TODO Aufgabe 5: Text "Eingegebener Text: …" unter dem Feld anzeigen */}
      {/* TODO Aufgabe 6: Button "Clear" ergänzen, der das Feld leert */}
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
  title: { fontSize: 30, margin: 0 },
} satisfies Record<string, CSSProperties>;

export default App;
