# Modul 9 – Lösung: Transferübung Rick and Morty Explorer

Die Lösung folgt der Nummerierung der Übung. Der vollständige Endstand aller Dateien steht am Ende; die Referenz-App liegt unter `src/examples/m09-forms-and-testing/transfer/`.

## Aufgabe 1: Starter prüfen

Erwartet: Kopfzeile „Rick and Morty Explorer“ und der Text „Galerie folgt.“ unter `http://localhost:5173/playground`.

## Aufgabe 2: `api.ts`

```ts
// src/playground/api.ts
import axios from "axios";
import { API_BASE_URL, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL });

export const fetchCharacters = async (page: number): Promise<CharacterPage> => {
  const { data } = await api.get<CharacterPage>("/character", { params: { page } });
  return data;
};
```

Die axios-Instanz bündelt `baseURL`; `params` baut `?page=…` an die URL. In Aufgabe 7 und 9 wächst die Datei (siehe Endstand).

## Aufgabe 3: `GalleryPage.tsx` einbinden

```tsx
// App.tsx: Platzhalter-Komponente löschen, importieren
import GalleryPage from "./GalleryPage";

<Route index element={<GalleryPage />} />
```

## Aufgabe 4: Laden mit `useQuery`

```tsx
const { data, isPending, error } = useQuery({
  queryKey: ["characters", page],
  queryFn: () => fetchCharacters(page),
});

{isPending && <p>Lade …</p>}
{error && <p className="text-red-600">Keine Charaktere gefunden oder API nicht erreichbar.</p>}
```

Die Seitenzahl im `queryKey` sorgt dafür, dass jede Seite einen eigenen Cache-Eintrag erhält.

## Aufgabe 5: `CharacterCard` und Grid

```tsx
// CharacterCard.tsx (erste Fassung; Links und Favoriten folgen)
const CharacterCard = ({ character }: { character: Character }) => (
  <li className="flex flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm">
    <img src={character.image} alt={character.name} className="w-full rounded" />
    <h2 className="font-semibold">{character.name}</h2>
    <p className="text-sm text-gray-600">{character.status} · {character.species}</p>
  </li>
);

<ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
  {data.results.map((character) => (
    <CharacterCard key={character.id} character={character} />
  ))}
</ul>
```

## Aufgabe 6: Pagination

```tsx
const [page, setPage] = useState(1);

<button disabled={page <= 1} onClick={() => setPage(page - 1)}>Zurück</button>
<span>Seite {page} von {data.info.pages}</span>
<button disabled={page >= data.info.pages} onClick={() => setPage(page + 1)}>Weiter</button>
```

Erwartet (Checkpoint 1): 20 Karten, „Seite 1 von 42“ (Seitenzahl aus der API, kann sich ändern), „Zurück“ deaktiviert.

## Aufgabe 7: Statusfilter

```ts
// api.ts
export type StatusFilter = "" | "alive" | "dead" | "unknown";

export const fetchCharacters = async (page: number, status: StatusFilter): Promise<CharacterPage> => {
  const { data } = await api.get<CharacterPage>("/character", {
    params: { page, status: status || undefined },   // undefined: Parameter fehlt in der URL
  });
  return data;
};
```

```tsx
// GalleryPage.tsx
queryKey: ["characters", page, status],
queryFn: () => fetchCharacters(page, status),

<select value={status} onChange={handleStatusChange}>
  <option value="">Alle</option>
  <option value="alive">Alive</option>
  <option value="dead">Dead</option>
  <option value="unknown">Unknown</option>
</select>
```

Der Status gehört in den `queryKey`; sonst käme beim Filterwechsel derselbe Cache-Eintrag zurück. Der Filterwechsel setzt `page` auf 1, weil Seite 3 eines gefilterten Ergebnisses oft nicht existiert (API antwortet mit 404).

## Aufgabe 8: Seite und Status in der URL

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const page = Math.max(1, Number(searchParams.get("page")) || 1);
const status = parseStatus(searchParams.get("status"));

const showPage = (nextPage: number, nextStatus: StatusFilter) =>
  setSearchParams(nextStatus ? { page: String(nextPage), status: nextStatus } : { page: String(nextPage) });
```

`parseStatus` (in `api.ts`) lässt nur `alive`, `dead` und `unknown` durch; alles andere ergibt „alle“. Der State aus Aufgabe 6 (`useState`) entfällt.

## Aufgabe 9: Detailseite

```ts
// api.ts
export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
};
```

```tsx
// DetailPage.tsx
const { id = "" } = useParams();
const { data: character, isPending, error } = useQuery({
  queryKey: ["character", id],      // ID im Key: ein Cache-Eintrag pro Charakter
  queryFn: () => fetchCharacter(id),
});
```

## Aufgabe 10: Links mit Query-Parametern

```tsx
// CharacterCard.tsx
const { search } = useLocation();
<Link to={{ pathname: `/characters/${character.id}`, search }}>…</Link>

// DetailPage.tsx
<Link to={{ pathname: "/", search }}>← Zurück zur Galerie</Link>
```

`useLocation().search` enthält `?page=2&status=alive`; der Wert wandert zur Detailseite und zurück.

## Aufgabe 11: Context und Hook

```ts
// favorites-context.ts
export type FavoritesState = {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesState | null>(null);

export const useFavorites = (): FavoritesState => {
  const favorites = useContext(FavoritesContext);
  if (favorites === null) {
    throw new Error("useFavorites muss innerhalb von <FavoritesProvider> aufgerufen werden.");
  }
  return favorites;
};
```

## Aufgabe 12: Provider

```tsx
// FavoritesProvider.tsx
const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const isFavorite = (id: number) => favoriteIds.includes(id);
  const toggleFavorite = (id: number) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]));

  return <FavoritesContext value={{ favoriteIds, isFavorite, toggleFavorite }}>{children}</FavoritesContext>;
};
```

Der Provider steht oberhalb des Routers: Der State übersteht jeden Seitenwechsel innerhalb der App (ein Neuladen setzt ihn zurück).

## Aufgabe 13: `FavoriteButton`

```tsx
const FavoriteButton = ({ characterId }: { characterId: number }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(characterId);
  return (
    <button aria-pressed={active} onClick={() => toggleFavorite(characterId)} className="…">
      {active ? "★ Favorit" : "☆ Merken"}
    </button>
  );
};
```

`<FavoriteButton characterId={character.id} />` steht in `CharacterCard` und `DetailPage`.

## Aufgabe 14: Layout

```tsx
// Layout.tsx
const Layout = () => {
  const { favoriteIds } = useFavorites();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-green-700 px-6 py-3 text-white">
        <Link to="/" className="text-xl font-bold">Rick and Morty Explorer</Link>
        <span>Favoriten: {favoriteIds.length}</span>
      </header>
      <main className="mx-auto max-w-5xl p-6"><Outlet /></main>
    </div>
  );
};
```

## Aufgabe 15: Favoriten über Seitenwechsel

Erwartet: „Favoriten: 2“ bleibt nach „Weiter“, Detailseite und Zurück stehen; die Buttons der bereits markierten Charaktere zeigen „★ Favorit“.

## Aufgabe 16: Tailwind-Layout

Die Klassen stehen in den Dateien des Endstands: `bg-green-700` für die Kopfzeile, `rounded-lg border shadow-sm` für Karten, `mx-auto max-w-5xl` für zentrierten Inhalt, `hover:bg-gray-100` für Buttons. Andere Farben und Abstände sind gleichwertig.

## Aufgabe 17: Komponententest

```tsx
// src/playground/CharacterCard.test.tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { Character } from "../shared/character";
import CharacterCard from "./CharacterCard";
import FavoritesProvider from "./FavoritesProvider";

const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

// Die Karte braucht Router (Link) und Favoriten-Context: beide werden im Test bereitgestellt.
const renderCard = () =>
  render(
    <MemoryRouter initialEntries={["/?page=2&status=alive"]}>
      <FavoritesProvider>
        <ul>
          <CharacterCard character={rick} />
        </ul>
      </FavoritesProvider>
    </MemoryRouter>,
  );

describe("CharacterCard", () => {
  it("shows name, status and a link to the detail page", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: "Rick Sanchez" })).toBeInTheDocument();
    expect(screen.getByText("Alive · Human")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Rick Sanchez/ })).toHaveAttribute(
      "href",
      "/characters/1?page=2&status=alive",
    );
  });

  it("toggles the favorite state on click", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: "☆ Merken" }));
    expect(screen.getByRole("button", { name: "★ Favorit" })).toHaveAttribute("aria-pressed", "true");
  });
});
```

`MemoryRouter` ersetzt `BrowserRouter` im Test; der Start-Eintrag liefert Query-Parameter für den Link.

## Aufgabe 18: Ausführung

```text
 ✓ src/playground/CharacterCard.test.tsx (2 tests)
 Test Files  1 passed
      Tests  2 passed
```

## Alternativen

| Variante | Anmerkung |
| --- | --- |
| `retry: false` im `QueryClient` | zeigt Fehler wie 404 beim leeren Filter sofort statt nach mehreren Versuchen |
| `placeholderData: keepPreviousData` | vorige Seite bleibt beim Laden der nächsten sichtbar; „Weiter“ während des Ladens deaktivieren (`isPlaceholderData`) |
| Favoriten als komplette `Character`-Objekte | bequem für eine Favoritenliste, aber mehr Daten im State; IDs reichen für das Umschalten |
| Test mit `vi.mock("./api")` für die Galerie | Referenz: `GalleryPage.test.tsx` |

## Vollständige Dateien (Endstand)

```ts
// src/playground/api.ts
import axios from "axios";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL });

export type StatusFilter = "" | "alive" | "dead" | "unknown";

export const parseStatus = (value: string | null): StatusFilter =>
  value === "alive" || value === "dead" || value === "unknown" ? value : "";

export const fetchCharacters = async (page: number, status: StatusFilter): Promise<CharacterPage> => {
  const { data } = await api.get<CharacterPage>("/character", {
    params: { page, status: status || undefined },
  });
  return data;
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
};
```

```tsx
// src/playground/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { routerBasename } from "../launcher/router-basename";
import DetailPage from "./DetailPage";
import FavoritesProvider from "./FavoritesProvider";
import GalleryPage from "./GalleryPage";
import Layout from "./Layout";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter basename={routerBasename()}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<GalleryPage />} />
              <Route path="characters/:id" element={<DetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default App;
```

```tsx
// src/playground/GalleryPage.tsx
import type { ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import CharacterCard from "./CharacterCard";
import { fetchCharacters, parseStatus, type StatusFilter } from "./api";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "", label: "Alle" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = parseStatus(searchParams.get("status"));

  const { data, isPending, error, isPlaceholderData } = useQuery({
    queryKey: ["characters", page, status],
    queryFn: () => fetchCharacters(page, status),
    placeholderData: keepPreviousData,
  });

  const showPage = (nextPage: number, nextStatus: StatusFilter) =>
    setSearchParams(nextStatus ? { page: String(nextPage), status: nextStatus } : { page: String(nextPage) });

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    showPage(1, parseStatus(e.target.value));

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">
          Status{" "}
          <select className="rounded border px-2 py-1" value={status} onChange={handleStatusChange}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Keine Charaktere gefunden oder API nicht erreichbar.</p>}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="rounded border px-3 py-1 disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => showPage(page - 1, status)}
            >
              Zurück
            </button>
            <span>
              Seite {page} von {data.info.pages}
            </span>
            <button
              className="rounded border px-3 py-1 disabled:opacity-40"
              disabled={page >= data.info.pages || isPlaceholderData}
              onClick={() => showPage(page + 1, status)}
            >
              Weiter
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default GalleryPage;
```

```tsx
// src/playground/CharacterCard.tsx
import { Link, useLocation } from "react-router";
import type { Character } from "../shared/character";
import FavoriteButton from "./FavoriteButton";

const CharacterCard = ({ character }: { character: Character }) => {
  const { search } = useLocation();

  return (
    <li className="flex flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm">
      <Link to={{ pathname: `/characters/${character.id}`, search }} className="flex flex-col gap-2">
        <img src={character.image} alt={character.name} className="w-full rounded" />
        <h2 className="font-semibold">{character.name}</h2>
      </Link>
      <p className="text-sm text-gray-600">
        {character.status} · {character.species}
      </p>
      <FavoriteButton characterId={character.id} />
    </li>
  );
};

export default CharacterCard;
```

```tsx
// src/playground/DetailPage.tsx
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router";
import FavoriteButton from "./FavoriteButton";
import { fetchCharacter } from "./api";

const DetailPage = () => {
  const { id = "" } = useParams();
  const { search } = useLocation();

  const { data: character, isPending, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
  });

  return (
    <section>
      <Link to={{ pathname: "/", search }} className="text-blue-600 underline">
        ← Zurück zur Galerie
      </Link>

      {isPending && <p className="mt-4">Lade …</p>}
      {error && <p className="mt-4 text-red-600">Charakter nicht gefunden.</p>}

      {character && (
        <article className="mt-4 flex max-w-md flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm">
          <img src={character.image} alt={character.name} className="w-full rounded" />
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Spezies: {character.species}</p>
          <FavoriteButton characterId={character.id} />
        </article>
      )}
    </section>
  );
};

export default DetailPage;
```

```tsx
// src/playground/FavoriteButton.tsx
import { useFavorites } from "./favorites-context";

const FavoriteButton = ({ characterId }: { characterId: number }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(characterId);

  return (
    <button
      aria-pressed={active}
      onClick={() => toggleFavorite(characterId)}
      className={`rounded border px-3 py-1 text-sm ${
        active ? "border-yellow-500 bg-yellow-100" : "hover:bg-gray-100"
      }`}
    >
      {active ? "★ Favorit" : "☆ Merken"}
    </button>
  );
};

export default FavoriteButton;
```

```tsx
// src/playground/Layout.tsx
import { Link, Outlet } from "react-router";
import { useFavorites } from "./favorites-context";

const Layout = () => {
  const { favoriteIds } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-green-700 px-6 py-3 text-white">
        <Link to="/" className="text-xl font-bold">
          Rick and Morty Explorer
        </Link>
        <span>Favoriten: {favoriteIds.length}</span>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

Die Dateien `favorites-context.ts` und `FavoritesProvider.tsx` entsprechen den Aufgaben 11 und 12 (mit den Imports `createContext`, `useContext` bzw. `useState`, `ReactNode` aus `react` und `FavoritesContext` aus `./favorites-context`).

Referenz-App: `src/examples/m09-forms-and-testing/transfer/index.tsx`
