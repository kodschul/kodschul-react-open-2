import type { CSSProperties } from "react";

const user = {
  name: "Anna",
  avatar: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};
const profileUrl = "https://react.dev";
const unsafeText = "<script>alert('XSS')</script>"; // wird als Text angezeigt, nie ausgeführt
const isHighlighted = true;

// Ein Wurzelelement oder ein Fragment <>…</> umschließt alle Geschwister.
const App = () => (
  <>
    <header style={styles.header}>
      <h1>Hallo, {user.name}!</h1>
      <img src={user.avatar} alt={`Avatar von ${user.name}`} width={80} height={80} />
    </header>
    <main style={styles.main}>
      <p>2 + 3 = {2 + 3}</p>
      <p>
        Link:{" "}
        <a href={profileUrl} style={{ color: "white" }}>
          react.dev
        </a>
      </p>
      {/* className ersetzt das HTML-Attribut class; die Klasse "note" hat hier keine CSS-Regel. */}
      <p className="note">Dieser Absatz trägt die CSS-Klasse „note“.</p>
      <p style={{ color: isHighlighted ? "yellow" : "white", fontWeight: "bold" }}>style erwartet ein Objekt.</p>
      <p>Eingebetteter Text: {unsafeText}</p>
    </main>
  </>
);

const styles = {
  header: { padding: 16, backgroundColor: "navy", color: "white" },
  main: { padding: 16, backgroundColor: "darkblue", color: "white", minHeight: "60vh" },
} satisfies Record<string, CSSProperties>;

export default App;
