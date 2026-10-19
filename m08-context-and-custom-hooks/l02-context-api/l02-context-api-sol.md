# Lab 8.2 – Lösung: Context: Globaler Zustand ohne Prop Drilling

## Aufgabe 1: `ThemeContext`

```ts
// src/playground/theme-context.ts
import { createContext, useContext } from "react";

export type ThemeState = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

export const ThemeContext = createContext<ThemeState | null>(null);
```

`null` als Startwert macht einen fehlenden Provider sichtbar. Ein Dummy-Wert (`{ isDark: false, setDark: () => {} }`) würde den Fehler verschleiern: Der Button täte dann nichts.

## Aufgabe 2: `useTheme()`

```ts
export const useTheme = (): ThemeState => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme muss innerhalb von <ThemeContext value={…}> aufgerufen werden.");
  }
  return theme;
};
```

Die Prüfung steht einmal im Hook; der Rückgabetyp ist nie `null`, Verbraucher brauchen keine eigene Prüfung.

## Aufgabe 3: Provider in `App`

```tsx
import { ThemeContext, useTheme } from "./theme-context";

const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <ThemeContext value={{ isDark, setDark }}>
      <main className="p-8">
        <CardContainer>
          <h1 className="text-3xl font-bold">Theme App</h1>
          <TextSection />
        </CardContainer>
      </main>
    </ThemeContext>
  );
};
```

Der State bleibt in `App`; der Context transportiert ihn nur.

## Aufgabe 4: Verbraucher mit `useTheme()`

```tsx
const CardContainer = ({ children }: { children: ReactNode }) => {
  const { isDark } = useTheme();
  return (
    <div className={`… ${isDark ? "bg-slate-800 text-white" : "bg-slate-300 text-black"}`}>
      <ContentSection>{children}</ContentSection>
    </div>
  );
};

const ThemeToggleButton = () => {
  const { isDark, setDark } = useTheme();
  return (
    <button className="…" onClick={() => setDark(!isDark)}>
      {isDark ? "Licht an" : "Licht aus"}
    </button>
  );
};

const TextSection = () => {
  const { isDark } = useTheme();
  return <p className={isDark ? "text-yellow-300" : "text-blue-800"}>Dieser Text liest isDark aus dem Context.</p>;
};
```

## Aufgabe 5: Durchreicher bereinigen

```tsx
const ContentSection = ({ children }: { children: ReactNode }) => (
  <section className="flex flex-col items-center gap-4 p-8">
    {children}
    <ThemeToggleButton />
  </section>
);
```

Der Typ `ThemeProps` entfällt, weil kein Props-Typ mehr `isDark` oder `setDark` enthält. `ContentSection` weiß nichts mehr vom Theme.

## Aufgabe 6: Fehlerfall

```tsx
const App = () => (
  <>
    <ThemeToggleButton /> {/* außerhalb des Providers */}
    <ThemeContext value={…}>…</ThemeContext>
  </>
);
```

Erwartet: Das Fehler-Overlay zeigt „useTheme muss innerhalb von <ThemeContext value={…}> aufgerufen werden.“

## Alternativen

| Variante | Anmerkung |
| --- | --- |
| `<ThemeContext.Provider value={…}>` | gleichwertig, ältere Schreibweise |
| Eigene Komponente `ThemeProvider` mit `children`, die den State hält | hält `App` schlank; geeignet, sobald mehrere Provider nebeneinander stehen |

## Erweiterung: Theme im `localStorage`

```tsx
const STORAGE_KEY = "theme";

const App = () => {
  // Startwert einmalig aus dem localStorage (Initializer-Funktion)
  const [isDark, setIsDark] = useState(() => localStorage.getItem(STORAGE_KEY) === "dark");

  // Speichern im Handler statt im Effekt
  const setDark = (value: boolean) => {
    setIsDark(value);
    localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
  };

  return <ThemeContext value={{ isDark, setDark }}>…</ThemeContext>;
};
```

Nach einem Neuladen bleibt das gewählte Theme erhalten.

Referenz-App: `src/examples/m08-context-and-custom-hooks/l02-context-api/index.tsx` (Erweiterung: `app-persistent.tsx`)
