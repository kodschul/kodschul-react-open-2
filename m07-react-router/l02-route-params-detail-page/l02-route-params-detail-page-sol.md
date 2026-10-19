# Lab 7.2 – Lösung: Detailseite mit URL-Parametern

## Aufgabe 1 und 2: Karten als Link

```tsx
import { Link, useParams } from "react-router";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

{data?.results.map((character) => (
  // Jede Karte ist ein Link auf die Detailseite dieses Charakters.
  <Link key={character.id} to={`/characters/${character.id}`}>
    <img className="h-48 w-48 rounded object-cover" src={character.image} alt={character.name} width={200} height={200} />
    <div>{character.name}</div>
  </Link>
))}
```

Das `key` gehört an das äußerste Element der Schleife, hier den `Link`.

## Aufgabe 3: Request-Funktion

```tsx
const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};
```

`useParams` liefert die ID als String; die URL braucht keine Umwandlung in eine Zahl.

## Aufgabe 4 und 5: Detailseite

```tsx
const CharacterDetailPage = () => {
  const { id = "" } = useParams();

  const { data: character, isPending, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    retry: false,
  });

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">
        ← Zurück zur Galerie
      </Link>
      {isPending && <p className="mt-4">Lade …</p>}
      {error && <p className="mt-4 text-red-600">Fehler beim Laden: {error.message}</p>}
      {character && (
        <div className="mt-4">
          <h1 className="mb-2 text-3xl font-bold">{character.name}</h1>
          <img className="mb-2 h-64 w-64 rounded object-cover" src={character.image} alt={character.name} width={256} height={256} />
          <p>Status: {character.status}</p>
          <p>Spezies: {character.species}</p>
        </div>
      )}
    </section>
  );
};
```

| Entscheidung | Begründung |
| ------------ | ---------- |
| `{ id = "" } = useParams()` | `useParams` liefert `string \| undefined`; der Standardwert hält den Typ einfach |
| `queryKey: ["character", id]` | eigener Cache-Eintrag pro Charakter; ändert sich die ID, lädt `useQuery` neu |
| `retry: false` | eine unbekannte ID (404) soll sofort als Fehler erscheinen, nicht nach drei Wiederholungen |
| `character &&` statt `!isPending` | `character` ist erst nach dem Laden gesetzt; kein Zugriff auf `undefined` |

## Aufgabe 6: Route

```tsx
<Routes>
  <Route path="/" element={<Navigate to="/characters" replace />} />
  <Route path="/characters" element={<CharactersPage />} />
  <Route path="/characters/:id" element={<CharacterDetailPage />} />
</Routes>
```

## Aufgabe 7 bis 10: Beobachtungen

| Aufgabe | Ergebnis |
| ------- | -------- |
| 7 | URL `/playground/characters/1`; `Link` und Browser-Zurück führen zur Galerie |
| 8 | `F5` zeigt denselben Charakter; Network-Tab: neue Anfrage `character/1` (der Cache ist nach dem Neuladen leer) |
| 9 | „Fehler beim Laden: Request failed with status code 404“ |
| 10 | Die Galerie startet wieder auf Seite 1: Die Seitenzahl lag im State der Galerie, und die Galerie wurde beim Seitenwechsel entfernt |

## Lösung zur Erweiterung

```tsx
const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending, error } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacterPage(page),
    staleTime: 60_000,
  });

  // Buttons:
  // onClick={() => setSearchParams({ page: String(page - 1) })} disabled={page === 1}
  // onClick={() => setSearchParams({ page: String(page + 1) })}

  // Karten: die Seite reist als Query-Parameter zur Detailseite mit.
  // <Link key={character.id} to={`/characters/${character.id}?page=${page}`}>
};

const CharacterDetailPage = () => {
  const { id = "" } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  // …
  // <Link to={`/characters?page=${page}`}>← Zurück zur Galerie (Seite {page})</Link>
};
```

Der Zurück-Button des Browsers landet auf `/characters?page=3`, weil jeder Seitenwechsel einen History-Eintrag erzeugt. Der Link in der Detailseite braucht die Seite aus `?page=`.

Referenz-App: `src/examples/m07-react-router/l02-route-params-detail-page/index.tsx` (Erweiterung: `app-search-params.tsx`, Startadresse `…/app-search-params/characters?page=3`)
