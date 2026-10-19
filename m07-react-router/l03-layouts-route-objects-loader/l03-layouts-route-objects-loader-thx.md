# Lab 7.3: Layouts, Route-Objekte und Loader

**Leitfragen:**

<details>
<summary>Was ist angenehmer für Nutzende: Ladeanzeige auf der Seite oder Warten vor dem Seitenwechsel?</summary>

Eine Ladeanzeige gibt sofort Rückmeldung, die Seite wirkt reaktionsschnell. Das Warten vor dem Seitenwechsel zeigt nie eine halbfertige Seite, wirkt aber ohne eigene Anzeige (z. B. über `useNavigation`) wie ein hängender Klick.

</details>

<details>
<summary>Wo liegen Routen in größeren Projekten?</summary>

In eigenen Dateien pro Bereich (z. B. `characters/routes.tsx`). Eine zentrale Datei setzt sie als `children` zu einem Router zusammen.

</details>

- Route-Objekte beschreiben die Routen als Daten statt als JSX; `createBrowserRouter` macht daraus einen Router.
- Geschachtelte Routen teilen ein Layout; ein `loader` lädt Daten vor dem Rendern.

## Route-Objekte mit createBrowserRouter

Bisher stand die Routenliste als JSX in `<Routes>`. Dieselbe Liste lässt sich als Array von Objekten schreiben und an einen Router übergeben.

```tsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import { routes } from "./routes";

const router = createBrowserRouter(routes, { basename: routerBasename() });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
```

| Feld im Route-Objekt | Bedeutung | JSX-Entsprechung |
| -------------------- | --------- | ---------------- |
| `path` | Pfadteil dieser Route | `<Route path>` |
| `Component` | Komponente der Route | `<Route Component>` / `element` |
| `children` | geschachtelte Routen | verschachtelte `<Route>` |
| `index: true` | Standardseite der Elternroute | `<Route index>` |
| `loader` | Funktion, die vor dem Rendern Daten lädt | – (nur bei Route-Objekten) |

## Geschachtelte Routen und Layout mit Outlet

Eine Elternroute mit `Component` und `children` bildet ein Layout. Das Layout bleibt stehen, `<Outlet />` zeigt die passende Kindroute.

```tsx
// Layout.tsx
import { Link, Outlet } from "react-router";

const Layout = () => (
  <div className="p-8">
    <header className="mb-6 flex gap-4 border-b pb-3">
      <Link to="/">Start</Link>
      <Link to="/characters">Charaktere</Link>
    </header>
    <main>
      <Outlet /> {/* hier erscheint die Kindroute */}
    </main>
  </div>
);
```

```tsx
// routes.tsx
import type { RouteObject } from "react-router";

// Routen als Daten: Das Layout ist die Elternroute, alle Seiten sind children.
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage }, // index = Standardseite der Elternroute (/)
      {
        path: "characters",
        children: [
          { index: true, Component: CharactersPage }, // /characters
          { path: ":id", loader: characterLoader, Component: CharacterDetailLoaderPage }, // /characters/1
        ],
      },
    ],
  },
];
```

| URL | Gerenderte Routen | Im `<Outlet />` |
| --- | ----------------- | --------------- |
| `/` | Layout → Index | `HomePage` |
| `/characters` | Layout → `characters` → Index | `CharactersPage` |
| `/characters/1` | Layout → `characters` → `:id` | `CharacterDetailLoaderPage` |

- Kindpfade sind relativ zum Elternpfad: `"characters"` unter `"/"` ergibt `/characters`.
- Die Route `characters` hat keine eigene `Component`; sie gruppiert nur Pfad und Kinder.
- Ältere Layouts umschlossen `<Routes>` von Hand mit Header und Footer. Das Layout als Elternroute gilt dort nur für die gewünschten Seiten.

## loader und useLoaderData

Ein `loader` läuft, bevor die Route rendert. Seine Rückgabe liest die Komponente mit `useLoaderData`.

```ts
// loader.ts
import type { LoaderFunctionArgs } from "react-router";

// Der Loader läuft vor dem Rendern der Route; params enthält die Werte aus dem Pfad (:id).
export const characterLoader = ({ params }: LoaderFunctionArgs) =>
  fetchCharacterDemo(params.id ?? "");
```

```tsx
// CharacterDetailLoaderPage.tsx
import { Link, useLoaderData } from "react-router";
import type { characterLoader } from "./loader";

// Die Daten sind beim Rendern schon da: kein isPending, kein eigener Ladezustand.
const CharacterDetailLoaderPage = () => {
  const character = useLoaderData<typeof characterLoader>();

  return (
    <section>
      <Link to="/characters">← Zurück zur Galerie</Link>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={256} height={256} />
    </section>
  );
};
```

| Aspekt | `useQuery` in der Seite (Lab 7.2) | `loader` an der Route |
| ------ | --------------------------------- | --------------------- |
| Ablauf | erst Seite, dann Daten | erst Daten, dann Seite |
| Während des Ladens | Seite sichtbar mit „Lade …“ | alte Seite bleibt stehen, URL wechselt erst danach sichtbar |
| Ladezustand in der Komponente | `isPending`, `error` | nicht nötig; Daten sind immer da |
| Cache | von TanStack Query | keiner (jeder Besuch lädt neu) |
| Fehler | `error` im Component | `errorElement` an der Route |

## Vergleich im Demo-Schalter

`loader.ts` enthält den Schalter `SLOW_DEMO` (Standard `false`). Mit `true` verzögert jede Detail-Anfrage um 2 Sekunden. Zwei Varianten im Launcher, beide mit demselben Layout:

| App | Detailseite | Beobachtung bei Klick auf eine Karte (`SLOW_DEMO = true`) |
| --- | ----------- | --------------------------------------------------------- |
| `index.tsx` | `loader` | 2 s lang bleibt die Galerie stehen, danach erscheint die fertige Detailseite |
| `app-query-detail.tsx` | `useQuery` | die Detailseite erscheint sofort, 2 s lang mit „Lade …“ |

Der Vorteil des Loaders liegt darin, dass Seite und Daten zusammen erscheinen; sein Preis ist die Wartezeit ohne Rückmeldung. `useNavigation().state` (`"loading"` während des Wartens) erlaubt eine globale Ladeanzeige im Layout.

## Routen in größeren Projekten

```text
src/
  routes.tsx                  # setzt alle Bereiche zusammen
  layouts/Layout.tsx
  characters/
    routes.tsx                # export const characterRoutes: RouteObject[]
    CharactersPage.tsx
    CharacterDetailPage.tsx
```

```tsx
const router = createBrowserRouter([
  { path: "/", Component: Layout, children: [{ path: "characters", children: characterRoutes }] },
]);
```

> **Merksatz:** Der `loader` verschiebt das Warten vor den Seitenwechsel; `useQuery` lässt die Seite sofort erscheinen.

## Fazit

- `createBrowserRouter` + `RouterProvider` nehmen Route-Objekte entgegen; `children` und `index` bilden die Struktur.
- Ein Layout ist eine Elternroute mit `<Outlet />`; Navigation und Rahmen bleiben beim Seitenwechsel stehen.
- `loader` + `useLoaderData` laden vor dem Rendern; die Wahl zwischen Loader und `useQuery` ist eine Wahl zwischen „erst Daten, dann Seite“ und „erst Seite, dann Daten“.

Die Übung stellt Lab 7.2 auf Route-Objekte mit Layout und Loader um und vergleicht beide Ladearten.
