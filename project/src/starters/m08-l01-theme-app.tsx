import type { ReactNode } from "react";

// Starter für Lab 8.1: Die Seite ist fertig gestaltet, aber noch ohne Theme.
// Aufgabe: isDark als State in App anlegen und per Props bis zum Button durchreichen.

type CardContainerProps = {
  children: ReactNode;
};

const CardContainer = ({ children }: CardContainerProps) => {
  // TODO: Farben abhängig von isDark setzen
  return (
    <div className="mx-auto max-w-xl rounded-lg border-2 border-red-500 bg-slate-300 text-black">
      <ContentSection>{children}</ContentSection>
    </div>
  );
};

type ContentSectionProps = {
  children: ReactNode;
};

const ContentSection = ({ children }: ContentSectionProps) => {
  return (
    <section className="flex flex-col items-center gap-4 p-8">
      {children}
      <ThemeToggleButton />
    </section>
  );
};

const ThemeToggleButton = () => {
  // TODO: Klick soll das Theme umschalten, Text je nach Theme anpassen
  return <button className="rounded border-2 border-current px-4 py-2 hover:opacity-70">Licht aus</button>;
};

const TextSection = () => {
  // TODO: Textfarbe abhängig von isDark setzen
  return <p className="text-blue-800">Dieser Text soll das Theme kennen.</p>;
};

const App = () => {
  // TODO: const [isDark, setDark] = useState(false);
  return (
    <main className="p-8">
      <CardContainer>
        <h1 className="text-3xl font-bold">Theme App</h1>
        <TextSection />
      </CardContainer>
    </main>
  );
};

export default App;
