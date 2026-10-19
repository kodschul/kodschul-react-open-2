# Cheatsheet: Daten laden mit fetch und axios

## fetch

| Syntax | Wirkung |
| ------ | ------- |
| `fetch(url)` | startet eine `GET`-Anfrage, gibt ein Promise zurück |
| `.then((response) => response.json())` | liest den Body als JSON (zweites Promise) |
| `.catch((error) => …)` | fängt nur Netzwerkfehler, keine HTTP-Statuscodes |
| `response.ok` | `true` bei Status 200–299, sonst `false` |
| `response.status` | Statuscode, z. B. `200`, `404` |
| `fetch(url, { method: "POST" })` | andere HTTP-Methode |
| `headers: { "Content-Type": "application/json" }` | Header mitsenden |
| `body: JSON.stringify(objekt)` | Daten senden (Body ist ein String) |
| `mode: "cors"` | CORS-Verhalten für fremde Domains |

## Promise und async/await

| Syntax | Wirkung |
| ------ | ------- |
| `new Promise<void>((resolve) => setTimeout(resolve, ms))` | eigenes Promise, löst nach `ms` auf |
| `async () => { … }` | Funktion, die immer ein Promise zurückgibt |
| `await promise` | wartet auf den Wert, nur in `async`-Funktionen |
| `try { … } catch (e) { … }` | fängt abgelehnte Promises und geworfene Fehler |
| `finally { … }` | läuft nach Erfolg und Fehler |
| `throw new Error("HTTP " + response.status)` | macht aus einem HTTP-Fehler einen Fehler im `catch` |
| `e instanceof Error ? e.message : "Unbekannt"` | Fehlermeldung typsicher lesen |
| `await Promise.all([a, b])` | mehrere Promises parallel abwarten |

## Laden in React

| Muster | Wirkung |
| ------ | ------- |
| `useEffect(() => { … }, [])` | Anfrage einmal nach dem ersten Render |
| `useEffect(() => { … }, [page])` | Anfrage bei jeder Änderung von `page` |
| `const run = async () => { … }; run();` | `async`-Funktion im Effekt aufrufen (Effekt-Callback selbst nicht `async`) |
| `useState<Character[]>([])` | getypter Startwert der Liste |
| `useState(true)` für `isLoading` | Ladezustand von Beginn an aktiv |
| `useState<string \| null>(null)` für `error` | Fehlertext oder kein Fehler |
| `let ignore = false; return () => { ignore = true; };` | Cleanup: veraltete Antworten verwerfen |
| `{isLoading && <p>Lade …</p>}` | Ladeanzeige |
| `{error && <p>{error}</p>}` | Fehleranzeige |
| `key={character.id}` | stabiles `key` im `map` |

## axios

| Syntax | Wirkung |
| ------ | ------- |
| `npm install axios` | Bibliothek installieren (im Kurs-Repo vorhanden) |
| `axios.create({ baseURL, timeout })` | Instanz mit gemeinsamen Einstellungen |
| `api.get<CharacterPage>("/character")` | `GET` mit typisierter Antwort |
| `response.data` | bereits geparster Body |
| `api.get(url, { params: { page: 2 } })` | Query-Parameter (`?page=2`) |
| `params: { status: undefined }` | undefined-Parameter wird weggelassen |
| `api.post(url, objekt)` | `POST` mit JSON-Body |
| `api.put(url, objekt)` / `api.delete(url)` | Eintrag ersetzen / löschen |
| `headers: { Authorization: "Bearer …" }` | Header, z. B. für geschützte APIs |
| `timeout: 10000` | Abbruch nach 10 Sekunden mit Fehler |
| Statuscode 4xx/5xx | axios wirft automatisch |

## fetch und axios im Vergleich

| Aufgabe | `fetch` | axios |
| ------- | ------- | ----- |
| JSON lesen | `await response.json()` | `response.data` |
| HTTP-Fehler erkennen | `if (!response.ok)` | `catch`-Block |
| Basis-URL | im String | `baseURL` |
| Query-Parameter | `?page=${page}` im String | `params: { page }` |
| Timeout | `AbortSignal.timeout(ms)` | `timeout: ms` |

## Network-Tab

| Aktion | Wirkung |
| ------ | ------- |
| `F12` → **Network** | Netzwerkanfragen der Seite anzeigen |
| Filter **Fetch/XHR** | nur API-Anfragen zeigen |
| Anfrage anklicken → **Response** / **Preview** | JSON der Antwort ansehen |
| **Headers** | URL, Methode, Statuscode |
| Drosselungs-Menü (**Slow 4G**, **Offline**) | langsames Netz oder Verbindungsabbruch simulieren |

## Rick-and-Morty-API

| Adresse | Antwort |
| ------- | ------- |
| `https://rickandmortyapi.com/api/character` | Seite 1 (20 Charaktere) mit `info` und `results` |
| `…/character?page=2` | Seite 2 (insgesamt 42 Seiten) |
| `…/character?status=dead` | gefilterte Liste (`alive`, `dead`, `unknown`) |
| `…/character/1` | ein einzelner Charakter |
| `…/character-` (falsch) | Status 404, Body `{"error":"There is nothing here."}` |
