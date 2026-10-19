# Glossar: Einführung in React

Begriffe aus den Handouts, alphabetisch. Die Spalte „Modul/Lab“ nennt das Lab, in dem der Begriff eingeführt oder am ausführlichsten erklärt wird.

| Begriff | Bedeutung | Modul/Lab |
| --- | --- | --- |
| Abgeleiteter Wert | Wert, der sich aus State oder Props berechnen lässt (`const isTicking = …`); braucht weder eigenen State noch Effekt | 3.4 |
| Arrow Function | kurze Funktionsschreibweise `(x) => x + 1`; liefert Ausdrücke, daher in React allgegenwärtig | 1.2 |
| async/await | Schreibweise für Promises: `await` wartet in einer `async`-Funktion auf das Ergebnis; Fehler fängt `try/catch` | 5.2 |
| axios | HTTP-Bibliothek mit Instanz (`baseURL`), `params` und automatisch geparster Antwort (`response.data`) | 5.3 |
| Cache | Zwischenspeicher für bereits geladene Daten, bei TanStack Query je `queryKey` | 6.1 |
| Callback-Prop | Funktion als Prop (`onXyz`), über die ein Kind dem Elternteil ein Ereignis meldet | 4.1 |
| Cleanup | Funktion, die ein Effekt zurückgibt; räumt vor dem nächsten Effektlauf und beim Unmount auf (z. B. `clearInterval`) | 3.2 |
| Closure (Stale Closure) | Funktion, die den Wert des Renders behält, in dem sie entstand; im Intervall liefert `setSecs(secs - 1)` deshalb stets denselben Wert | 3.4 |
| Context | Kanal, der einen Wert an alle Komponenten darunter liefert, ohne Props durchzureichen | 8.2 |
| Controlled Input | Eingabefeld, dessen Wert per `value` aus dem State kommt und per `onChange` zurück in den State geht | 2.3 |
| Custom Hook | eigene Funktion mit `use`-Präfix, die andere Hooks aufruft und Logik wiederverwendbar macht | 8.3 |
| Dependency-Array | zweites Argument von `useEffect`: `[]` einmal, `[wert]` bei Änderung, ohne Array nach jedem Render | 3.1 |
| Destructuring | Werte aus Objekten oder Arrays direkt in Variablen auslesen (`const [count, setCount] = …`) | 1.2 |
| DOM (Document Object Model) | Elementbaum der Seite im Browser; Refs liefern Zugriff auf Elemente, Tests prüfen ihn | 3.3 |
| Effekt (`useEffect`) | Code, der nach dem Rendern läuft und die Verbindung zur Außenwelt herstellt (Timer, Netzwerk, Browser-APIs) | 3.1 |
| Event-Handler | Funktion, die bei einem Ereignis läuft (`onClick`, `onChange`, `onSubmit`); Namenskonvention `handleXyz` | 2.1 |
| Fragment | `<>…</>`: Wurzelelement ohne zusätzliches HTML-Element | 1.3 |
| Funktionales Update | `setSecs((prev) => prev - 1)`: Der Setter bekommt immer den aktuellen Wert | 3.4 |
| Hook | Funktion mit `use`-Präfix (`useState`, `useEffect`, …); gilt nur oben in Komponenten und eigenen Hooks | 2.2 |
| Hot Reload (HMR) | Vite aktualisiert die Seite beim Speichern, ohne manuelles Neuladen | 1.1 |
| Immutability | State nie ändern, sondern ersetzen (neues Array oder Objekt per Spread, `map`, `filter`) | 2.4 |
| jsdom | simulierter Browser, in dem Vitest Komponenten rendert | 9.3 |
| JSX (JavaScript XML) | HTML-ähnliche Syntax in JavaScript; `{}` für Ausdrücke, `className`, `style` als Objekt | 1.3 |
| `key` | eindeutige, stabile Kennung je Listeneintrag, damit React Einträge zuordnen kann | 2.4 |
| Komponente | Funktion, die JSX zurückgibt; Name mit Großbuchstaben, in der Regel eine pro Datei | 1.1, 4.1 |
| Komponententest | Test, der sichtbares Verhalten einer Komponente prüft (`render`, `screen`, `fireEvent`) | 9.3 |
| Layout | Elternroute mit `<Outlet />`; Rahmen und Navigation bleiben beim Seitenwechsel stehen | 7.3 |
| Link (`<Link>`) | Navigation ohne Neuladen der Seite; `<a href>` lädt dagegen neu und verliert den State | 7.1 |
| Loader | Funktion an einer Route, die Daten vor dem Rendern lädt (`useLoaderData`) | 7.3 |
| Mount / Unmount | Komponente erscheint zum ersten Mal / verschwindet aus der Anzeige | 3.1, 3.2 |
| Network-Tab | Bereich der Browser-Entwicklertools, der Anfragen und Antworten der API zeigt | 5.1 |
| Outlet (`<Outlet />`) | Platzhalter im Layout für die passende Kindroute | 7.3 |
| Pagination | Blättern durch Seiten einer API-Antwort; `page` als State im Dependency-Array | 5.3 |
| Playground | `src/playground/App.tsx`: Arbeitsdatei der Übungen, erreichbar unter `/playground` | 1.1 |
| Promise | Platzhalter für ein künftiges Ergebnis; `fetch` liefert eines, `.then` und `await` lesen es | 5.1 |
| Prop Drilling | Props durch Zwischenkomponenten reichen, die sie selbst nie lesen | 8.1 |
| Props | Eingabewerte einer Komponente; lesbar, typisiert, nach unten gereicht | 4.1 |
| Provider | Komponente, die einen Wert bereitstellt (`<ThemeContext value>`, `QueryClientProvider`) | 8.2, 6.1 |
| Query-Key | Array als Cache-Schlüssel einer Abfrage (`["characters", page]`); Änderung löst neues Laden aus | 6.1 |
| Query-Parameter | Teil der URL nach `?` (`?page=3`); Zugriff über `useSearchParams` | 7.2 |
| Race Condition | schnelle Anfragen kommen in falscher Reihenfolge zurück; Abhilfe: Cleanup mit `ignore`-Flag | 5.3 |
| React Compiler | Build-Schritt, der Komponenten automatisch memoisiert; `useMemo`/`useCallback`/`memo` sind meist unnötig | 8.3 |
| React Developer Tools | Browser-Erweiterung mit Tab „Components“: Komponentenbaum, Props und State | 2.2 |
| Ref (`useRef`) | Wert oder DOM-Element, das über Renders bleibt, ohne ein Re-Render auszulösen (`ref.current`) | 3.3 |
| Render | Aufruf einer Komponente, der JSX für die Anzeige erzeugt | 2.1 |
| Re-Render | erneutes Rendern nach einer State-Änderung; Ref-Änderungen lösen keines aus | 2.2, 3.3 |
| Resolver (`zodResolver`) | Brücke, die ein Zod-Schema an React Hook Form übergibt | 9.2 |
| Route | Zuordnung eines URL-Pfads zu einer Komponente (`<Route path element>`) | 7.1 |
| Route-Objekt | Route als Datenobjekt (`path`, `Component`, `children`, `loader`) für `createBrowserRouter` | 7.3 |
| Schema (Zod) | Beschreibung der Regeln für Daten; liefert zugleich den TypeScript-Typ (`z.infer`) | 9.2 |
| Server-State | Daten, die dem Server gehören (Listen, Profile); verwaltet `useQuery` statt `useState` | 6.1 |
| Setter | Funktion aus `useState` (`setCount`), die den Wert ersetzt und ein Re-Render einplant | 2.2 |
| SPA (Single-Page-App) | App, die nur eine HTML-Seite lädt und Ansichten im Browser wechselt | 1.1 |
| Spread | `[neu, ...alt]`, `{ ...obj }`: Kopie mit Änderung, Original bleibt unverändert | 1.2 |
| Starter | Vorlage einer Übung in `src/starters/`, die nach `src/playground/App.tsx` kopiert wird | 1.1 |
| State | Daten einer Komponente, die React zwischen Renders speichert; Änderung per Setter löst ein Re-Render aus | 2.1, 2.2 |
| StrictMode | Entwicklungsmodus in `main.tsx`; ruft Effekte doppelt auf, damit fehlende Cleanups auffallen | 3.1 |
| Tailwind CSS | Styling mit Utility-Klassen direkt am Element (`className`); in Tailwind 4 per Vite-Plugin | 4.2 |
| Template Literal | Text mit Platzhaltern in Backticks: `` `Hallo ${name}` `` | 1.2 |
| Ternary | `bedingung ? a : b`: Bedingung als Ausdruck, z. B. in JSX | 1.2 |
| Testing Library | Bibliothek zum Rendern und Abfragen von Komponenten aus Nutzersicht (`screen.getByRole`) | 9.3 |
| TypeScript | JavaScript mit Typen; meldet Fehler, bevor der Browser startet | 1.3 |
| Uncontrolled Input | Eingabefeld ohne `value`; das DOM verwaltet den Wert (`defaultValue`) | 2.3 |
| Union-Typ | Typ aus festen Alternativen (`"idle" \| "running"`); steuert z. B. den Status des Reaktionsspiels | 1.3, 4.3 |
| Unit-Test | Test einer einzelnen Funktion oder Klasse (`Calculator`) | 9.3 |
| `useQuery` | TanStack-Query-Hook: lädt Server-Daten und liefert `data`, `error`, `isPending` | 6.1 |
| Utility-Klasse | kleine Tailwind-Klasse für genau eine Eigenschaft (`p-4`, `md:grid-cols-3`) | 4.2 |
| Vite | Dev-Server und Build-Werkzeug; Nachfolger von Create React App als Startweg | 1.1 |
| Vitest | Test-Runner mit `describe`, `it`, `expect`; läuft über `npm test` und `npx vitest run` | 9.3 |
| XSS (Cross-Site Scripting) | Einschleusen von Skripten; React escapt eingebettete Werte automatisch | 1.3 |
| Zod | Bibliothek für Schemas und Validierung (Version 4) | 9.2 |
