# Lab 7.3 – Lösung: Route-Objekte, Layout und Loader

## Aufgabe 1: Ausgangslage

Der Klick auf eine Karte zeigt die Detailseite sofort; „Lade …“ erscheint kurz, danach die Daten. Es gibt weder Kopfzeile noch gemeinsames Layout.

## Aufgabe 2 und 3: Layout und HomePage

```tsx
import { Link, Outlet } from "react-router";

const Layout = () => (
  <div className="p-8">
    <header className="mb-6 flex gap-4 border-b pb-3">
      <Link className="text-blue-600 underline" to="/">Start</Link>
      <Link className="text-blue-600 underline" to="/characters">Charaktere</Link>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

const HomePage = () => <h1 className="text-3xl font-bold">Rick and Morty Explorer</h1>;
```

Der Starter umschloss die Seiten mit `<main className="p-8">`; diese Hülle entfällt, weil `Layout` sie übernimmt.

## Aufgabe 4 und 5: Route-Objekte und Router

```tsx
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "characters",
        children: [
          { index: true, Component: CharactersPage },
          { path: ":id", Component: CharacterDetailPage },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: routerBasename() });
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
```

| Entscheidung | Begründung |
| ------------ | ---------- |
| Router außerhalb der Komponente | Er soll nicht bei jedem Render neu entstehen |
| `path: "characters"` ohne führenden `/` | Kindpfade sind relativ zur Elternroute `/` |
| `index: true` | Standardseite der Elternroute (`/` bzw. `/characters`) |
| `QueryClientProvider` um den `RouterProvider` | Die Seiten nutzen `useQuery` |

## Aufgabe 6: Navigation

Die Kopfzeile bleibt bei Start, Galerie und Detailseite stehen; nur der Inhalt im `<Outlet />` wechselt.

## Aufgabe 7 bis 9: Loader

```tsx
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

const characterLoader = ({ params }: LoaderFunctionArgs) => fetchCharacter(params.id ?? "");

const CharacterDetailLoaderPage = () => {
  const character = useLoaderData<typeof characterLoader>();

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">← Zurück zur Galerie</Link>
      <h1 className="mt-4 mb-2 text-3xl font-bold">{character.name}</h1>
      <img className="mb-2 h-64 w-64 rounded object-cover" src={character.image} alt={character.name} width={256} height={256} />
      <p>Status: {character.status}</p>
    </section>
  );
};

// Route:
{ path: ":id", loader: characterLoader, Component: CharacterDetailLoaderPage }
```

`useLoaderData<typeof characterLoader>()` leitet den Typ aus dem Loader ab: `character` ist ein `Character`, nie `undefined`.

## Aufgabe 10 und 11: Vergleich mit SLOW_DEMO

```tsx
// DEMO-SCHALTER: true simuliert ein langsames Netz (2 Sekunden Verzögerung pro Anfrage).
const SLOW_DEMO = true;

const fetchCharacter = async (id: string): Promise<Character> => {
  if (SLOW_DEMO) await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};
```

| Variante | Beobachtung nach dem Klick |
| -------- | -------------------------- |
| mit `loader` | Galerie bleibt 2 s stehen, dann Wechsel auf die fertige Detailseite |
| ohne `loader` (`useQuery`) | sofortiger Wechsel, 2 s „Lade …“ in der Detailseite |

Der Loader und `fetchCharacter` teilen sich die Verzögerung, weil der Loader `fetchCharacter` aufruft.

## Aufgabe 12: Vergleich in zwei Sätzen

```tsx
// Erst Seite, dann Daten (useQuery): Die Detailseite erscheint sofort und zeigt „Lade …“; das fühlt sich schnell an, die Seite ist aber zunächst leer.
// Erst Daten, dann Seite (loader): Die Seite erscheint fertig, davor steht die alte Seite 2 s ohne Rückmeldung; das wirkt ruhiger, aber träge.
```

## Aufgabe 13: Schalter zurücksetzen

```tsx
const SLOW_DEMO = false;
```

Referenz-App: `src/examples/m07-react-router/l03-layouts-route-objects-loader/index.tsx` (Vergleichsvariante mit `useQuery`: `app-query-detail.tsx`)
