# Lab 5.2: async/await, Ladezustand und Fehler

**Leitfragen:**

<details>
<summary>Was zeigt der Bildschirm, während die Daten laden?</summary>

Ohne Ladezustand eine leere Seite, die wie ein Fehler wirkt. Mit einem `isLoading`-State erscheint „Lade …“, bis die Antwort da ist.

</details>

<details>
<summary>Warum wirft `fetch` bei 404 keinen Fehler?</summary>

Das Promise wird nur abgelehnt, wenn keine Antwort ankommt (Netzwerk weg, DNS-Fehler). Ein 404 ist eine gültige HTTP-Antwort; `response.ok` ist dann `false` und muss selbst geprüft werden.

</details>

<details>
<summary>Wofür ist `finally` gut?</summary>

`finally` läuft nach Erfolg und nach Fehler. Der Ladezustand endet damit in beiden Fällen an einer Stelle.

</details>

- `async/await` liest sich wie sequentieller Code, arbeitet aber weiter mit Promises.
- Eine ehrliche Anzeige kennt drei Zustände: lädt, Fehler, Daten.

## Promises kurz

Ein Promise steht für ein Ergebnis, das später eintrifft. Es hat drei Zustände und wird genau einmal entschieden.

| Zustand | Bedeutung | Reaktion |
| ------- | --------- | -------- |
| `pending` | Ergebnis noch offen | – |
| `fulfilled` | erfolgreich abgeschlossen | `.then(...)` bzw. `await` liefert den Wert |
| `rejected` | fehlgeschlagen | `.catch(...)` bzw. `catch`-Block |

```ts
// Eigenes Promise: löst sich nach ms Millisekunden auf
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const run = async () => {
  console.log("Start");
  await wait(2000); // pausiert die Funktion, nicht den Browser
  console.log("2 Sekunden später");
};
```

Mehrere unabhängige Anfragen laufen mit `Promise.all` parallel; `await` wartet auf alle:

```ts
const [page1, page2] = await Promise.all([
  fetch(`${API_BASE_URL}/character?page=1`).then((response) => response.json()),
  fetch(`${API_BASE_URL}/character?page=2`).then((response) => response.json()),
]);
```

## Von .then zu async/await

| Aspekt | `.then`-Kette | `async/await` |
| ------ | ------------- | ------------- |
| Lesbarkeit | verschachtelte Callbacks | Zeile für Zeile von oben nach unten |
| Fehlerbehandlung | `.catch(...)` am Ende | `try/catch/finally` |
| Rückgabe | Promise | `async`-Funktion gibt immer ein Promise zurück |
| Einschränkung | – | `await` nur in `async`-Funktionen |

`useEffect` erwartet eine Cleanup-Funktion oder nichts als Rückgabewert; ein `async`-Callback gäbe ein Promise zurück. Deshalb steht die `async`-Funktion im Effekt und wird dort aufgerufen.

## Ladezustand, Fehler und response.ok

```tsx
import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

const ENDPOINT = "/character";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);   // beim ersten Render läuft die Anfrage schon an
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT}`);
        // fetch wirft bei 404 oder 500 nicht: Der Statuscode muss selbst geprüft werden.
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: CharacterPage = await response.json();
        setCharacters(data.results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setIsLoading(false); // nach Erfolg und nach Fehler
      }
    };
    loadCharacters();
  }, []);

  return (
    <main className="p-8">
      {isLoading && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error}</p>}
      {/* Grid mit characters.map(...) wie in Lab 5.1 */}
    </main>
  );
};
```

Vollständige Datei: `src/examples/m05-api-fetching/l02-async-await-loading-errors/index.tsx`.

| `isLoading` | `error` | `characters` | Anzeige |
| ----------- | ------- | ------------ | ------- |
| `true` | `null` | leer | „Lade …“ |
| `false` | `null` | 20 Einträge | Galerie |
| `false` | Text | leer | Fehlermeldung |

## Was fetch bei Fehlern tut

| Situation | Promise | `response.ok` | Folge ohne eigene Prüfung |
| --------- | ------- | ------------- | ------------------------- |
| Antwort `200` | `fulfilled` | `true` | läuft normal |
| Antwort `404` / `500` | `fulfilled` | `false` | Body ist kein erwartetes JSON; Folgefehler später |
| Netzwerk weg, DNS-Fehler | `rejected` | – | `catch`-Block läuft |

Die Beispiel-App `app-without-ok-check.tsx` ruft die absichtlich falsche URL `/character-` ohne `ok`-Prüfung auf: Die 404-Antwort hat kein Feld `results`, `characters` wird `undefined`, und `characters.map` wirft einen `TypeError`. Die Seite bricht ab.

Der Fehlerfall mit Prüfung steht in `app-error-case.tsx`; dort ist nur die URL falsch und markiert:

```tsx
// FEHLERFALL: absichtlich falsche URL (richtig wäre "/character"). Die API antwortet mit 404.
const ENDPOINT = "/character-";
```

Ergebnis: „Fehler beim Laden: HTTP 404“, keine Galerie, kein „Lade …“ mehr.

> **Merksatz:** Bei `fetch` gehört `response.ok` in jeden Aufruf; erst danach ist die Antwort ein Erfolg.

## Fazit

- `async/await` mit `try/catch/finally` ersetzt die `.then`-Kette und liest sich von oben nach unten.
- `fetch` lehnt nur bei fehlender Antwort ab; HTTP-Fehler erkennt `response.ok`.
- `isLoading` und `error` machen drei Zustände sichtbar; `finally` beendet den Ladezustand immer.

Die Übung stellt die Galerie aus Lab 5.1 um und prüft den Fehlerfall mit falscher URL.
