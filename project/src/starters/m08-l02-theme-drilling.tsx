import { useState, type ReactNode } from "react";

// Starter für Lab 8.2: Theme-App mit Prop Drilling (Ergebnis von Lab 8.1).
// Aufgabe: auf Context umbauen, sodass keine Theme-Props mehr nötig sind.

type ThemeProps = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

type CardContainerProps = ThemeProps & {
  children: ReactNode;
};

const CardContainer = ({ isDark, setDark, children }: CardContainerProps) => {
  return (
    <div
      className={`mx-auto max-w-xl rounded-lg border-2 border-red-500 ${
        isDark ? "bg-slate-800 text-white" : "bg-slate-300 text-black"
      }`}
    >
      <ContentSection isDark={isDark} setDark={setDark}>
        {children}
      </ContentSection>
    </div>
  );
};

const ContentSection = ({ isDark, setDark, children }: CardContainerProps) => {
  return (
    <section className="flex flex-col items-center gap-4 p-8">
      {children}
      <ThemeToggleButton isDark={isDark} setDark={setDark} />
    </section>
  );
};

const ThemeToggleButton = ({ isDark, setDark }: ThemeProps) => {
  return (
    <button
      className="rounded border-2 border-current px-4 py-2 hover:opacity-70"
      onClick={() => setDark(!isDark)}
    >
      {isDark ? "Licht an" : "Licht aus"}
    </button>
  );
};

const TextSection = ({ isDark }: Pick<ThemeProps, "isDark">) => {
  return <p className={isDark ? "text-yellow-300" : "text-blue-800"}>Dieser Text liest isDark als Prop.</p>;
};

const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <main className="p-8">
      <CardContainer isDark={isDark} setDark={setDark}>
        <h1 className="text-3xl font-bold">Theme App</h1>
        <TextSection isDark={isDark} />
      </CardContainer>
    </main>
  );
};

export default App;
