# Cheatsheet: React Router

## Einrichtung und Importe

| Syntax | Wirkung |
| ------ | ------- |
| `npm install react-router` | Paket installieren (Version 8; im Kurs-Repo vorhanden) |
| `import { … } from "react-router";` | alle Importe aus `react-router` (`react-router-dom` entfällt ab Version 8) |
| `<BrowserRouter basename={routerBasename()}>` | Router mit echten URLs; `basename` nur im Kurs-Repo nötig |
| `createBrowserRouter(routes, { basename })` | Router aus Route-Objekten |
| `<RouterProvider router={router} />` | rendert den Router |

## Routen und Navigation (JSX)

| Syntax | Wirkung |
| ------ | ------- |
| `<Routes>…</Routes>` | wählt die passende `Route` |
| `<Route path="/todo" element={<TodoPage />} />` | Pfad → Komponente |
| `<Route path="*" element={<NotFound />} />` | passt auf alles Übrige |
| `<Route path="/characters/:id" element={…} />` | dynamische Route mit Parameter `id` |
| `<Navigate to="/characters" replace />` | leitet auf einen anderen Pfad weiter |
| `<Link to="/todo">Todo</Link>` | Link ohne Neuladen der Seite |
| `<a href="/todo">` | lädt die ganze Seite neu (State geht verloren) |

## Parameter und Query-Parameter

| Syntax | Wirkung |
| ------ | ------- |
| `const { id } = useParams();` | Routen-Parameter lesen (String oder `undefined`) |
| `const { id = "" } = useParams();` | Standardwert für einen einfachen Typ |
| `const [searchParams, setSearchParams] = useSearchParams();` | Query-Parameter lesen und schreiben |
| `searchParams.get("page")` | Wert als String oder `null` |
| `Number(searchParams.get("page")) \|\| 1` | Seite als Zahl, Standard `1` |
| `setSearchParams({ page: "3" })` | URL wird `?page=3` |
| ``<Link to={`/characters/${id}?page=${page}`}>`` | Query-Parameter im Link mitgeben |
| `useLocation()` + `new URLSearchParams(location.search)` | ältere Schreibweise für Query-Parameter |

## Route-Objekte, Layout, Loader

| Syntax | Wirkung |
| ------ | ------- |
| `const routes: RouteObject[] = [{ path, Component }]` | Routen als Daten |
| `{ path: "characters", children: [...] }` | geschachtelte Routen, Kindpfade relativ zum Elternpfad |
| `{ index: true, Component: HomePage }` | Standardseite der Elternroute |
| `{ path: "/", Component: Layout, children: [...] }` | Layout als Elternroute |
| `<Outlet />` | Platz im Layout für die passende Kindroute |
| `{ path: ":id", loader: characterLoader }` | Loader läuft vor dem Rendern der Route |
| `({ params }: LoaderFunctionArgs) => …` | Loader-Funktion; `params.id` enthält den Pfadparameter |
| `useLoaderData<typeof characterLoader>()` | Rückgabe des Loaders in der Komponente |
| `useNavigation().state` | `"idle"`, `"loading"` oder `"submitting"` während eines Wechsels |

## Link und a href im Vergleich

| Merkmal | `Link` | `<a href>` |
| ------- | ------ | ---------- |
| Neuladen der Seite | nein | ja |
| App-State bleibt erhalten | ja | nein |
| Network-Tab | keine Dokument-Anfrage | neue Dokument-Anfrage |
| `basename` | wird ergänzt | muss im `href` stehen |

## Ältere Schreibweisen

| Älterer Code | Heute |
| ------------ | ----- |
| `import … from "react-router-dom"` | `import … from "react-router"` |
| `<Switch>` | `<Routes>` |
| `<Route component={Home} exact>` | `<Route element={<Home />} />` |
| `props.match.params.id` | `useParams()` |
