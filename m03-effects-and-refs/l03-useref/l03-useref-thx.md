# Lab 3.3: useRef – Werte merken ohne Re-Render

**Leitfragen:**

<details>
<summary>Wann soll eine Änderung *nicht* neu rendern?</summary>

Wenn der Wert nicht angezeigt wird, z. B. eine Timer-ID oder ein Klickzähler im Hintergrund. Ein Ref speichert ihn, ohne ein Re-Render auszulösen.

</details>

<details>
<summary>Warum nicht einfach `document.getElementById`?</summary>

IDs sind global und müssen eindeutig sein. Ein Ref gehört zur Komponente, funktioniert auch bei mehrfach eingebundenen Komponenten und ist typisiert.

</details>

<details>
<summary>Wo wird eine Timer-ID am besten gespeichert?</summary>

In einem Ref. Die ID muss Re-Renders überleben, wird aber nicht angezeigt – ein State würde unnötig neu rendern.

</details>

- `useRef` liefert ein Objekt `{ current }`, das über alle Renders dasselbe bleibt.
- Eine Änderung von `ref.current` löst kein Re-Render aus.

## Variable, State oder Ref?

Drei Möglichkeiten, einen Wert in einer Komponente zu halten:

| Frage | Variable | `useState` | `useRef` |
| ----- | -------- | ---------- | -------- |
| Bleibt der Wert über Re-Renders erhalten? | nein | ja | ja |
| Löst eine Änderung ein Re-Render aus? | nein | ja | nein |
| Typischer Einsatz | Hilfswert innerhalb eines Renders | sichtbare Daten (Zähler, Liste, Eingabe) | DOM-Element, Timer-ID, Klickzähler im Hintergrund |

`app-variable-state-ref.tsx` macht den Unterschied sichtbar: Drei Buttons erhöhen je eine Variable, einen State und einen Ref, das Log zeigt die Werte.

```tsx
const bumpVariable = () => {
  let clicks = 0; // lebt nur bis zum Ende des Aufrufs
  clicks += 1;
  console.log("Variable:", clicks, "(jeder Klick startet wieder bei 0)");
};

const bumpState = () => {
  setStateCount(stateCount + 1); // Re-Render, Anzeige aktualisiert sich
};

const bumpRef = () => {
  refCount.current += 1; // kein Re-Render, der Wert bleibt erhalten
  console.log("Ref:", refCount.current);
};
```

## Ref auf ein DOM-Element

Ein Ref am `ref`-Attribut eines Elements zeigt nach dem Render auf das echte DOM-Element. Der Autofokus der Input-App (`src/examples/m03-effects-and-refs/l03-useref/index.tsx`):

```tsx
const inputRef = useRef<HTMLInputElement>(null); // Typ: das DOM-Element oder null

// Autofokus: current ist erst nach dem ersten Render gefüllt, deshalb im Effekt
useEffect(() => {
  inputRef.current?.focus();
}, []);

// im JSX
<input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
```

| Kriterium | `document.getElementById("x")` | `ref` |
| --------- | ------------------------------ | ----- |
| Zuordnung | globale `id`, muss eindeutig sein | an die Komponente gebunden |
| Mehrere Instanzen der Komponente | Konflikt | jede Instanz hat ihren Ref |
| Typisierung | `HTMLElement \| null` ohne Bezug zur Komponente | `HTMLInputElement \| null` direkt am Ref |

Seit React 19 reicht ein Ref auch als normales Prop an eigene Komponenten durch (Lab 4.1), `forwardRef` ist nur noch in älterem Code nötig.

## Ref als unsichtbarer Zähler

Ein Ref merkt sich Werte, die nicht auf dem Bildschirm erscheinen. Der Zähler zählt alle Klicks im Hintergrund und loggt sie im Klick-Handler:

```tsx
const clickCountRef = useRef(0);

const changeCount = (delta: number) => {
  setCount(count + delta);
  clickCountRef.current += 1; // schreiben im Handler: erlaubt
  console.log(`Klicks insgesamt: ${clickCountRef.current}`); // lesen im Handler: erlaubt
};
```

Typische Falle aus älterem Code – das Log steht im Render:

```tsx
// Nicht so: ref.current im Render lesen
console.log(`Geklickt: ${clickCountRef.current}`);
```

Der Wert im Render ist nicht verlässlich: React rendert in der Entwicklung doppelt, und ein Render kann verworfen werden. Der Linter meldet das (`react-hooks/refs`).

## Regel für `ref.current`

| Ort | Lesen/Schreiben von `ref.current` |
| --- | --------------------------------- |
| Event-Handler (`onClick`, `onChange`) | erlaubt |
| Effekt und Cleanup | erlaubt |
| Timer-Callbacks (`setTimeout`, `setInterval`) | erlaubt |
| Render-Körper der Komponente / JSX | nicht erlaubt |

Muss ein Ref-Wert angezeigt werden, gehört er in einen State (oder wird per Handler in einen State kopiert, wie `refSnapshot` in `app-variable-state-ref.tsx`).

## Ref für Timer-IDs

Die ID eines Intervalls oder Timeouts wird nicht angezeigt, muss aber über Renders erhalten bleiben (Lab 3.2, Stufe b):

```tsx
const timerIdRef = useRef<number | undefined>(undefined); // React 19: Startwert ist Pflicht

useEffect(() => {
  timerIdRef.current = window.setInterval(() => { /* … */ }, 1000);
  return () => window.clearInterval(timerIdRef.current);
}, []);

const stopTimer = () => window.clearInterval(timerIdRef.current); // im Handler
```

> **Merksatz:** State für alles, was auf dem Bildschirm steht. Ref für alles, was nur gemerkt werden muss.

## Fazit

- Variable: vergisst jeden Render. State: bleibt und rendert neu. Ref: bleibt, rendert nicht neu.
- Refs binden DOM-Elemente (`focus()`) und speichern Timer-IDs oder Hintergrundzähler.
- `ref.current` wird nur in Handlern und Effekten gelesen oder geschrieben, nie im Render.

In der Übung erhält die Input-App einen Autofokus, und ein Ref zählt alle Klicks im Hintergrund.
