# Lab 5.3 – Lösung: Blätterbare Galerie mit axios

## Aufgabe 1 und 2: axios-Instanz und Request

```tsx
import axios from "axios";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

const response = await api.get<CharacterPage>("/character");
setCharacters(response.data.results);
```

`api.get<CharacterPage>` typisiert `response.data`; `fetch`-typisches `response.json()` und die `ok`-Prüfung entfallen, weil axios bei 4xx/5xx selbst wirft.

## Aufgabe 3: Fehlerfall mit axios

Pfad `"/character-"` ergibt die Anzeige:

```text
Fehler beim Laden: Request failed with status code 404
```

Die Meldung stammt von axios; der `catch`-Block bleibt unverändert.

## Aufgabe 4 bis 6: page, Effekt und Buttons

```tsx
const [page, setPage] = useState(1);

useEffect(() => {
  const loadCharacters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<CharacterPage>("/character", { params: { page } });
      setCharacters(response.data.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setIsLoading(false);
    }
  };
  loadCharacters();
}, [page]);
```

```tsx
<div className="mb-4 flex items-center gap-4">
  <button
    className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
  >
    Zurück
  </button>
  <span className="font-semibold">Seite {page}</span>
  <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setPage(page + 1)}>
    Weiter
  </button>
</div>
```

Im Grid steht `{!isLoading && characters.map(...)}`, damit beim Laden keine alten Karten stehen bleiben.

## Aufgabe 7: Network-Tab

| Klick | Anfrage |
| ----- | ------- |
| Start | `GET …/api/character?page=1` |
| „Weiter“ | `GET …/api/character?page=2` |
| „Weiter“ | `GET …/api/character?page=3` |
| „Zurück“ | `GET …/api/character?page=2` (wird erneut geladen: kein Cache, das löst Lab 6.1) |

## Aufgabe 8: Demo-Schalter und schnelles Klicken

```tsx
// DEMO-SCHALTER: true simuliert ein langsames Netz (2 Sekunden Verzögerung pro Anfrage).
const SLOW_DEMO = true;

// im try-Block, vor api.get:
if (SLOW_DEMO) await new Promise((resolve) => setTimeout(resolve, 2000));
```

Beobachtung nach drei schnellen Klicks (ohne `ignore`): Die Seitenzahl steht sofort auf 4, nach etwa 2 Sekunden verschwindet „Lade …“ und die Inhalte der Seite 2 erscheinen, kurz danach die Inhalte von 3 und 4. Jede Antwort ruft `setCharacters` und `setIsLoading(false)` auf, auch wenn die Seite längst weitergeblättert wurde.

## Aufgabe 9: ignore-Flag im Cleanup

```tsx
useEffect(() => {
  let ignore = false;

  const loadCharacters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (SLOW_DEMO) await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await api.get<CharacterPage>("/character", { params: { page } });
      if (!ignore) setCharacters(response.data.results);
    } catch (e) {
      if (!ignore) setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      if (!ignore) setIsLoading(false);
    }
  };
  loadCharacters();

  return () => {
    ignore = true;
  };
}, [page]);
```

Vor jedem neuen Durchlauf läuft der Cleanup des vorherigen und setzt dessen `ignore` auf `true`. Nur der Durchlauf der aktuellen Seite schreibt noch in den State: „Lade …“ bleibt bis zur Antwort der Seite 4, danach erscheint genau diese Seite.

## Aufgabe 10: Schalter zurücksetzen

```tsx
const SLOW_DEMO = false;
```

## Lösung zur Erweiterung

```tsx
type StatusFilter = "" | "alive" | "dead";

const [status, setStatus] = useState<StatusFilter>("");
const [totalPages, setTotalPages] = useState(1);

// im Effekt:
const response = await api.get<CharacterPage>("/character", {
  params: { page, status: status || undefined }, // undefined-Parameter lässt axios weg
});
if (!ignore) {
  setCharacters(response.data.results);
  setTotalPages(response.data.info.pages);
}
// Dependency-Array: [page, status]

// Filterwechsel beginnt wieder auf Seite 1:
const handleStatusChange = (value: StatusFilter) => {
  setStatus(value);
  setPage(1);
};
```

```tsx
<select value={status} onChange={(event) => handleStatusChange(event.target.value as StatusFilter)}>
  <option value="">alle</option>
  <option value="alive">alive</option>
  <option value="dead">dead</option>
</select>
<span>Seite {page} von {totalPages}</span>
<button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Weiter</button>
```

Der Seitenwechsel im Handler ist nötig: Ein Filter mit weniger Seiten (z. B. `dead`: 15 Seiten) würde bei Seite 20 mit 404 antworten.

Referenz-App: `src/examples/m05-api-fetching/l03-axios-and-pagination/index.tsx` (Erweiterung: `app-status-filter.tsx`)
