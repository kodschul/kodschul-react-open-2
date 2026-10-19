# Lab 5.1 – Lösung: Charakter-Galerie mit fetch

## Aufgabe 1: JSON im Browser ansehen

`results[0]` enthält u. a. diese Felder:

```text
id, name, status, species, type, gender, origin, location, image, episode, url, created
```

Der Kurs nutzt davon nur `id`, `name`, `status`, `species` und `image` (Typ `Character`).

## Aufgabe 2: Importe und Setter

```tsx
import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const [characters, setCharacters] = useState<Character[]>([]);
```

`type` vor den Typnamen ist wegen `verbatimModuleSyntax` nötig: Typen werden zur Laufzeit entfernt.

## Aufgabe 3 und 4: fetch im Effekt, Antwort auswerten

```tsx
useEffect(() => {
  fetch(`${API_BASE_URL}/character`)
    .then((response) => response.json())
    .then((data: CharacterPage) => setCharacters(data.results))
    .catch((error) => console.error("Anfrage fehlgeschlagen", error));
}, []);
```

Das leere Array startet den Effekt einmal nach dem ersten Render. Zwei `.then`, weil `response.json()` selbst ein Promise liefert.

## Aufgabe 5: Galerie rendern

```tsx
<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
  {characters.map((character) => (
    <div key={character.id}>
      <img
        className="h-48 w-48 rounded object-cover"
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
      />
      <div>{character.name}</div>
    </div>
  ))}
</div>
```

`key={character.id}` ist die stabile ID aus der API; der Array-Index wäre bei sich ändernden Listen die schlechtere Wahl.

## Aufgabe 6: Render beobachten

```tsx
console.log("Render:", characters.length);
return (/* … */);
```

Erwartete Konsole:

```text
Render: 0
Render: 20
```

Im Entwicklungsmodus kann `Render: 0` doppelt erscheinen (`<StrictMode>` rendert zur Prüfung zweimal).

## Aufgabe 7: Network-Tab

| Beobachtung | Wert |
| ----------- | ---- |
| Anfrage | `GET https://rickandmortyapi.com/api/character` |
| Status | `200` |
| Response | `{"info":{"count":826,"pages":42,…},"results":[…]}` |
| Anzahl | 2 im Entwicklungsmodus (StrictMode startet den Effekt doppelt), 1 im Produktionsbuild |

## Lösung zur Erweiterung

```tsx
const loadCharacters = () => {
  fetch(`${API_BASE_URL}/character`)
    .then((response) => response.json())
    .then((data: CharacterPage) => setCharacters(data.results))
    .catch((error) => console.error("Anfrage fehlgeschlagen", error));
};

useEffect(loadCharacters, []);

// im JSX:
<button className="mb-4 rounded bg-blue-600 px-3 py-1 text-white" onClick={loadCharacters}>
  Neu laden
</button>
```

Die Funktion ist außerhalb des Effekts definiert, damit Effekt und Button sie teilen.

Referenz-App: `src/examples/m05-api-fetching/l01-fetch-with-promises/index.tsx`
