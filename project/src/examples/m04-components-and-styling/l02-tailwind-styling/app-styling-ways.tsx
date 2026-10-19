import type { CSSProperties } from "react";
import styles from "./button.module.css";

const inlineButton = {
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
} satisfies CSSProperties;

// Derselbe Button auf drei Wegen. Inline-Styles kennen kein :hover.
const App = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Styling-Wege im Vergleich</h1>
      <button style={inlineButton}>Inline-Style</button>
      <button className={styles.button}>CSS Module</button>
      <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Tailwind
      </button>
    </div>
  );
};

export default App;
