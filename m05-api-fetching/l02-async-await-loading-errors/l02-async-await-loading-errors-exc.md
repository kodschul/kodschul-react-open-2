# Lab 5.2 – Übung: Galerie mit async/await, Ladezustand und Fehler

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m05-l02-gallery-then.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m05-l02-gallery-then.tsx` nach `src/playground/App.tsx`. Der Starter entspricht der Lösung von Lab 5.1.
- Öffne die DevTools (Network-Tab, Filter **Fetch/XHR**).

## Aufgaben

1. Lege die Konstante `ENDPOINT` mit dem Wert `"/character"` an und baue die URL im `fetch` daraus zusammen.
2. Ersetze die `.then`-Kette durch eine `async`-Funktion innerhalb von `useEffect`, die mit `await` arbeitet. Rufe die Funktion im Effekt auf.
3. Fasse die Anfrage in `try/catch/finally` ein.
4. Prüfe nach dem `fetch` den Wert `response.ok`. Wirf bei `false` einen `Error` mit dem Statuscode.
5. Lege die States `isLoading` (Startwert `true`) und `error` (Startwert `null`) an. Setze `isLoading` im `finally` auf `false` und `error` im `catch` auf die Fehlermeldung.
6. Zeige „Lade …“, solange `isLoading` gilt, und eine rote Fehlermeldung, sobald `error` gesetzt ist.
7. Ändere `ENDPOINT` auf `"/character-"` (Fehlerfall) und beobachte die Seite. Lies im Network-Tab den Status der Anfrage ab.
8. Kommentiere testweise die `response.ok`-Prüfung aus und beobachte Seite und Konsole. Stelle die Prüfung wieder her und setze `ENDPOINT` zurück auf `"/character"`.
9. Wähle im Network-Tab im Drosselungs-Menü **Slow 4G**, lade die Seite neu und beobachte die drei Zustände.

## Checkpoint

- Mit gültiger URL erscheint kurz „Lade …“, danach die Galerie mit 20 Charakteren.
- Mit `"/character-"` zeigt die Seite „Fehler beim Laden: HTTP 404“ und keine Galerie; der Network-Tab zeigt Status `404`.
- Ohne `response.ok`-Prüfung stürzt die Seite ab; die Konsole zeigt einen `TypeError` zu `map`.
- Unter **Slow 4G** bleibt „Lade …“ sichtbar, bis die Galerie erscheint.

## Abschlusskriterien

- Kein `.then` mehr im Code; der Effekt ruft eine `async`-Funktion auf.
- `isLoading` endet in `finally`, `error` wird im `catch` gesetzt.
- Die Galerie hat drei sichtbare Zustände: lädt, Fehler, Daten.
- `ENDPOINT` steht wieder auf `"/character"`.

## Erweiterung (optional)

Unterscheide die Fehlermeldungen: Bei Status `404` zeigt die Seite „Nichts gefunden“, bei anderen Statuscodes „Serverfehler“ und bei Netzwerkproblemen „Keine Verbindung“. Teste „Keine Verbindung“ mit **Offline** im Drosselungs-Menü.

## Fallback

Ist `rickandmortyapi.com` nicht erreichbar, nutze `"/characters-page-1.json"` als vollständige URL statt `${API_BASE_URL}${ENDPOINT}` (Datei in `public/`, nur Seite 1). Der Fehlerfall `404` lässt sich dann nicht prüfen; als Ersatz dient **Offline** im Drosselungs-Menü, das den `catch`-Block auslöst.
