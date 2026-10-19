# Lab 7.2: Detailseite mit URL-Parametern

**Leitfragen:**

<details>
<summary>Wie kommt die ID aus der URL in die Komponente?</summary>

Die Route `/characters/:id` markiert den veränderlichen Teil mit einem Doppelpunkt. `useParams()` liefert ihn als Objekt, z. B. `{ id: "1" }`; der Wert ist immer ein String.

</details>

<details>
<summary>Was passiert beim Neuladen der Detailseite?</summary>

Die URL enthält die ID, deshalb zeigt die Seite denselben Charakter: `useParams` liest die ID, `useQuery` lädt die Daten neu. Nur State, der nicht in der URL steht (z. B. die Seite der Galerie), geht verloren.

</details>

<details>
<summary>Warum gehört die ID in den `queryKey`?</summary>

Der Schlüssel muss alles enthalten, wovon das Ergebnis abhängt. Mit `["character", id]` hat jeder Charakter seinen eigenen Cache-Eintrag; ohne die ID würden alle Detailseiten denselben Eintrag teilen.

</details>

- Routen-Parameter sind Teil des Pfads und wählen eine Ressource; Query-Parameter hängen hinten an und beschreiben Ansicht oder Filter.
- `useParams` liest den Routen-Parameter, `useSearchParams` die Query-Parameter.

## Routen-Parameter und Query-Parameter

| Merkmal | Routen-Parameter | Query-Parameter |
| ------- | ---------------- | --------------- |
| Beispiel-URL | `/characters/42` | `/characters?page=3` |
| Definition | in der Route: `path="/characters/:id"` | nicht in der Route, frei anhängbar |
| Zweck | eine bestimmte Ressource | Filter, Sortierung, Seite, Suche |
| Pflicht? | ja, sonst passt die Route nicht | optional |
| Lesen | `useParams()` | `useSearchParams()` |
| Wert | immer String | immer String oder `null` |

## Dynamische Route und useParams

```tsx
// src/examples/m07-react-router/l02-route-params-detail-page/index.tsx
<Routes>
  <Route path="/" element={<Navigate to="/characters" replace />} />
  <Route path="/characters" element={<CharactersPage />} />
  {/* :id passt auf /characters/1, /characters/2, … */}
  <Route path="/characters/:id" element={<CharacterDetailPage />} />
</Routes>
```

Der Name nach dem Doppelpunkt ist der Schlüssel, unter dem `useParams` den Wert liefert.

## Galerie-Karten als Link

Statt eines `<div>` umschließt ein `Link` die Karte. Die URL entsteht aus der ID des Charakters:

```tsx
{data?.results.map((character) => (
  // Jede Karte ist ein Link auf die Detailseite dieses Charakters.
  <Link key={character.id} to={`/characters/${character.id}`}>
    <img className="h-48 w-48 rounded object-cover" src={character.image} alt={character.name} width={200} height={200} />
    <div>{character.name}</div>
  </Link>
))}
```

## Detailseite: useParams und useQuery

```tsx
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { fetchCharacter } from "./api";

const CharacterDetailPage = () => {
  // Der Name nach dem Doppelpunkt in der Route (:id) ist der Schlüssel in params.
  const { id = "" } = useParams();

  const { data: character, isPending, error } = useQuery({
    // Die id gehört in den Key: Jeder Charakter bekommt einen eigenen Cache-Eintrag.
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    // Eine unbekannte ID (404) wird nicht mehrfach wiederholt.
    retry: false,
  });

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">← Zurück zur Galerie</Link>
      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error.message}</p>}
      {character && (
        <div>
          <h1 className="text-3xl font-bold">{character.name}</h1>
          <img src={character.image} alt={character.name} width={256} height={256} />
          <p>Status: {character.status}</p>
          <p>Spezies: {character.species}</p>
        </div>
      )}
    </section>
  );
};

export default CharacterDetailPage;
```

Die Request-Funktion liegt in `api.ts`:

```ts
export const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};
```

| Situation | Anzeige |
| --------- | ------- |
| `/characters/1` | „Lade …“, dann Rick Sanchez |
| `/characters/99999` | Fehler „Request failed with status code 404“ |
| Detailseite neu laden (`F5`) | derselbe Charakter: Die URL trägt die ID |
| Seite 3 der Galerie, Detail öffnen, „Zurück zur Galerie“ | Seite 1: Der State `page` ging mit der Galerie verloren |

Die Komponenten liegen in `CharactersPage.tsx` und `CharacterDetailPage.tsx` neben der `index.tsx`.

## Query-Parameter mit useSearchParams

Liegt die Seitenzahl in der URL (`/characters?page=3`) statt im State, überlebt sie Neuladen, Lesezeichen und Zurück-Button.

```tsx
import { useSearchParams } from "react-router";

const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Fehlt der Parameter oder ist er keine Zahl, startet die Galerie auf Seite 1.
  const page = Number(searchParams.get("page")) || 1;

  const { data } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacterPage(page),
    staleTime: 60_000,
  });

  return (
    <>
      <button onClick={() => setSearchParams({ page: String(page - 1) })} disabled={page === 1}>Zurück</button>
      <button onClick={() => setSearchParams({ page: String(page + 1) })}>Weiter</button>
      {/* Karten: <Link to={`/characters/${character.id}?page=${page}`}> */}
    </>
  );
};
```

| Aufruf | Ergebnis |
| ------ | -------- |
| `searchParams.get("page")` | `"3"` oder `null` |
| `setSearchParams({ page: "4" })` | URL wird `?page=4`, die Komponente rendert neu |
| `Number(searchParams.get("page")) \|\| 1` | Seite als Zahl, Standard `1` |

- Die Detailseite liest `?page` ebenfalls aus der URL und baut den Link zurück zu `/characters?page=3`.
- Vollständige Variante: `src/examples/m07-react-router/l02-route-params-detail-page/app-search-params.tsx` (Startadresse mit `/characters?page=3`).
- In älterem Code: `useLocation()` + `new URLSearchParams(location.search)`. `useSearchParams` ersetzt beides und kann auch schreiben.

> **Merksatz:** Alles, was nach einem Neuladen wieder stimmen muss, gehört in die URL.

## Fazit

- `:id` in der Route, `useParams()` in der Komponente: Die URL wählt die Ressource.
- Detail laden mit `useQuery`; die ID steht im `queryKey` und in der Request-URL.
- `useSearchParams` hält die Galerie-Seite in der URL; das macht Neuladen und „Zurück“ verlässlich.

Die Übung verbindet Galerie und Detailseite; die Erweiterung legt die Seite in `?page=`.
