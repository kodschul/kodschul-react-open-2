# Lab 5.2 – Lösung: Galerie mit async/await, Ladezustand und Fehler

## Aufgabe 1 bis 6: Komponente mit drei Zuständen

```tsx
import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const ENDPOINT = "/character";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: CharacterPage = await response.json();
        setCharacters(data.results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacters();
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      {isLoading && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {characters.map((character) => (
          <div key={character.id}>
            <img className="h-48 w-48 rounded object-cover" src={character.image} alt={character.name} width={200} height={200} />
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
```

| Entscheidung | Begründung |
| ------------ | ---------- |
| `async`-Funktion im Effekt statt `async` als Effekt-Callback | Der Effekt-Callback darf kein Promise zurückgeben |
| `throw new Error(...)` bei `!response.ok` | Der HTTP-Fehler landet im selben `catch` wie ein Netzwerkfehler |
| `setIsLoading(false)` im `finally` | läuft bei Erfolg und Fehler, an einer Stelle |
| `isLoading` startet mit `true` | Die Anfrage läuft beim ersten Render schon an; kein synchrones `setState` im Effekt nötig |

## Aufgabe 7: Fehlerfall

```tsx
// FEHLERFALL: absichtlich falsche URL (richtig wäre "/character")
const ENDPOINT = "/character-";
```

Erwartete Anzeige:

```text
The Rick and Morty API
Fehler beim Laden: HTTP 404
```

Im Network-Tab steht die Anfrage `character-` mit Status `404 Not Found`. „Lade …“ ist verschwunden, weil `finally` den Ladezustand beendet hat.

## Aufgabe 8: Ohne response.ok

```tsx
// if (!response.ok) {
//   throw new Error(`HTTP ${response.status}`);
// }
```

Die 404-Antwort hat den Body `{"error":"There is nothing here."}`. `data.results` ist `undefined`, `characters.map` wirft:

```text
TypeError: Cannot read properties of undefined (reading 'map')
```

Die Seite wird leer. Die Variante liegt als `src/examples/m05-api-fetching/l02-async-await-loading-errors/app-without-ok-check.tsx` im Repo.

## Aufgabe 9: Drosselung

| Zeitpunkt | Anzeige |
| --------- | ------- |
| direkt nach dem Reload | „Lade …“, Grid leer |
| nach der Antwort | „Lade …“ verschwindet, 20 Karten erscheinen |

Bilder laden separat und können nach der Liste einzeln einlaufen.

## Lösung zur Erweiterung

```tsx
const response = await fetch(`${API_BASE_URL}${ENDPOINT}`);
if (!response.ok) {
  throw new Error(response.status === 404 ? "Nichts gefunden" : "Serverfehler");
}
// …
} catch (e) {
  // fetch lehnt bei fehlender Verbindung mit einem TypeError ab
  setError(e instanceof TypeError ? "Keine Verbindung" : e instanceof Error ? e.message : "Unbekannter Fehler");
}
```

`TypeError` steht bei `fetch` für „Anfrage kam nicht durch“; selbst geworfene Fehler sind einfache `Error`-Objekte.

Referenz-App: `src/examples/m05-api-fetching/l02-async-await-loading-errors/index.tsx` (Fehlerfall: `app-error-case.tsx`)
