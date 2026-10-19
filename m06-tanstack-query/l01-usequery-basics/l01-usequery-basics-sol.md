# Lab 6.1 – Lösung: Galerie mit useQuery

## Aufgabe 1 bis 6: Umbau auf useQuery

```tsx
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

const fetchCharacters = async (page: number): Promise<CharacterPage> => {
  const response = await api.get<CharacterPage>("/character", { params: { page } });
  return response.data;
};

const Gallery = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
  });

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      <div className="mb-4 flex items-center gap-4">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Zurück
        </button>
        <span className="font-semibold">Seite {page}</span>
        <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setPage(page + 1)}>
          Weiter
        </button>
      </div>
      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error.message}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((character) => (
          <div key={character.id}>
            <img className="h-48 w-48 rounded object-cover" src={character.image} alt={character.name} width={200} height={200} />
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Außerhalb der Komponente: Der Cache soll Renders überleben.
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Gallery />
  </QueryClientProvider>
);

export default App;
```

| Entscheidung | Begründung |
| ------------ | ---------- |
| `Gallery` als eigene Komponente | `useQuery` braucht einen Provider *über* der Komponente, die ihn aufruft |
| `queryKey: ["characters", page]` | Array mit der Seite: jede Seite ein eigener Cache-Eintrag, Seitenwechsel löst automatisch neues Laden aus |
| `fetchCharacters` ohne `try/catch` | `useQuery` fängt den Fehler und füllt `error` |
| `data?.results` | `data` ist bis zur ersten Antwort `undefined` |

## Aufgabe 7: Zurückblättern ohne staleTime

| Schritt | Network-Tab | Anzeige |
| ------- | ----------- | ------- |
| Seite 1 → 2 → 3 | je eine neue Anfrage | „Lade …“, dann Karten |
| Zurück auf 2 | neue Anfrage im Hintergrund | Karten erscheinen sofort aus dem Cache |
| Zurück auf 1 | neue Anfrage im Hintergrund | Karten erscheinen sofort |

Ohne `staleTime` gelten Daten sofort als veraltet: `useQuery` zeigt sie trotzdem an und prüft im Hintergrund auf Neues.

## Aufgabe 8: staleTime

```tsx
const { data, isPending, error } = useQuery({
  queryKey: ["characters", page],
  queryFn: () => fetchCharacters(page),
  staleTime: 60_000, // eine Minute frisch
});
```

Zurück auf eine besuchte Seite löst jetzt keine Anfrage mehr aus; der Network-Tab bleibt still.

## Aufgabe 9: Statuszeile

```tsx
const { data, isPending, isLoading, isFetching, error } = useQuery({ /* … */ });

<p className="font-mono text-sm">
  isPending: {String(isPending)} · isLoading: {String(isLoading)} · isFetching: {String(isFetching)}
</p>
```

| Situation | `isPending` | `isLoading` | `isFetching` |
| --------- | ----------- | ----------- | ------------ |
| erster Besuch einer Seite, Anfrage läuft | `true` | `true` | `true` |
| besuchte Seite, Daten im Cache, frisch | `false` | `false` | `false` |
| besuchte Seite, veraltet, Hintergrund-Refetch | `false` | `false` | `true` |

## Aufgabe 10: Fehlerfall

Mit `"/character-"` bleibt „Lade …“ etwa sieben Sekunden stehen, danach erscheint „Fehler beim Laden: Request failed with status code 404“. Der Grund: `useQuery` wiederholt eine fehlgeschlagene Anfrage standardmäßig dreimal (nach 1, 2 und 4 Sekunden). Wer das nicht möchte, setzt `retry: false`.

## Aufgabe 11: Zeilenvergleich

| Variante | Lade-Logik | Zeilen (ohne Leerzeilen und Kommentare) |
| -------- | ---------- | --------------------------------------- |
| Lab 5.3 | 3 State-Variablen + `useEffect` mit `try/catch/finally` und `ignore` | 22 |
| Lab 6.1 | `fetchCharacters` + `useQuery`-Aufruf | 9 |

Der Rest der Datei (Buttons, Grid) bleibt gleich. Die Zahlen hängen vom Formatierungsstil ab; die Lade-Logik schrumpft auf weniger als die Hälfte.

Referenz-App: `src/examples/m06-tanstack-query/l01-usequery-basics/index.tsx`
