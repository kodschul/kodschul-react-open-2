# Lab 8.2: Context: Globaler Zustand ohne Prop Drilling

**Leitfragen:**

<details>
<summary>Welche Props fallen weg?</summary>

`isDark` und `setDark` an `CardContainer`, `ContentSection`, `ThemeToggleButton` und `TextSection`. Übrig bleiben nur die `children`.

</details>

<details>
<summary>Was passiert, wenn eine Komponente außerhalb des Providers `useTheme()` aufruft?</summary>

Mit dem Startwert `null` und der Prüfung im Hook entsteht ein klarer Fehler. Ohne Prüfung liefert `useContext` stillschweigend den Startwert von `createContext`.

</details>

<details>
<summary>Würde man die Charakterliste in einen Context legen?</summary>

Nein. Die Liste ist Server-State und gehört in TanStack Query (Lab 6.1). Context passt zu wenigen, selten wechselnden Werten.

</details>

- Context stellt einen Wert für einen ganzen Teilbaum bereit, ohne ihn durch jede Ebene zu reichen.
- Ein eigener Hook `useTheme()` kapselt `useContext` und ist die einzige Schnittstelle für Komponenten.

## Lokaler und globaler Zustand

| | Lokaler Zustand | Globaler Zustand |
| --- | --- | --- |
| Besitzer | eine Komponente | der ganze Baum (oder ein Teilbaum) |
| Werkzeug | `useState` | Context, Zustandsbibliotheken |
| Beispiel | Eingabefeld, Counter | Theme, Login, Sprache |

Context deckt kleine globale Werte ab. Zustandsbibliotheken wie Redux bieten für große Apps zusätzlich zentrale Verwaltung, Entwicklerwerkzeuge und gezielte Updates; sie sind nicht Teil des Kurses.

## Context in drei Schritten

Referenz-App: `src/examples/m08-context-and-custom-hooks/l02-context-api/` (`index.tsx` und Dateien daneben).

```ts
// theme-context.ts
import { createContext, useContext } from "react";

export type ThemeState = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

// 1. Context anlegen. null als Startwert: Ohne Provider soll ein Fehler auffallen.
export const ThemeContext = createContext<ThemeState | null>(null);

// 3. Verbrauchen über einen eigenen Hook: Komponenten kennen weder useContext noch die null-Prüfung.
export const useTheme = (): ThemeState => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme muss innerhalb von <ThemeContext value={…}> aufgerufen werden.");
  }
  return theme;
};
```

```tsx
// index.tsx – 2. Wert bereitstellen. React 19: Der Context ist selbst der Provider.
const App = () => {
  const [isDark, setDark] = useState(false);
  return (
    <ThemeContext value={{ isDark, setDark }}>
      <CardContainer>
        <h1>Theme App</h1>
        <TextSection />
      </CardContainer>
    </ThemeContext>
  );
};
```

```tsx
// ThemeToggleButton.tsx – keine Props mehr, der Button holt sich den Wert direkt.
const ThemeToggleButton = () => {
  const { isDark, setDark } = useTheme();
  return <button onClick={() => setDark(!isDark)}>{isDark ? "Licht an" : "Licht aus"}</button>;
};
```

## Schreibweisen im Vergleich

| Schreibweise | Stand | Vorkommen |
| --- | --- | --- |
| `<ThemeContext value={…}>` | React 19, aktuell | neuer Code |
| `<ThemeContext.Provider value={…}>` | ältere Schreibweise, funktioniert weiter | Tutorials und Altprojekte |
| `useContext(ThemeContext)` | aktuell, hinter `useTheme()` verborgen | Verbraucher |
| `<ThemeContext.Consumer>{(v) => …}</ThemeContext.Consumer>` | älter, mehr Verschachtelung | Altcode; `useContext` ersetzt es |
| `static contextType` / `this.context` | Klassenkomponenten | Altcode |

## Vorher und nachher

| | Prop Drilling (Lab 8.1) | Context (Lab 8.2) |
| --- | --- | --- |
| Props an `CardContainer` | `isDark`, `setDark` | keine |
| Props an `ContentSection` | `isDark`, `setDark` | keine |
| Props an `ThemeToggleButton` | `isDark`, `setDark` | keine |
| Zugriff im Verbraucher | Parameter | `useTheme()` |
| Neuer Verbraucher tief im Baum | Kette anpassen | `useTheme()` aufrufen |

## Wann Context passt

| Passt | Passt nicht |
| --- | --- |
| Theme, Sprache | Daten, die sich häufig ändern (jede Änderung rendert alle Verbraucher neu) |
| angemeldete Person | Server-Daten wie die Charakterliste (TanStack Query, Lab 6.1) |
| Einstellungen, die viele Komponenten lesen | Zustand, den nur eine Komponente oder ihre Kinder brauchen (`useState`) |

- Mehrere Contexts (z. B. Theme und Benutzer) lassen sich ineinander schachteln; jeder Verbraucher liest, was er braucht.
- Der Startwert von `createContext` gilt nur ohne Provider; ein Provider überschreibt ihn.

> **Merksatz:** Context ist ein Kanal für Werte, kein Ersatz für State; den State besitzt weiterhin eine Komponente (hier `App`).

## Fazit

- `createContext`, `<Context value>` und `useContext` ersetzen die Prop-Kette.
- `useTheme()` kapselt den Zugriff und meldet einen fehlenden Provider verständlich.
- Context eignet sich für wenige, selten wechselnde, breit genutzte Werte.

In der Übung wird die Theme-App aus Lab 8.1 auf Context umgebaut.
