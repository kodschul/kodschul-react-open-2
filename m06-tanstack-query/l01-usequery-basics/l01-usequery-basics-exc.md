# Lab 6.1 – Übung: Galerie mit useQuery

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m06-l01-gallery-axios.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m06-l01-gallery-axios.tsx` nach `src/playground/App.tsx`. Der Starter entspricht der Lösung von Lab 5.3 (axios, Paging, `ignore`-Flag).
- Öffne die DevTools (Network-Tab, Filter **Fetch/XHR**). Blättere im Starter zuerst auf Seite 3 und zurück auf Seite 2: Jede Seite löst eine neue Anfrage aus.

## Aufgaben

1. Importiere `QueryClient`, `QueryClientProvider` und `useQuery` aus `@tanstack/react-query`.
2. Benenne die Komponente `App` in `Gallery` um. Lege außerhalb der Komponente einen `QueryClient` an und exportiere eine neue `App`, die `Gallery` in einem `QueryClientProvider` rendert.
3. Lege eine Funktion `fetchCharacters(page)` an, die nur den axios-Request ausführt und `response.data` zurückgibt.
4. Ersetze die State-Variablen `characters`, `isLoading` und `error` sowie den gesamten `useEffect` durch einen `useQuery`-Aufruf mit `queryKey: ["characters", page]` und `queryFn`.
5. Passe die Anzeige an: „Lade …“ bei `isPending`, die Fehlermeldung aus `error.message`, die Karten aus `data?.results`.
6. Entferne ungenutzte Importe (`useEffect`, `Character`).
7. Blättere von Seite 1 auf Seite 3 und zurück auf Seite 1. Beobachte Anzeige und Network-Tab: Welche Rückwege lösen eine Anfrage aus?
8. Ergänze in `useQuery` die Option `staleTime: 60_000` und wiederhole das Blättern aus Aufgabe 7.
9. Zeige in einer Zeile `isPending`, `isLoading` und `isFetching` an (`String(…)`) und beobachte die Werte beim ersten Besuch einer Seite und beim Zurückblättern.
10. Setze den Pfad in `fetchCharacters` testweise auf `"/character-"` und beobachte, wann der Fehler erscheint. Stelle den Pfad danach wieder her.
11. Vergleiche die Zeilenzahl der Lade-Logik (State + Effekt bzw. `useQuery`) vor und nach dem Umbau.

## Checkpoint

- Die Galerie zeigt dieselben Karten und Buttons wie in Lab 5.3; die Datei enthält keinen `useEffect` mehr.
- Ohne `staleTime` zeigt „Zurück“ die Seite sofort, der Network-Tab zeigt aber eine Hintergrund-Anfrage.
- Mit `staleTime: 60_000` löst „Zurück“ auf eine besuchte Seite keine Anfrage aus.
- Beim ersten Besuch einer Seite zeigt die Statuszeile `isPending: true · isLoading: true`, beim Zurückblättern `false`.
- Mit falschem Pfad erscheint die Fehlermeldung erst nach mehreren Sekunden (automatische Wiederholungen).

## Abschlusskriterien

- Der `queryKey` ist das Array `["characters", page]`.
- Der `QueryClient` ist außerhalb der Komponente angelegt.
- Pfad und `staleTime` stehen wieder auf den Sollwerten.

## Fallback

Ist `rickandmortyapi.com` nicht erreichbar, lässt sich das Zurückblättern nicht prüfen: `public/characters-page-1.json` enthält nur Seite 1. Ersetze zur Kontrolle von `useQuery` den axios-Request durch `fetch("/characters-page-1.json")` mit `response.json()`; Aufgaben 1 bis 6 und 9 funktionieren damit.
