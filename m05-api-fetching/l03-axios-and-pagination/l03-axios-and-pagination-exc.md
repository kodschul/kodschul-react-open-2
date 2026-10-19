# Lab 5.3 – Übung: Blätterbare Galerie mit axios

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m05-l03-gallery-async.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m05-l03-gallery-async.tsx` nach `src/playground/App.tsx`. Der Starter entspricht der Lösung von Lab 5.2.
- Öffne die DevTools (Network-Tab, Filter **Fetch/XHR**).

## Aufgaben

1. Importiere `axios` und lege mit `axios.create` eine Instanz `api` mit `baseURL: API_BASE_URL` und einem `timeout` von 10 Sekunden an.
2. Ersetze `fetch`, die `response.ok`-Prüfung und `response.json()` durch `api.get<CharacterPage>("/character")`. Lies die Charaktere aus `response.data.results`.
3. Ändere den Pfad testweise auf `"/character-"` und lies die Fehlermeldung ab. Stelle den Pfad danach wieder her.
4. Lege den State `page` (Startwert `1`) an und übergib ihn über die Option `params`. Nimm `page` ins Dependency-Array auf.
5. Setze zu Beginn der `async`-Funktion `isLoading` auf `true` und `error` auf `null`, damit jeder Seitenwechsel wieder „Lade …“ zeigt.
6. Ergänze die Buttons „Zurück“ und „Weiter“ und die Anzeige „Seite N“. Deaktiviere „Zurück“ auf Seite 1.
7. Klicke durch einige Seiten und prüfe im Network-Tab die URL der Anfragen.
8. Lege eine Konstante `SLOW_DEMO` (Wert `true`) an und warte bei gesetztem Schalter 2 Sekunden vor der Anfrage. Klicke nach dem Laden dreimal schnell auf „Weiter“ und beobachte Seitenzahl und Inhalt.
9. Ergänze im Effekt ein `ignore`-Flag, das im Cleanup auf `true` gesetzt wird. Verwirf damit Antworten veralteter Durchläufe (in `try`, `catch` und `finally`). Wiederhole den Klicktest aus Aufgabe 8.
10. Setze `SLOW_DEMO` auf `false`.

## Checkpoint

- Der Network-Tab zeigt `character?page=2`, `character?page=3` usw.
- „Zurück“ ist auf Seite 1 deaktiviert; die Seitenzahl wächst und sinkt mit den Klicks.
- Mit dem Pfad `"/character-"` zeigt die Seite eine axios-Fehlermeldung zu Status 404 (ohne eigene `ok`-Prüfung).
- Vor Aufgabe 9 zeigt die Galerie bei schnellem Klicken nacheinander ältere Seiten unter der aktuellen Seitenzahl; nach Aufgabe 9 erscheint nur die Seite der letzten Auswahl.

## Abschlusskriterien

- Kein `fetch` und keine `response.ok`-Prüfung mehr; die Anfrage läuft über die Instanz `api`.
- `page` steht im Dependency-Array des Effekts, nicht in einem Klick-Handler mit eigenem `fetch`.
- Der Effekt hat einen Cleanup mit `ignore`-Flag.
- Jedes Listenelement hat ein `key`.

## Erweiterung (optional)

Ergänze einen Filter nach Status: eine Auswahl mit „alle“, `alive` und `dead`. Übergib den Wert als `status` in `params`, nimm ihn ins Dependency-Array auf und springe bei einem Wechsel zurück auf Seite 1. Zeige zusätzlich „Seite N von M“ und deaktiviere „Weiter“ auf der letzten Seite (`info.pages` aus der Antwort).

## Fallback

Ist `rickandmortyapi.com` nicht erreichbar, lässt sich das Paging nicht üben: `public/characters-page-1.json` enthält nur Seite 1. Ersetze zur Kontrolle von axios `baseURL` durch `window.location.origin` und den Pfad durch `"/characters-page-1.json"`; Aufgaben 1 bis 3 funktionieren damit, Aufgaben 4 bis 9 benötigen die API.
