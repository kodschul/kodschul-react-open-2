# Lab 7.1 – Übung: Mini-App mit BrowserRouter

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx` (und eigene Dateien daneben, z. B. `src/playground/todo-app.tsx`)
**Starter:** `src/starters/m07-l01-router-start.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m07-l01-router-start.tsx` nach `src/playground/App.tsx`. Der Starter zeigt Platzhalter-Seiten untereinander.
- Die eigenen Lösungen aus Tag 1 (Todo-App aus Lab 2.4, Countdown aus Lab 3.4) und die Galerie aus Lab 5.3 liegen bereit, z. B. in Git, im Editor-Verlauf oder in früheren Dateien. Fehlt eine Lösung, bleibt der Platzhalter bestehen.

## Aufgaben

1. Öffne `http://localhost:5173/playground` und notiere, was die Seite zeigt: Alle Platzhalter stehen untereinander, die URL bleibt immer gleich.
2. Lege die vorhandenen eigenen Lösungen als Dateien neben `App.tsx` ab: `src/playground/todo-app.tsx`, `src/playground/countdown-app.tsx`, `src/playground/characters-app.tsx`. Jede Datei hat einen `export default`.
3. Importiere in `src/playground/App.tsx` `BrowserRouter`, `Link`, `Routes` und `Route` aus `react-router` sowie `routerBasename` aus `../launcher/router-basename`.
4. Umschließe den Inhalt der App mit `<BrowserRouter basename={routerBasename()}>`.
5. Baue eine Navigation aus `Link`-Elementen zu `/`, `/todo`, `/countdown` und `/characters`.
6. Ersetze die untereinander gestapelten Seiten durch `Routes` mit je einer `Route` pro Pfad. Binde statt der Platzhalter die eigenen Apps aus Aufgabe 2 ein.
7. Ergänze eine `Route` mit dem Pfad `*` für unbekannte Adressen.
8. Füge in `App` einen Zähler-Button mit State hinzu (`Zähler: n`) und darunter eine zweite Navigation aus `<a href>`-Elementen zu `/todo` und `/characters`. Der `href` beginnt mit `routerBasename()`.
9. Erhöhe den Zähler, klicke einen `Link` und danach einen `<a href>`-Eintrag. Vergleiche den Zähler nach beiden Klicks.
10. Aktiviere im Network-Tab **Preserve log**, wiederhole Aufgabe 9 und vergleiche die Einträge beider Klicks.
11. Öffne `http://localhost:5173/playground/todo` direkt in einem neuen Tab und danach `http://localhost:5173/playground/gibt-es-nicht`.

## Checkpoint

- Ein Klick auf einen `Link` ändert die URL (z. B. `/playground/todo`) und zeigt die passende App ohne Neuladen.
- Der Zähler bleibt nach `Link`-Klicks erhalten und steht nach einem `<a href>`-Klick wieder auf `0`.
- Der Network-Tab zeigt beim `<a href>`-Klick eine neue Dokument-Anfrage (Typ `document`), beim `Link`-Klick keine.
- Die Direkt-URL `/playground/todo` zeigt sofort die Todo-Seite; die unbekannte Adresse zeigt die `*`-Seite.
- Der Zurück-Button des Browsers wechselt zwischen den zuvor besuchten Seiten.

## Abschlusskriterien

- Alle Importe stammen aus `react-router`.
- Jede Seite ist über ihre URL erreichbar, die Navigation läuft über `Link`.
- Die Gegenüberstellung `Link` / `<a href>` ist sichtbar und mit dem Zähler belegt.

## Fallback

Liegen die eigenen Tag-1-Apps nicht vor, bleiben die Platzhalter-Komponenten aus dem Starter in den Routen; die Aufgaben 3 bis 11 funktionieren damit unverändert.
