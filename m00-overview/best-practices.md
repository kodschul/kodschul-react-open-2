# Best Practices: Einführung in React

Regeln, die über Module hinweg gelten. Jede Regel nennt den Grund und das Lab, in dem sie vorkommt.

## Allgemein

| Regel | Begründung | Lab |
| --- | --- | --- |
| Neue Projekte mit Vite (oder einem Framework) starten, nicht mit Create React App | Create React App ist seit 2025 eingestellt und taucht nur in alten Tutorials auf | 1.1 |
| Props, State und Funktionsparameter typisieren (`type`, Union-Typen) | TypeScript meldet falsche Typen und fehlende Felder vor dem Browser | 1.3 |
| Linter-Meldungen (`react-hooks/…`) lesen und beheben, statt sie zu unterdrücken | Die Regel nennt das Problem, etwa Hook in Bedingung oder `ref.current` im Render | 2.2, 3.3 |
| Konsole und Network-Tab bei jedem unerwarteten Verhalten öffnen | Dort stehen Warnungen, Statuscodes und die echte Antwort der API | 5.1 |

## State

| Regel | Begründung | Lab |
| --- | --- | --- |
| Anzeige-Daten in `useState` halten, nie in normalen Variablen | Eine Variable überlebt kein Rendern, und ihre Änderung löst keines aus | 2.1, 2.2 |
| State ersetzen statt ändern (Spread, `map`, `filter`; kein `push`) | Gleiche Referenz bedeutet für React „nichts geändert“, die Anzeige bleibt stehen | 2.4 |
| Aus State Ableitbares berechnen, nicht als zweiten State speichern | Zwei Quellen für denselben Wert laufen auseinander | 2.3, 3.4 |
| Hooks nur oben in der Komponente aufrufen, nie in Bedingungen oder Schleifen | React ordnet State anhand der Aufrufreihenfolge zu | 2.2, 8.3 |
| Im Intervall oder bei Folge-Updates `setX((prev) => …)` nutzen | Der Wert aus dem Render ist ein Schnappschuss und veraltet in Closures | 3.4 |
| Zustand in die niedrigste Komponente legen, die alle Verbraucher überdeckt | So bleiben Datenfluss und Verantwortung nachvollziehbar | 8.1 |
| Werte, die nicht angezeigt werden (Timer-ID, Klickzähler), in `useRef` speichern | Eine Ref-Änderung löst kein unnötiges Re-Render aus | 3.3, 4.3 |
| `ref.current` nur in Handlern und Effekten lesen oder schreiben | Der Wert im Render ist nicht verlässlich (doppeltes Rendern in der Entwicklung, verworfene Renders); der Linter meldet ihn (`react-hooks/refs`) | 3.3 |

## Effekte

| Regel | Begründung | Lab |
| --- | --- | --- |
| Effekte nur für Verbindungen zur Außenwelt (Timer, Netzwerk, Browser-APIs) | Berechenbares und Reaktionen auf Klicks gehören in Render und Handler | 3.1 |
| Jeden gelesenen Wert ins Dependency-Array aufnehmen | Fehlende Einträge liefern veraltete Werte (`react-hooks/exhaustive-deps`) | 3.1 |
| Jeden Timer und jedes Abo im Cleanup beenden | Sonst laufen Intervalle doppelt (StrictMode) oder nach dem Unmount weiter | 3.2 |
| Doppelte Effektläufe in der Entwicklung als Hinweis auf einen fehlenden Cleanup lesen | StrictMode simuliert Unmount und Mount, um genau das aufzudecken | 3.1 |
| Den Seitentitel mit `<title>` im JSX setzen statt per Effekt | React 19 rendert `<title>` direkt; ein Effekt ist überflüssig | 3.1 |
| Kein synchrones `setState` im Effekt-Körper | Es löst einen zusätzlichen Render aus; der Wert lässt sich meist ableiten (`react-hooks/set-state-in-effect`) | 3.1, 3.4 |
| Im Effekt-Callback eine `async`-Funktion definieren und aufrufen, den Callback selbst nicht `async` machen | Der Effekt-Callback muss die Cleanup-Funktion oder nichts zurückgeben | 5.2 |

## Komponenten

| Regel | Begründung | Lab |
| --- | --- | --- |
| Eine Komponente pro Datei, Name mit Großbuchstaben | JSX unterscheidet Komponenten von HTML-Elementen am Großbuchstaben | 4.1 |
| Props nur lesen, Änderungen per Callback-Prop (`onXyz`) nach oben melden | Props fließen nach unten, Ereignisse nach oben | 4.1 |
| `key` aus einer eindeutigen, stabilen ID bilden; Index nur bei Listen, die sich nie ändern; Text nur, wenn er eindeutig ist | React ordnet Einträge über den `key` zu; Einfügen und Entfernen verschiebt Indizes, doppelte Texte erzeugen doppelte Keys | 2.4 |
| Handler als Funktion übergeben: `onClick={() => removeTodo(todo)}`, nie `onClick={removeTodo(todo)}` | Letzteres ruft schon beim Rendern auf | 2.4 |
| Tailwind-Klassen vollständig ausschreiben und per State umschalten | Zusammengesetzte Klassennamen findet Tailwind nicht | 4.2 |
| `useMemo`, `useCallback` und `memo` in neuen Apps weglassen | Der React Compiler memoisiert beim Build automatisch | 8.3 |
| Logik, die mit der Anzeige nichts zu tun hat, in eigene Hooks mit `use`-Präfix auslagern | Der Name macht die Hook-Regeln für den Linter prüfbar | 8.3 |
| Context nur für wenige, selten wechselnde, breit genutzte Werte, Zugriff über einen eigenen Hook (`useTheme`) | Der Hook meldet einen fehlenden Provider verständlich; Context ersetzt keinen State | 8.2 |

## Daten laden

| Regel | Begründung | Lab |
| --- | --- | --- |
| `fetch` nie direkt im Render aufrufen | Jedes Rendern würde eine neue Anfrage auslösen | 5.1 |
| Bei `fetch` immer `response.ok` prüfen | `fetch` lehnt nur bei fehlender Antwort ab, nicht bei 404 oder 500 | 5.2 |
| Ladezustand und Fehler immer sichtbar machen, `finally` beendet den Ladezustand | Ohne sie wirkt die App leer oder eingefroren | 5.2 |
| Im Effekt geladene Antworten per Cleanup (`ignore`-Flag) absichern | Bei schnellem Klicken gewinnt sonst die letzte Antwort statt der letzten Eingabe | 5.3 |
| Gemeinsame Einstellungen in einer axios-Instanz bündeln (`baseURL`, `timeout`) | Weniger Wiederholung, HTTP-Fehler landen automatisch im `catch` | 5.3 |
| Server-Daten mit `useQuery` laden, UI-Zustand mit `useState` | TanStack Query übernimmt Laden, Fehler, Cache und Wiederholung | 6.1 |
| Alle Werte, von denen das Ergebnis abhängt, in den `queryKey` aufnehmen (`["characters", page]`) | Die Änderung des Schlüssels löst das neue Laden aus und trennt die Cache-Einträge | 6.1, 7.2 |

## Routing

| Regel | Begründung | Lab |
| --- | --- | --- |
| Interne Navigation mit `Link`, nicht mit `<a href>` | `<a href>` lädt die Seite neu und verwirft den State | 7.1 |
| Alles, was nach einem Neuladen wieder stimmen muss (Detail-ID, Seitenzahl), in die URL legen | Neuladen, „Zurück“ und geteilte Links funktionieren dann verlässlich | 7.2 |
| Alle Importe aus `react-router`, nicht aus `react-router-dom` | Ab Version 8 gibt es nur noch das Paket `react-router` | 7.1 |
| Gemeinsamen Rahmen als Layout-Route mit `<Outlet />` bauen | Navigation und Kopfzeile bleiben beim Seitenwechsel stehen | 7.3 |
| `loader` oder `useQuery` bewusst wählen | Der Loader wartet vor dem Seitenwechsel, `useQuery` zeigt die Seite sofort | 7.3 |

## Formulare

| Regel | Begründung | Lab |
| --- | --- | --- |
| In jedem `onSubmit`-Handler `e.preventDefault()` aufrufen | Sonst lädt der Browser die Seite neu | 9.1 |
| Alle Felder in einem State-Objekt halten (`[name]: value`) | Ein State pro Feld wächst mit jedem neuen Feld | 9.1 |
| Ab mehreren Regeln React Hook Form + Zod statt Validierung von Hand | Das Schema ist die einzige Quelle für Regeln und Typ | 9.2 |
| Prüfzeitpunkt über `mode` bewusst wählen (z. B. `"onTouched"`) | Fehlermeldungen erscheinen sonst beim Tippen oder erst beim Absenden | 9.2 |

## Tests

| Regel | Begründung | Lab |
| --- | --- | --- |
| Verhalten aus Nutzersicht testen, Elemente nach Rolle, Label oder Text suchen | Tests bleiben stabil, wenn sich die interne Umsetzung ändert | 9.3 |
| `data-testid` nur nutzen, wenn Rolle, Label und Text nicht reichen | Testing Library fragt wie ein Mensch: erst nach Rolle, Beschriftung und Text | 9.3 |
| Logik als Unit-Test, Anzeige und Bedienung als Komponententest prüfen | Jede Ebene meldet ihre Fehler getrennt | 9.3 |
| Tests mit `npm test` im Watch-Modus laufen lassen | Nach jeder Änderung zeigt sich sofort, ob das Verhalten noch stimmt | 9.3 |
