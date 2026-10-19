# Lab 5.1 – Übung: Charakter-Galerie mit fetch

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m05-l01-gallery.tsx`

## Vorbereitung

- Der Dev-Server läuft (`npm run dev`), der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m05-l01-gallery.tsx` nach `src/playground/App.tsx`.
- Öffne die DevTools des Browsers (`F12`).

## Aufgaben

1. Öffne `https://rickandmortyapi.com/api/character` in einem neuen Browser-Tab und notiere die Namen der Felder, die `results[0]` enthält.
2. Ergänze in `src/playground/App.tsx` den Import von `useEffect` und `API_BASE_URL` (aus `../shared/character`) und hole den Setter aus `useState`.
3. Starte im `useEffect` mit leerem Dependency-Array eine Anfrage an `${API_BASE_URL}/character` mit `fetch`.
4. Werte die Antwort mit `.then` aus: erst `response.json()`, dann `setCharacters` mit dem Feld `results`. Ergänze `.catch` mit einer `console.error`-Ausgabe.
5. Rendere im Grid pro Charakter ein `<img>` (Quelle `image`, Beschreibung `name`) und den Namen. Setze das `key`-Attribut.
6. Schreibe `console.log("Render:", characters.length)` direkt vor das `return` und beobachte die Konsole.
7. Öffne den Network-Tab, filtere auf **Fetch/XHR**, lade die Seite neu und untersuche die Anfrage `character`: Status, Reiter **Response**, Anzahl der Anfragen.

## Checkpoint

- Die Seite zeigt 20 Charaktere mit Bild und Name; die Zeile „20 Charaktere geladen“ stimmt.
- Die Konsole zeigt zuerst `Render: 0`, danach `Render: 20`.
- Der Network-Tab zeigt Status `200` und im Reiter **Response** das JSON mit `info` und `results`.
- Die Konsole zeigt keine `key`-Warnung.

## Abschlusskriterien

- `fetch` steht in `useEffect(..., [])`, nicht im Render.
- Die Liste ist als `Character[]` getypt, Antwort als `CharacterPage`.
- Jedes Listenelement hat ein `key`.

## Erweiterung (optional)

Ergänze einen Button „Neu laden“, der dieselbe Anfrage per Klick startet. Nutze dafür einen Event-Handler statt `useEffect`.

## Fallback

Ist `rickandmortyapi.com` nicht erreichbar, ersetze `${API_BASE_URL}/character` durch `"/characters-page-1.json"`. Die Datei `public/characters-page-1.json` liefert dieselbe Struktur (`info`, `results`), aber nur Seite 1; Paging und Detailseiten funktionieren damit nicht.
