# Cheatsheet: TanStack Query

## Einrichtung

| Syntax | Wirkung |
| ------ | ------- |
| `npm install @tanstack/react-query` | Bibliothek installieren (im Kurs-Repo vorhanden) |
| `import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";` | benötigte Teile importieren |
| `const queryClient = new QueryClient();` | Cache-Objekt, einmal außerhalb der Komponenten anlegen |
| `<QueryClientProvider client={queryClient}>…</QueryClientProvider>` | macht den Client allen Komponenten darunter verfügbar |

## useQuery

| Syntax | Wirkung |
| ------ | ------- |
| `useQuery({ queryKey, queryFn })` | lädt Server-Daten und verwaltet Zustand und Cache |
| `queryKey: ["characters", page]` | Cache-Schlüssel als Array; ändert sich `page`, lädt `useQuery` neu |
| `queryFn: () => fetchCharacters(page)` | Funktion, die ein Promise mit den Daten liefert |
| `staleTime: 60_000` | Daten gelten 60 Sekunden als frisch (kein erneuter Request) |
| `retry: false` | Fehlschläge nicht wiederholen (Standard: 3 Versuche) |
| `enabled: false` | Query nicht automatisch starten |

## Rückgabewerte

| Wert | Bedeutung |
| ---- | --------- |
| `data` | geladene Daten; bis zur ersten Antwort `undefined` |
| `error` | Fehlerobjekt, sonst `null` (`error.message` für den Text) |
| `isPending` | noch keine Daten für diesen Schlüssel vorhanden |
| `isLoading` | `isPending` und Anfrage läuft (erstes Laden) |
| `isFetching` | irgendeine Anfrage läuft, auch im Hintergrund |
| `isError` | letzte Anfrage ist fehlgeschlagen |

## Typische Muster

| Muster | Wirkung |
| ------ | ------- |
| `{isPending && <p>Lade …</p>}` | Ladeanzeige |
| `{error && <p>{error.message}</p>}` | Fehleranzeige |
| `data?.results.map(…)` | sicherer Zugriff, solange `data` fehlt |
| `const fetchCharacters = async (page: number): Promise<CharacterPage> => …` | getypte Query-Funktion; `useQuery` leitet den Datentyp daraus ab |

## Cache-Verhalten

| Situation | Verhalten |
| --------- | --------- |
| Seitenwechsel auf neuen Schlüssel | `isPending`, dann Daten |
| Zurück auf besuchten Schlüssel, `staleTime: 0` | Daten sofort, Hintergrund-Anfrage |
| Zurück auf besuchten Schlüssel, `staleTime` nicht abgelaufen | Daten sofort, keine Anfrage |
| Fehler in `queryFn` | bis zu 3 Wiederholungen, danach `error` |
| Browserfenster erhält wieder den Fokus | veraltete Daten laden neu (`refetchOnWindowFocus`) |

## Client-State und Server-State

| Art | Werkzeug |
| --- | -------- |
| Eingabe, Zähler, geöffnetes Menü | `useState`, Context |
| Daten vom Server (Listen, Profile) | `useQuery` |
| Einzelne einfache Anfrage ohne Cache | `useEffect` + axios/fetch (Lab 5.x) |
| Timer, Event-Listener, Browser-APIs | `useEffect` |
