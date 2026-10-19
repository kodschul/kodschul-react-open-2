# Themenübersicht: Einführung in React

Tag 1 deckt Modul 1–4 ab, Tag 2 Modul 5–9 (2-Tage-Standard). Details zur 3-Tage-Variante in [`overview.md`](overview.md).

| Modul | Titel | Tag | Labs | Kernthemen |
| --- | --- | --- | --- | --- |
| [m01](../m01-react-start/) | Start mit React | 1 | 1.1 Warum React? Projekt mit Vite starten<br>1.2 JavaScript-Grundlagen für React<br>1.3 JSX und TypeScript-Typen | Single-Page-App, Komponenten, Vite (Dev-Server, Hot Reload), `index.html` → `main.tsx` → `App`; `const`/`let`, Arrow Functions, `map`, `filter`, Spread, Destructuring; JSX-Regeln, `type`, `interface`, Union-Typen |
| [m02](../m02-state-and-events/) | State und Events | 1 | 2.1 Counter ohne State<br>2.2 `useState`: Der Counter wird lebendig<br>2.3 Eingaben verarbeiten: Controlled Inputs<br>2.4 Listen und bedingte Anzeige: Todo-App | Render, Event-Handler, State, Setter, Regeln der Hooks, `value` + `onChange`, `key`, Immutability, bedingte Anzeige |
| [m03](../m03-effects-and-refs/) | Effekte und Refs | 1 | 3.1 `useEffect`: Code beim Start und bei Änderungen<br>3.2 Live-Uhr: Intervalle und Cleanup<br>3.3 `useRef`: Werte merken ohne Re-Render<br>3.4 Countdown-Timer bauen | Dependency-Array, StrictMode-Doppelaufruf, „Effekt oder nicht?“, Cleanup, DOM-Ref, Variable/State/Ref, funktionales Update |
| [m04](../m04-components-and-styling/) | Komponenten und Styling | 1 | 4.1 Komponenten und Props: TodoItem auslagern<br>4.2 Styling mit Tailwind CSS<br>4.3 Mini-Challenge: Reaktionsspiel (Erweiterung) | Props, Callback-Props, eine Komponente pro Datei, Inline-Style vs. Tailwind, Responsive-Präfixe, Status-Union, Timeout in Ref |
| [m05](../m05-api-fetching/) | Daten aus einer API laden | 2 | 5.1 Daten laden mit `fetch`: Rick and Morty API<br>5.2 `async/await`, Ladezustand und Fehler<br>5.3 axios und Pagination | Promise, `fetch` im Effekt, `response.ok`, `try/catch/finally`, Ladezustand, axios-Instanz, `params`, Race Condition |
| [m06](../m06-tanstack-query/) | Server-State mit TanStack Query | 2 | 6.1 `useQuery`: Laden ohne eigenen Effekt | Client- vs. Server-State, `QueryClientProvider`, `queryKey`, Cache, `isPending`/`isLoading`/`isFetching` |
| [m07](../m07-react-router/) | Seiten und Navigation mit React Router | 2 | 7.1 Von der eigenen Navigation zum Router<br>7.2 Detailseite mit URL-Parametern<br>7.3 Layouts, Route-Objekte und Loader (Erweiterung) | `BrowserRouter`, `Routes`, `Link`, `useParams`, `useSearchParams`, `Outlet`, `createBrowserRouter`, `loader`; Importe nur aus `react-router` |
| [m08](../m08-context-and-custom-hooks/) | Zustand teilen und Logik wiederverwenden | 2 | 8.1 Theme-App: Props durchreichen<br>8.2 Context: Globaler Zustand ohne Prop Drilling<br>8.3 Eigene Hooks: `useTodos` und `useCountdown` | Prop Drilling, `createContext`, `<Context value>`, `useContext`, `useTheme`, Custom Hooks, Hooks-Überblick, React Compiler statt `useMemo`/`useCallback` |
| [m09](../m09-forms-and-testing/) | Formulare und Tests | 2 | 9.1 Formulare mit `useState`<br>9.2 Validierung mit React Hook Form und Zod<br>9.3 Tests mit Vitest und Testing Library<br>Transferübung „Rick and Morty Explorer“ (3-Tage-Variante) | State-Objekt, `preventDefault`, Zod-Schema, `useForm`, `zodResolver`, `describe`/`it`/`expect`, `render`/`screen`/`fireEvent` |

## Cheatsheets

| Modul | Datei |
| --- | --- |
| m01 | [`javascript-jsx-cheatsheet.md`](../m01-react-start/javascript-jsx-cheatsheet.md) |
| m02 | [`state-events-cheatsheet.md`](../m02-state-and-events/state-events-cheatsheet.md) |
| m03 | [`effects-refs-cheatsheet.md`](../m03-effects-and-refs/effects-refs-cheatsheet.md) |
| m04 | [`components-tailwind-cheatsheet.md`](../m04-components-and-styling/components-tailwind-cheatsheet.md) |
| m05 | [`fetch-axios-cheatsheet.md`](../m05-api-fetching/fetch-axios-cheatsheet.md) |
| m06 | [`tanstack-query-cheatsheet.md`](../m06-tanstack-query/tanstack-query-cheatsheet.md) |
| m07 | [`router-cheatsheet.md`](../m07-react-router/router-cheatsheet.md) |
| m08 | [`context-hooks-cheatsheet.md`](../m08-context-and-custom-hooks/context-hooks-cheatsheet.md) |
| m09 | [`forms-testing-cheatsheet.md`](../m09-forms-and-testing/forms-testing-cheatsheet.md) |

## Leitlinien über alle Module

| Konzept | Reihenfolge im Kurs |
| --- | --- |
| Kernvergleich Tag 1 | Variable → `useState` → `useRef` (Lab 2.2, Lab 3.3) |
| Daten laden | `fetch` + `.then` (5.1) → `async/await` (5.2) → axios (5.3) → `useQuery` (6.1) |
| Navigation | eigener State (7.1, „ohne“) → Router (7.1) → Parameter (7.2) → Route-Objekte und Loader (7.3) |
| Zustand teilen | Props durchreichen (8.1, „ohne“) → Context (8.2) → eigene Hooks (8.3) |
| Formulare | `useState` (9.1) → React Hook Form + Zod (9.2) |
