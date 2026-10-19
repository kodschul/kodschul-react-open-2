# Effects- und Refs-Cheatsheet

Schnellreferenz für die in Modul 3 verwendeten Hooks und Muster.

## useEffect

| Syntax | Wirkung |
| ------ | ------- |
| `useEffect(() => { … }, [])` | läuft einmal nach dem ersten Render |
| `useEffect(() => { … }, [count])` | läuft nach dem ersten Render und bei jeder Änderung von `count` |
| `useEffect(() => { … })` | läuft nach jedem Render |
| `useEffect(() => { …; return () => { … }; }, [dep])` | Cleanup läuft vor dem nächsten Effektlauf und beim Unmount |
| `if (!isRunning) return;` | Effekt bei Bedingung früh beenden, kein Cleanup nötig |
| `react-hooks/exhaustive-deps` | Linter meldet fehlende Einträge im Dependency-Array |
| `react-hooks/set-state-in-effect` | Linter meldet synchrones `setState` im Effekt-Körper |

## Effekt oder nicht?

| Situation | Lösung |
| --------- | ------ |
| Wert aus State/Props berechenbar | Variable im Render: `const isEven = count % 2 === 0` |
| Reaktion auf Klick oder Eingabe | Event-Handler |
| Seitentitel setzen (React 19) | ``<title>{`Counter: ${count}`}</title>`` im JSX |
| Seitentitel in älterem Code | `useEffect(() => { document.title = … }, [count])` |
| Timer, Abo, Netzwerk, Fokus | Effekt mit Cleanup |

## StrictMode

| Verhalten | Wirkung |
| --------- | ------- |
| Effekt läuft in der Entwicklung zweimal | Mount → Cleanup → Mount; nur Entwicklung |
| Komponente rendert in der Entwicklung doppelt | Render muss ein reines Ergebnis aus State und Props liefern |

## Timer

| Syntax | Wirkung |
| ------ | ------- |
| `const id = window.setInterval(fn, 1000)` | ruft `fn` jede Sekunde auf, `id` ist eine Zahl |
| `window.clearInterval(id)` | beendet das Intervall |
| `const id = window.setTimeout(fn, 2000)` | ruft `fn` einmal nach 2 Sekunden auf |
| `window.clearTimeout(id)` | bricht den Timeout ab |
| `return () => window.clearInterval(id);` | Cleanup im Effekt |
| `useRef<number \| undefined>(undefined)` | Typ für eine gespeicherte Timer-ID |

## State im Intervall

| Syntax | Wirkung |
| ------ | ------- |
| `setSecs(secs - 1)` | verwendet den Wert aus dem Render der Closure (Stale Closure) |
| `setSecs(prev => prev - 1)` | funktionales Update, bekommt immer den aktuellen Wert |
| `const isTicking = isRunning && secs > 0` | abgeleiteter Wert statt Zusatz-State und Zusatz-Effekt |
| `useState(() => new Date())` | Startwert wird nur beim ersten Render berechnet |
| `e.target.valueAsNumber` | Zahlenwert eines `<input type="number">` |

## useRef

| Syntax | Wirkung |
| ------ | ------- |
| `const ref = useRef(0)` | Ref mit Startwert, `ref.current` ist `0` |
| `const inputRef = useRef<HTMLInputElement>(null)` | Ref für ein DOM-Element |
| `<input ref={inputRef} />` | hängt den Ref an das Element |
| `inputRef.current?.focus()` | Element fokussieren (im Effekt oder Handler) |
| `ref.current += 1` | Wert ändern, löst kein Re-Render aus |

## Variable, State, Ref

| Frage | Variable | `useState` | `useRef` |
| ----- | -------- | ---------- | -------- |
| Bleibt der Wert über Re-Renders erhalten? | nein | ja | ja |
| Löst eine Änderung ein Re-Render aus? | nein | ja | nein |
| Typischer Einsatz | Hilfswert innerhalb eines Renders | sichtbare Daten (Zähler, Liste, Eingabe) | DOM-Element, Timer-ID, Klickzähler im Hintergrund |

## Regel für `ref.current`

| Ort | Erlaubt? |
| --- | -------- |
| Event-Handler | ja |
| Effekt, Cleanup, Timer-Callback | ja |
| Render-Körper / JSX | nein (`react-hooks/refs`) |
