import type { CSSProperties } from "react";

// Typ für Tag 2 vorab: beschreibt, wie ein Charakter der Rick-and-Morty-API aussieht.
type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
};

const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

// Statisches Layout: noch keine Logik, die Buttons tun nichts.
const App = () => {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Counter App</h1>
      <div style={styles.value}>100</div>
      <div style={styles.row}>
        <button style={styles.button}>+</button>
        <button style={styles.button}>–</button>
      </div>
      <p>
        Beispiel-Charakter: {rick.name} ({rick.status})
      </p>
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
  title: { fontSize: 40, margin: 0 },
  value: { fontSize: 40, fontWeight: "bold" },
  row: { display: "flex", gap: 12 },
  button: { padding: "12px 24px", fontSize: 24, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

export default App;
