# Lab 8.1 – Lösung: Theme-App: Props durchreichen

## Aufgabe 1: State in `App`

```tsx
const App = () => {
  const [isDark, setDark] = useState(false);
  // …
};
```

Der State liegt in `App`, weil alle Verbraucher darunter hängen.

## Aufgabe 2: `isDark` für `CardContainer` und `TextSection`

```tsx
type CardContainerProps = ThemeProps & { children: ReactNode };

const TextSection = ({ isDark }: { isDark: boolean }) => { /* … */ };

<TextSection isDark={isDark} />
```

## Aufgabe 3: `setDark` für `CardContainer`

```tsx
type ThemeProps = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

<CardContainer isDark={isDark} setDark={setDark}>…</CardContainer>
```

`CardContainer` nutzt `setDark` selbst nicht, braucht es aber, um den Button weiter unten zu versorgen.

## Aufgabe 4: Durchreichen bis zum Button

```tsx
<ContentSection isDark={isDark} setDark={setDark}>{children}</ContentSection>   // in CardContainer
<ThemeToggleButton isDark={isDark} setDark={setDark} />                         // in ContentSection
```

## Aufgabe 5: Farben abhängig von `isDark`

```tsx
<div className={`… ${isDark ? "bg-slate-800 text-white" : "bg-slate-300 text-black"}`}>
<p className={isDark ? "text-yellow-300" : "text-blue-800"}>…</p>
```

Andere Tailwind-Farben sind gleichwertig, solange der Kontrast stimmt.

## Aufgabe 6: Button verdrahten

```tsx
const ThemeToggleButton = ({ isDark, setDark }: ThemeProps) => (
  <button
    className="rounded border-2 border-current px-4 py-2 hover:opacity-70"
    onClick={() => setDark(!isDark)}
  >
    {isDark ? "Licht an" : "Licht aus"}
  </button>
);
```

Gesamte Datei nach den Aufgaben 1–6:

```tsx
import { useState, type ReactNode } from "react";

type ThemeProps = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

type CardContainerProps = ThemeProps & { children: ReactNode };

const CardContainer = ({ isDark, setDark, children }: CardContainerProps) => (
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

const ContentSection = ({ isDark, setDark, children }: CardContainerProps) => (
  <section className="flex flex-col items-center gap-4 p-8">
    {children}
    <ThemeToggleButton isDark={isDark} setDark={setDark} />
  </section>
);

const ThemeToggleButton = ({ isDark, setDark }: ThemeProps) => (
  <button
    className="rounded border-2 border-current px-4 py-2 hover:opacity-70"
    onClick={() => setDark(!isDark)}
  >
    {isDark ? "Licht an" : "Licht aus"}
  </button>
);

const TextSection = ({ isDark }: Pick<ThemeProps, "isDark">) => (
  <p className={isDark ? "text-yellow-300" : "text-blue-800"}>Dieser Text liest isDark als Prop.</p>
);

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
```

## Aufgabe 7: Durchreicher

```tsx
// Durchreicher: ContentSection (reicht isDark und setDark nur weiter),
// CardContainer (nutzt isDark, reicht setDark nur weiter)
```

| Komponente | Urteil |
| --- | --- |
| `ContentSection` | reiner Durchreicher |
| `CardContainer` | teilweise (nur `setDark`) |
| `ThemeToggleButton`, `TextSection` | Verbraucher |

Zwei von vier Komponenten in der Kette tragen Props, die sie selbst nicht brauchen.

Referenz-App: `src/examples/m08-context-and-custom-hooks/l01-prop-drilling/index.tsx`
