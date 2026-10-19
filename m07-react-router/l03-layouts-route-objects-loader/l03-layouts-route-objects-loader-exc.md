# Lab 7.3 – Übung: Route-Objekte, Layout und Loader

**Dauer:** ca. 25 Minuten (Erweiterung; als Übung in der 3-Tage-Variante)
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m07-l03-routes-start.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground/characters` erreichbar.
- Kopiere `src/starters/m07-l03-routes-start.tsx` nach `src/playground/App.tsx`. Der Starter ist Lab 7.2 in einer Datei: `BrowserRouter`, `Routes`, Galerie, Detailseite per `useQuery`.
- Öffne die DevTools (Network-Tab).

## Aufgaben

1. Öffne `http://localhost:5173/playground/characters`, klicke eine Karte an und beobachte das Verhalten als Ausgangslage.
2. Lege die Komponente `Layout` an: eine Kopfzeile mit `Link`-Elementen zu `/` und `/characters` und darunter `<Outlet />` (aus `react-router`).
3. Lege die Komponente `HomePage` mit einer Überschrift an.
4. Schreibe die Routen als Array `routes: RouteObject[]`: eine Elternroute `/` mit `Component: Layout` und `children`. Darin: eine Index-Route mit `HomePage` und die Route `characters` mit zwei Kindern, Index (`CharactersPage`) und `:id` (`CharacterDetailPage`).
5. Ersetze `BrowserRouter` und `Routes` durch `createBrowserRouter(routes, { basename: routerBasename() })` und `RouterProvider`. Lege den Router außerhalb der Komponente an; der `QueryClientProvider` bleibt um den `RouterProvider`.
6. Prüfe die Navigation zwischen Start, Galerie und Detailseite: Das Layout bleibt beim Wechsel stehen.
7. Lege die Funktion `characterLoader({ params })` an, die den Charakter zu `params.id` lädt (axios, wie `fetchCharacter`).
8. Lege die Komponente `CharacterDetailLoaderPage` an, die den Charakter mit `useLoaderData` liest. Behalte `CharacterDetailPage` (mit `useQuery`) unverändert.
9. Setze an der Route `:id` den `loader` und `Component: CharacterDetailLoaderPage`.
10. Ergänze die Konstante `SLOW_DEMO` (Wert `true`) und lasse die Detail-Anfrage bei gesetztem Schalter 2 Sekunden warten (in `fetchCharacter` und im Loader). Klicke eine Karte an und beobachte Galerie, URL und Detailseite.
11. Stelle die Route `:id` testweise wieder auf `CharacterDetailPage` (ohne `loader`) und wiederhole den Klick aus Aufgabe 10.
12. Formuliere als Kommentar über `routes` zwei Sätze: „erst Seite, dann Daten“ gegen „erst Daten, dann Seite“.
13. Setze `SLOW_DEMO` auf `false`.

## Checkpoint

- Start, Galerie und Detailseite teilen die Kopfzeile aus `Layout`; sie bleibt beim Seitenwechsel stehen.
- Mit Loader und `SLOW_DEMO` bleibt die Galerie 2 Sekunden stehen, danach erscheint die fertige Detailseite.
- Ohne Loader erscheint die Detailseite sofort und zeigt 2 Sekunden „Lade …“.
- `CharacterDetailLoaderPage` enthält weder `useQuery` noch `isPending`.

## Abschlusskriterien

- `createBrowserRouter` nimmt ein Array von Route-Objekten mit `children` und `index` entgegen.
- Das Layout ist eine Elternroute mit `<Outlet />`, nicht in jeder Seite wiederholt.
- Der Loader liest die ID aus `params`.
- Der Kommentar enthält den Vergleich in zwei Sätzen.

## Fallback

Ist die API nicht erreichbar, lassen sich Aufgaben 2 bis 6 mit der Galerie aus `public/characters-page-1.json` bearbeiten (`queryFn` auf `fetch("/characters-page-1.json")`); Loader und Detailseite benötigen die API.
