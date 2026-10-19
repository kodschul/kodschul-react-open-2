import type { CSSProperties } from "react";

// Jede Funktion, die JSX zurückgibt und mit Großbuchstaben beginnt, ist eine Komponente.
const Header = () => <h1 style={styles.title}>Willkommen bei React</h1>;

const Intro = () => <p>Diese Seite besteht aus drei kleinen Komponenten.</p>;

const Footer = () => <small>Quelle: src/examples/m01-react-start/l01-why-react-and-vite-setup</small>;

// App setzt die Seite aus den Bausteinen zusammen (Kette: index.html → main.tsx → App).
const App = () => {
  return (
    <main style={styles.page}>
      <Header />
      <Intro />
      <Footer />
    </main>
  );
};

const styles = {
  page: {
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
} satisfies Record<string, CSSProperties>;

export default App;
