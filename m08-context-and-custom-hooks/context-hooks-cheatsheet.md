# Context- und Hooks-Cheatsheet

Schnellreferenz für Modul 8 (Props durchreichen, Context, eigene Hooks).

## Props durchreichen (Prop Drilling)

| Syntax | Wirkung |
| --- | --- |
| `<Kind isDark={isDark} setDark={setDark} />` | gibt State und Setter als Props an das Kind |
| `type Props = { isDark: boolean; setDark: (isDark: boolean) => void }` | Typ für Wert und Setter |
| `const Zwischen = ({ isDark, setDark, children }: Props) => …` | Durchreicher: liest die Props nicht selbst, gibt sie nur weiter |

## Context anlegen und bereitstellen

| Syntax | Wirkung |
| --- | --- |
| `createContext<ThemeState \| null>(null)` | legt einen Context an; `null` macht fehlende Provider sichtbar |
| `<ThemeContext value={{ isDark, setDark }}>…</ThemeContext>` | stellt den Wert für den Teilbaum bereit (React 19) |
| `<ThemeContext.Provider value={…}>` | ältere Schreibweise, gleiche Wirkung |
| `<ThemeContext.Consumer>{(v) => …}</ThemeContext.Consumer>` | älterer Zugriff per Render-Funktion |
| `static contextType = ThemeContext` / `this.context` | Zugriff in Klassenkomponenten (Altcode) |

## Context lesen

| Syntax | Wirkung |
| --- | --- |
| `useContext(ThemeContext)` | liest den nächsten Provider-Wert oberhalb |
| `use(ThemeContext)` | liest ebenso, darf auch in Bedingungen stehen |
| `const useTheme = () => { const t = useContext(ThemeContext); if (t === null) throw new Error("…"); return t; }` | eigener Hook als Schnittstelle mit Fehlermeldung ohne Provider |
| `const { isDark, setDark } = useTheme();` | Verbrauch in einer Komponente |

## Eigene Hooks

| Syntax | Wirkung |
| --- | --- |
| `export const useTodos = (initial: string[] = []) => { … }` | Funktion mit `use`-Präfix, ruft andere Hooks auf |
| `return { todos, addTodo, removeTodo, removeAll };` | Rückgabe als Objekt mit Namen |
| `const { todos, addTodo } = useTodos();` | Nutzung; jeder Aufruf besitzt eigenen State |
| `setTodos((prev) => [text, ...prev])` | funktionales Update mit dem aktuellen Stand |
| `type Options = { interval?: number }` | Typ für Optionen-Objekt |
| `useCountdown({ interval = 1000 }: Options = {})` | Optionen mit Standardwert |
| `useEffect(() => { … return () => cleanup; }, [dep1, dep2])` | Effekt mit Cleanup; alle gelesenen Werte als Dependencies |
| `const isRunning = isActive && secsLeft > 0;` | abgeleiteter Wert statt zusätzlichem State oder Effekt |

## Regeln der Hooks

| Regel | Wirkung |
| --- | --- |
| Hooks nur auf oberster Ebene aufrufen | nicht in `if`, Schleifen, `try/catch` oder verschachtelten Funktionen |
| Hooks vor einem frühen `return` aufrufen | Aufrufreihenfolge bleibt bei jedem Render gleich |
| Hooks nur in Funktionskomponenten und eigenen Hooks | nicht in Klassen, normalen Funktionen oder Event-Handlern |
| Eigene Hooks beginnen mit `use` | Linter erkennt sie und prüft die Regeln |
| `use(…)` als Ausnahme | darf in Bedingungen und Schleifen stehen |

## Hooks im Überblick

| Hook | Wirkung |
| --- | --- |
| `useState` | lokaler State mit Wert und Setter |
| `useEffect` | Seiteneffekte nach dem Rendern, Cleanup über Rückgabefunktion |
| `useRef` | Wert oder DOM-Element merken ohne Re-Render |
| `useContext` | Context-Wert lesen |
| `useReducer(reducer, initial)` | State mit Aktionen; `dispatch({ type: "…" })` löst `reducer` aus |
| `use(promiseOrContext)` | liest Context oder Promise (Promise mit `<Suspense>`) |
| `useEffectEvent(fn)` | Funktion für Effekte, die immer aktuelle Werte liest und keine Dependency ist |
| `useLayoutEffect` | wie `useEffect`, aber synchron nach DOM-Änderung vor dem Zeichnen (Messen) |
| `useMemo(() => wert, [deps])` | merkt ein Berechnungsergebnis; mit React Compiler meist unnötig |
| `useCallback(fn, [deps])` | merkt eine Funktion; mit React Compiler meist unnötig |
| `memo(Komponente)` | überspringt Re-Render bei gleichen Props; mit React Compiler meist unnötig |
