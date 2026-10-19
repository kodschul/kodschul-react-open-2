import { useEffect, useRef, type CSSProperties, type Ref } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0a52c6",
    color: "white",
    paddingTop: 50,
    gap: 12,
  },
  input: { fontSize: 24, padding: 8 },
} satisfies Record<string, CSSProperties>;

type FancyInputProps = {
  placeholder: string;
  ref?: Ref<HTMLInputElement>;
};

// Seit React 19 ist ref ein normales Prop: kein forwardRef mehr nötig
const FancyInput = ({ placeholder, ref }: FancyInputProps) => {
  return <input ref={ref} style={styles.input} placeholder={placeholder} />;
};

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ fontSize: 30, fontWeight: "bold" }}>ref als Prop</div>
      <FancyInput ref={inputRef} placeholder="Fokus kommt vom Elternteil" />
    </div>
  );
};

export default App;
