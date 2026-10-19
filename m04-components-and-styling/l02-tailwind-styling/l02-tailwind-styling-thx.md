# Lab 4.2: Styling mit Tailwind CSS

**Leitfragen:**

<details>
<summary>Welche Nachteile haben die Inline-Styles aus den bisherigen Beispielen?</summary>

Kein `:hover`, keine Media Queries, lange Objekte im Code, keine Wiederverwendung über Dateien hinweg und kein gemeinsames Design-System.

</details>

<details>
<summary>Was bedeutet `md:grid-cols-3`?</summary>

Ab der Breakpoint-Breite `md` (48 rem, ca. 768 px) hat das Grid drei Spalten. Darunter gilt die Klasse ohne Präfix oder ein kleineres Präfix.

</details>

<details>
<summary>Wann ist eine eigene CSS-Datei trotzdem sinnvoll?</summary>

Bei Keyframe-Animationen, globalen Basis-Styles, Fremd-Markup ohne eigene Klassen oder wenn ein Team bereits ein CSS-Modul-System pflegt.

</details>

- Tailwind setzt kleine Utility-Klassen (`flex`, `p-4`, `text-white`) direkt in `className`.
- Dynamisches Styling entsteht durch Klassen, die sich nach State oder Props ändern.

## Styling-Wege im Vergleich

Derselbe Button auf vier Wegen (`src/examples/m04-components-and-styling/l02-tailwind-styling/app-styling-ways.tsx`):

```tsx
// 1. Inline-Style: Objekt im style-Attribut
<button style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "white" }}>OK</button>

// 2. CSS Module: Datei button.module.css, Klassennamen werden pro Datei gekapselt
import styles from "./button.module.css";
<button className={styles.button}>OK</button>

// 3. CSS-in-JS (styled-components, nicht im Kurs-Repo installiert)
const Button = styled.button`
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
`;
<Button>OK</Button>

// 4. Tailwind: Utility-Klassen
<button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">OK</button>
```

| Weg | Stärken | Grenzen |
| --- | ------- | ------- |
| Inline-Style | schnell, direkt am Element, Werte aus JS | kein `:hover`, keine Media Queries, nicht wiederverwendbar |
| CSS-Datei / CSS Modules | volles CSS, getrennt vom Markup, Module vermeiden Namenskonflikte | zwischen Datei und Komponente wechseln, Klassen benennen |
| CSS-in-JS (z. B. styled-components) | Styles direkt an der Komponente, dynamisch per Props, gekapselt | zusätzliche Bibliothek, Styles werden zur Laufzeit erzeugt |
| Tailwind | kein Klassen-Benennen, Konsistenz durch feste Skala, Hover und Responsive per Präfix, kleines CSS im Build | lange `className`-Strings, Lernaufwand für Klassennamen |

Der Kurs nutzt bis Lab 4.1 Inline-Styles und ab hier Tailwind als Hauptweg.

## Tailwind in einem neuen Vite-Projekt einrichten

Im Kurs-Repo ist das erledigt (`@tailwindcss/vite` in `vite.config.ts`, `@import "tailwindcss"` in `src/index.css`). In einem neuen Projekt (`npm create vite@latest`) sind es vier Schritte:

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()], // Tailwind als Vite-Plugin
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

```tsx
// src/main.tsx
import "./index.css"; // CSS einmal im Einstiegspunkt importieren
```

- Tailwind 4 braucht keine `tailwind.config.js` und keine PostCSS-Konfiguration für den Einstieg.
- Tailwind durchsucht die Quelldateien nach Klassennamen und erzeugt nur das CSS, das tatsächlich vorkommt.

## Wichtige Klassen

| Aufgabe | Klassen | Wirkung |
| ------- | ------- | ------- |
| Flex-Layout | `flex`, `flex-col`, `items-center`, `justify-center`, `gap-4` | Anordnung, Ausrichtung, Abstand zwischen Kindern |
| Grid | `grid`, `grid-cols-3`, `gap-6` | Raster mit drei Spalten |
| Abstände | `p-4`, `px-4`, `py-2`, `m-2`, `mt-8`, `space-y-2` | Innen- und Außenabstand (1 Einheit = 0,25 rem) |
| Größe | `w-80`, `h-72`, `min-h-screen` | Breite, Höhe, volle Bildschirmhöhe |
| Farben | `bg-blue-700`, `text-white`, `border-white`, `bg-white/10` | Hintergrund, Text, Rahmen, Deckkraft |
| Typografie | `text-2xl`, `font-bold`, `line-through` | Größe, Stärke, Durchstreichen |
| Form | `rounded-lg`, `shadow`, `border-2` | Ecken, Schatten, Rahmen |
| Zustände | `hover:bg-blue-700`, `focus:outline-none`, `disabled:opacity-50` | Stil bei Hover, Fokus, Deaktivierung |
| Übergänge | `transition-colors`, `duration-200` | weicher Wechsel |

## Responsive Präfixe

Tailwind arbeitet „mobile first“: Klassen ohne Präfix gelten immer, Präfixe gelten ab einer Mindestbreite.

| Präfix | Ab Breite | Beispiel |
| ------ | --------- | -------- |
| ohne | immer | `grid-cols-1` |
| `sm:` | 40 rem (640 px) | `sm:grid-cols-2` |
| `md:` | 48 rem (768 px) | `md:grid-cols-3` |
| `lg:` | 64 rem (1024 px) | `lg:grid-cols-4` |
| `xl:` | 80 rem (1280 px) | `xl:grid-cols-5` |
| `2xl:` | 96 rem (1536 px) | `2xl:grid-cols-6` |

`app-responsive-grid.tsx` zeigt ein Grid, das beim Vergrößern des Fensters von einer auf drei Spalten wächst:

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
  {cards.map((card) => (
    <div key={card.id} className="rounded-lg bg-white p-4 shadow hover:scale-105">
      {card.name}
    </div>
  ))}
</div>
```

## Dynamische Klassen nach State

Eine Klasse hängt vom Zustand ab, z. B. das Durchstreichen eines erledigten Todos (`TodoItem.tsx`):

```tsx
<div
  className={`cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-2xl hover:bg-white/20 ${
    isDone ? "line-through opacity-60" : ""
  }`}
  onClick={handleClick}
>
  {text}
</div>
```

Tailwind findet Klassen nur, wenn sie als vollständiger Text im Quellcode stehen:

| Schreibweise | Funktioniert? |
| ------------ | ------------- |
| `isDone ? "line-through" : ""` | ja |
| `` `bg-${color}-500` `` | nein – der Klassenname ist im Code nicht vollständig |
| `{ ok: "bg-green-500", error: "bg-red-500" }[status]` | ja – Lookup-Objekt mit vollständigen Namen |

## Wann eine eigene CSS-Datei sinnvoll bleibt

| Fall | Warum |
| ---- | ----- |
| Keyframe-Animationen (`@keyframes`) | werden in CSS definiert; Tailwind bringt nur wenige fertige mit (`animate-spin`, `animate-pulse`) |
| Globale Basis-Styles (`body`, Schriftart) | stehen einmal in `src/index.css` |
| Fremdbibliotheken mit festem Markup | Klassen lassen sich dort nicht setzen |
| Bestehendes Projekt mit CSS Modules | Konsistenz mit dem Bestand |

## Ausblick: fertige Komponentenbibliotheken

Bibliotheken wie Material UI, React Bootstrap oder Ant Design liefern fertige Komponenten. Per `npm install` ergänzt, importiert und über Props konfiguriert, verhalten sich diese Komponenten wie eigene. Im Kurs-Repo sind sie nicht installiert.

```tsx
import Button from "@mui/material/Button"; // Material UI
<Button variant="contained">Absenden</Button>

import Button from "react-bootstrap/Button"; // React Bootstrap
<Button variant="primary">Absenden</Button>
```

| Ansatz | Passt, wenn |
| ------ | ----------- |
| Tailwind + eigene Komponenten | eigenes Design, volle Kontrolle |
| Komponentenbibliothek | schnell ein fertiges, einheitliches Erscheinungsbild gebraucht wird |

> In älteren Tutorials heißt das Material-UI-Paket `@material-ui/core`; der heutige Name ist `@mui/material`.

> **Merksatz:** Utility-Klassen beschreiben das Aussehen direkt am Element; State schaltet Klassen um, nicht Inline-Werte.

## Fazit

- Inline-Styles genügen für Experimente; ab Hover, Responsive und Wiederverwendung ist Tailwind oder CSS die bessere Wahl.
- Im Vite-Projekt braucht Tailwind 4 nur das Plugin und `@import "tailwindcss"`.
- Dynamische Klassen nach State nutzen vollständige Klassennamen, keine zusammengesetzten.

In der Übung wird die Todo-App von Inline-Styles auf Tailwind umgestellt.
