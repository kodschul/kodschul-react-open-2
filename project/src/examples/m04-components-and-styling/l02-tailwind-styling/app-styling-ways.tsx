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
  let isTrue = true;
  return (
    <div className=" flex-1 flex min-h-screen min-w-screen bg-indigo-400 items-center justify-center  ">
      <div
        className={
          isTrue ? "text-white md:text-[#aef] text-2xl font-thin  " : ""
        }
      >
        Hi there!
      </div>

      <div
        className={`text-white md:text-[#aef] text-2xl font-thin ${
          isTrue ? " bg-red-200 " : "bg-yellow-200"
        }  `}
      >
        Hi there!
      </div>
    </div>
  );
};

export default App;
