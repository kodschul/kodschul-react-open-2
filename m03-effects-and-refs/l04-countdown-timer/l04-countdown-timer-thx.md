# Lab 3.4: Countdown-Timer bauen

**Leitfragen:**

<details>
<summary>Warum liefert `setSecs(secs - 1)` im Intervall immer denselben Wert?</summary>

Die Callback-Funktion des Intervalls merkt sich `secs` aus dem Render, in dem der Effekt lief („Stale Closure“). Das Intervall startet nicht neu, also bleibt der Wert alt.

</details>

<details>
<summary>Wer stoppt den Timer bei 0?</summary>

Kein eigener Code: `isTicking` (`isRunning && secsLeft > 0`) wird bei 0 `false`. Dadurch läuft der Cleanup des Effekts und löscht das Intervall.

</details>

<details>
<summary>Muss die Hintergrundfarbe ein eigener State sein?</summary>

Nein. `secsLeft === 0` genügt, die Farbe wird beim Rendern daraus berechnet.

</details>

- Das funktionale Update `setSecs(prev => prev - 1)` liest immer den aktuellen State.
- Aus State lässt sich ableiten, ob der Timer läuft oder abgelaufen ist; dafür braucht es keine zusätzlichen States oder Effekte.

## Funktionales Update gegen Stale Closures

Der Effekt mit `[isTicking]` läuft nur bei Änderung von `isTicking`. Die Funktion im Intervall bleibt dieselbe und sieht immer den Wert von `secsLeft` aus dem Render, in dem sie erzeugt wurde.

```tsx
// Fehler: secsLeft ist in der Closure eingefroren (z. B. 10)
window.setInterval(() => {
  setSecsLeft(secsLeft - 1); // setzt immer wieder 9
}, 1000);

// Richtig: Funktionales Update bekommt den aktuellen Wert als Argument
window.setInterval(() => {
  setSecsLeft((prev) => prev - 1); // 9, 8, 7, …
}, 1000);
```

| Schreibweise | Wann sinnvoll |
| ------------ | ------------- |
| `setX(x + 1)` | im Event-Handler, einmal pro Klick |
| `setX(prev => prev + 1)` | in Intervallen, Timeouts und wenn der neue Wert vom alten abhängt |

Den Wert `secsLeft` ins Dependency-Array zu schreiben würde ebenfalls funktionieren, startet das Intervall aber jede Sekunde neu. Das funktionale Update ist die schlankere Lösung.

## Aufbau: State und abgeleitete Werte

Nur drei Werte sind State, alles andere folgt daraus (`src/examples/m03-effects-and-refs/l04-countdown-timer/index.tsx`):

| Name | Art | Bedeutung |
| ---- | --- | --------- |
| `inputSecs` | State | Wert im Eingabefeld |
| `secsLeft` | State | verbleibende Sekunden |
| `isRunning` | State | Start/Stopp-Schalter |
| `isTicking` | abgeleitet | `isRunning && secsLeft > 0`: das Intervall soll laufen |
| `isExpired` | abgeleitet | `secsLeft === 0`: Hintergrund rot |

```tsx
const [inputSecs, setInputSecs] = useState(10);
const [secsLeft, setSecsLeft] = useState(10);
const [isRunning, setRunning] = useState(false);

// Abgeleitete Werte: Sie ergeben sich aus State und brauchen weder State noch Effekt
const isExpired = secsLeft === 0;
const isTicking = isRunning && secsLeft > 0;

// Ein Effekt für das Ticken. Erreicht secsLeft 0, wird isTicking false:
// React räumt das Intervall per Cleanup auf.
useEffect(() => {
  if (!isTicking) return;

  const timerId = window.setInterval(() => {
    setSecsLeft((prev) => prev - 1);
  }, 1000);

  return () => window.clearInterval(timerId);
}, [isTicking]);

const start = () => {
  setSecsLeft(inputSecs);
  setRunning(true);
};
```

Ablauf bei Startwert 3:

| Sekunde | `secsLeft` | `isTicking` | Hintergrund | Intervall |
| ------- | ---------- | ----------- | ----------- | --------- |
| Klick auf „Start“ | 3 | true | blau | startet |
| 1 | 2 | true | blau | läuft |
| 2 | 1 | true | blau | läuft |
| 3 | 0 | false | **rot** | Cleanup löscht es |

Die Eingabe liest `valueAsNumber` (Zahl statt Text) und fängt leere Felder ab:

```tsx
<input
  type="number"
  min={0}
  value={inputSecs}
  onChange={(e) => setInputSecs(Math.max(0, e.target.valueAsNumber || 0))}
/>
```

## Statt „Stopp bei 0“-Effekt

In älterem Code steht oft ein zweiter Effekt, der den Timer bei 0 per State abschaltet:

```tsx
// Umständlich: Effekt, der nur State aus State ableitet
useEffect(() => {
  if (secsLeft === 0) {
    setRunning(false); // zusätzlicher Render, Linter-Meldung set-state-in-effect
  }
}, [secsLeft]);
```

| Variante | Nachteil |
| -------- | -------- |
| Zweiter Effekt setzt `isRunning` auf `false` | ein zusätzlicher Render, zwei Effekte, die voneinander abhängen |
| `isTicking` als abgeleiteter Wert | keine – ein Effekt, ein Wert, kein Zwischenzustand |

Die Hintergrundfarbe folgt dem gleichen Muster: `style={{ backgroundColor: isExpired ? "red" : "darkblue" }}`.

> **Merksatz:** Was sich aus State berechnen lässt, ist kein State und braucht keinen Effekt.

## Fazit

- Im Intervall immer das funktionale Update `prev => prev - 1` verwenden.
- Ein Effekt tickt, gesteuert über den abgeleiteten Wert `isTicking`; bei 0 räumt der Cleanup auf.
- „Läuft“ und „abgelaufen“ ergeben sich aus `secsLeft`, daher kein zusätzlicher State.

In der Übung entsteht ein Countdown mit Zahleneingabe, Start und Stop und rotem Hintergrund bei 0.
