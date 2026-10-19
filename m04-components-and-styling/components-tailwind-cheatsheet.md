# Komponenten- und Tailwind-Cheatsheet

Schnellreferenz für die in Modul 4 verwendeten Muster.

## Komponenten und Props

| Syntax | Wirkung |
| ------ | ------- |
| `const TodoItem = ({ text }: TodoItemProps) => <div>{text}</div>` | Funktionskomponente mit typisierten Props |
| `export default TodoItem;` | Komponente aus der Datei freigeben |
| `import TodoItem from "./TodoItem";` | Komponente einbinden |
| `<TodoItem text="essen" />` | Komponente verwenden, Prop als Attribut |
| `type Props = { text: string; priority?: number }` | Props-Typ, `?` macht ein Prop optional |
| `({ text, priority = 0 }: Props)` | Standardwert für ein Prop |
| `<UserCard user={user} />` | Objekt als Prop |
| `{todos.map((t) => <TodoItem key={t} text={t} />)}` | Liste von Komponenten, `key` am `map`-Element |
| `<todoItem />` | kleiner Anfangsbuchstabe = HTML-Element, keine Komponente |

## Callback-Props und Datenfluss

| Syntax | Wirkung |
| ------ | ------- |
| `onRemove: (todo: string) => void` | Typ eines Callback-Props |
| `onRemove(text)` | Kind meldet ein Ereignis an das Elternteil |
| `<TodoItem onRemove={handleRemove} />` | Elternteil übergibt seine Handler-Funktion |
| `onXyz` | Namenskonvention für Props, die Funktionen erwarten |
| `handleXyz` | Namenskonvention für Funktionen, die Ereignisse behandeln |
| Props | nur lesbar, kommen vom Elternteil |
| State | gehört der Komponente, Änderung über den Setter |
| `const [isDone, setDone] = useState(false)` | lokaler State im Kind |

## ref als Prop (React 19)

| Syntax | Wirkung |
| ------ | ------- |
| `ref?: Ref<HTMLInputElement>` | `ref` im Props-Typ (`Ref` aus `react`) |
| `({ ref }: Props) => <input ref={ref} />` | `ref` wie ein normales Prop weitergeben |
| `forwardRef(…)` | nur in älterem Code nötig |

## React Developer Tools

| Funktion | Wirkung |
| -------- | ------- |
| Reiter „Components“ | Komponentenbaum der laufenden App |
| Komponente auswählen | Props und Hooks mit aktuellen Werten im rechten Panel |
| Wert im Panel ändern | State oder Props live ändern und Wirkung sehen |
| Suchfeld | Komponente nach Namen suchen |

## Styling-Wege

| Weg | Syntax |
| --- | ------ |
| Inline-Style | `<div style={{ padding: 16, backgroundColor: "red" }}>` |
| CSS Module | `import styles from "./button.module.css";` → `<button className={styles.button}>` |
| CSS-Datei | `import "./styles.css";` → `<button className="btn">` |
| CSS-in-JS (styled-components) | ``const Button = styled.button`padding: 8px;` `` |
| Tailwind | `<button className="rounded bg-blue-600 px-4 py-2 text-white">` |
| Komponentenbibliothek (MUI) | `import Button from "@mui/material/Button";` → `<Button variant="contained">` |

## Tailwind in einem neuen Vite-Projekt

| Schritt | Befehl / Inhalt |
| ------- | --------------- |
| Installieren | `npm install tailwindcss @tailwindcss/vite` |
| Plugin eintragen | `import tailwindcss from "@tailwindcss/vite";` → `plugins: [react(), tailwindcss()]` in `vite.config.ts` |
| CSS-Einstieg | `@import "tailwindcss";` in `src/index.css` |
| CSS laden | `import "./index.css";` in `src/main.tsx` |

## Tailwind: wichtige Klassen

| Klasse | Wirkung |
| ------ | ------- |
| `flex flex-col items-center justify-center` | Flex-Spalte, zentriert |
| `gap-4`, `space-y-2` | Abstand zwischen Kindern |
| `grid grid-cols-3 gap-6` | Raster mit drei Spalten |
| `p-4`, `px-4`, `py-2`, `m-2`, `mt-8` | Innen- und Außenabstand (1 = 0,25 rem) |
| `w-80`, `h-72`, `min-h-screen` | Breite, Höhe, volle Bildschirmhöhe |
| `bg-blue-700`, `text-white`, `border-white` | Hintergrund-, Text-, Rahmenfarbe |
| `bg-white/10` | Farbe mit 10 % Deckkraft |
| `text-2xl`, `font-bold`, `line-through` | Größe, Stärke, Durchstreichen |
| `rounded-lg`, `shadow`, `border-2` | Ecken, Schatten, Rahmen |
| `cursor-pointer`, `select-none` | Mauszeiger, Textauswahl aus |
| `hover:bg-blue-700`, `focus:outline-none`, `disabled:opacity-50` | Stil bei Hover, Fokus, Deaktivierung |
| `transition-colors duration-300` | weicher Farbwechsel |

## Tailwind: Responsive und dynamische Klassen

| Syntax | Wirkung |
| ------ | ------- |
| `sm:` / `md:` / `lg:` / `xl:` / `2xl:` | gilt ab 640 / 768 / 1024 / 1280 / 1536 px |
| `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` | Spaltenzahl wächst mit der Breite |
| ``className={`base ${isDone ? "line-through" : ""}`}`` | Klasse nach State umschalten |
| `{ idle: "bg-gray-500", ready: "bg-green-500" }[status]` | Lookup-Objekt mit vollständigen Klassennamen |
| ``bg-${color}-500`` | funktioniert nicht, Klassenname nicht vollständig im Code |

## Zustandsautomat und Timeout (Lab 4.3)

| Syntax | Wirkung |
| ------ | ------- |
| `type Status = "idle" \| "waiting" \| "ready"` | Union-Typ für die Zustände |
| `Record<Status, string>` | ein Wert pro Zustand (Farbe, Text) |
| `window.setTimeout(fn, ms)` | einmaliger Timer, liefert eine Zahl |
| `window.clearTimeout(id)` | laufenden Timer abbrechen |
| `performance.now()` | Millisekunden-Zeitstempel für Differenzen |
| `1000 + Math.random() * 2000` | zufällige Zeit zwischen 1 und 3 Sekunden |
