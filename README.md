# Einführung in React: Kurs-Repo

Handouts und lauffähiger Code zum Kurs „Einführung in React“ (2 Tage, auf 3 Tage dehnbar). Jedes Konzept beginnt mit einer Mini-App ohne das Konzept („erst ohne, dann mit“). Alle Beispiel-Apps laufen in einem gemeinsamen Vite-Projekt unter [`project/`](project/README.md).

Stand: React 19.3, Vite 8, TypeScript 6, Tailwind 4, React Router 8, TanStack Query 5, React Hook Form + Zod 4, Vitest 5.

## Setup in 3 Befehlen

Voraussetzung: Node.js ≥ 22.22 (empfohlen 24 LTS). Details, Fallbacks (ZIP, Offline-Daten, Proxy) und häufige Probleme: [`00-setup-and-installation.md`](00-setup-and-installation.md).

```bash
cd project
npm install
npm run dev
```

Danach `http://localhost:5173/` öffnen: Die Startseite listet alle Beispiel-Apps, `/playground` zeigt die eigene Arbeitsdatei.

## Arbeiten mit dem Repo

| Was | Wo |
| --- | --- |
| Playground (Arbeitsdatei der Übungen) | [`project/src/playground/App.tsx`](project/src/playground/App.tsx), Anzeige unter `/playground` |
| Starter-Dateien der Übungen | [`project/src/starters/`](project/src/starters/); die Übung (`-exc.md`) nennt die passende Datei, deren Inhalt wird nach `src/playground/App.tsx` kopiert |
| Fertige Beispiel-Apps (Lösungen) | [`project/src/examples/`](project/src/examples/), Anzeige unter `/examples/<modul>/<lab>` |
| Offline-Daten für die Rick-and-Morty-API | [`project/public/characters-page-1.json`](project/public/characters-page-1.json) |
| Optionale Vorbereitung (HTML, CSS, JavaScript) | [`00-prework.md`](00-prework.md) |
| Überblick, Themen, Glossar, Best Practices, FAQ | [`m00-overview/`](m00-overview/overview.md) |
| Transferübung „Rick and Morty Explorer“ (3-Tage-Variante) | [`m09-exc.md`](m09-forms-and-testing/m09-exc.md), Lösung [`m09-sol.md`](m09-forms-and-testing/m09-sol.md), Referenz [`project/src/examples/m09-forms-and-testing/transfer/`](project/src/examples/m09-forms-and-testing/transfer/index.tsx) |

Pro Lab: **Theorie** (`-thx.md`) mit Leitfragen, **Übung** (`-exc.md`) mit Starter und Checkpoints, **Lösung** (`-sol.md`) mit Verweis auf die Beispiel-App. Pro Modul ein Cheatsheet mit Syntax-Tabellen.

## Karte: Modul → Handout → Beispiel-App

Die Spalte „Beispiel-App“ nennt den Pfad unter `project/src/examples/`.

### Modul 1: Start mit React (Tag 1)

Cheatsheet: [`javascript-jsx-cheatsheet.md`](m01-react-start/javascript-jsx-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 1.1 Warum React? Projekt mit Vite starten | [thx](m01-react-start/l01-why-react-and-vite-setup/l01-why-react-and-vite-setup-thx.md) | [exc](m01-react-start/l01-why-react-and-vite-setup/l01-why-react-and-vite-setup-exc.md) | [sol](m01-react-start/l01-why-react-and-vite-setup/l01-why-react-and-vite-setup-sol.md) | [`m01-react-start/l01-why-react-and-vite-setup/`](project/src/examples/m01-react-start/l01-why-react-and-vite-setup/index.tsx) |
| 1.2 JavaScript-Grundlagen für React | [thx](m01-react-start/l02-javascript-essentials/l02-javascript-essentials-thx.md) | [exc](m01-react-start/l02-javascript-essentials/l02-javascript-essentials-exc.md) | [sol](m01-react-start/l02-javascript-essentials/l02-javascript-essentials-sol.md) | [`m01-react-start/l02-javascript-essentials/`](project/src/examples/m01-react-start/l02-javascript-essentials/shopping-list.js) (Node-Skripte, keine Browser-Ansicht) |
| 1.3 JSX und TypeScript-Typen | [thx](m01-react-start/l03-jsx-and-typescript-basics/l03-jsx-and-typescript-basics-thx.md) | [exc](m01-react-start/l03-jsx-and-typescript-basics/l03-jsx-and-typescript-basics-exc.md) | [sol](m01-react-start/l03-jsx-and-typescript-basics/l03-jsx-and-typescript-basics-sol.md) | [`m01-react-start/l03-jsx-and-typescript-basics/`](project/src/examples/m01-react-start/l03-jsx-and-typescript-basics/index.tsx) |

### Modul 2: State und Events (Tag 1)

Cheatsheet: [`state-events-cheatsheet.md`](m02-state-and-events/state-events-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 2.1 Counter ohne State: Warum ändert sich nichts? | [thx](m02-state-and-events/l01-counter-without-state/l01-counter-without-state-thx.md) | [exc](m02-state-and-events/l01-counter-without-state/l01-counter-without-state-exc.md) | [sol](m02-state-and-events/l01-counter-without-state/l01-counter-without-state-sol.md) | [`m02-state-and-events/l01-counter-without-state/`](project/src/examples/m02-state-and-events/l01-counter-without-state/index.tsx) |
| 2.2 useState: Der Counter wird lebendig | [thx](m02-state-and-events/l02-usestate-counter/l02-usestate-counter-thx.md) | [exc](m02-state-and-events/l02-usestate-counter/l02-usestate-counter-exc.md) | [sol](m02-state-and-events/l02-usestate-counter/l02-usestate-counter-sol.md) | [`m02-state-and-events/l02-usestate-counter/`](project/src/examples/m02-state-and-events/l02-usestate-counter/index.tsx) |
| 2.3 Eingaben verarbeiten: Controlled Inputs | [thx](m02-state-and-events/l03-controlled-inputs/l03-controlled-inputs-thx.md) | [exc](m02-state-and-events/l03-controlled-inputs/l03-controlled-inputs-exc.md) | [sol](m02-state-and-events/l03-controlled-inputs/l03-controlled-inputs-sol.md) | [`m02-state-and-events/l03-controlled-inputs/`](project/src/examples/m02-state-and-events/l03-controlled-inputs/index.tsx) |
| 2.4 Listen und bedingte Anzeige: Todo-App | [thx](m02-state-and-events/l04-lists-and-conditional-rendering/l04-lists-and-conditional-rendering-thx.md) | [exc](m02-state-and-events/l04-lists-and-conditional-rendering/l04-lists-and-conditional-rendering-exc.md) | [sol](m02-state-and-events/l04-lists-and-conditional-rendering/l04-lists-and-conditional-rendering-sol.md) | [`m02-state-and-events/l04-lists-and-conditional-rendering/`](project/src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/index.tsx) |

### Modul 3: Effekte und Refs (Tag 1)

Cheatsheet: [`effects-refs-cheatsheet.md`](m03-effects-and-refs/effects-refs-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 3.1 useEffect: Code beim Start und bei Änderungen | [thx](m03-effects-and-refs/l01-useeffect-basics/l01-useeffect-basics-thx.md) | [exc](m03-effects-and-refs/l01-useeffect-basics/l01-useeffect-basics-exc.md) | [sol](m03-effects-and-refs/l01-useeffect-basics/l01-useeffect-basics-sol.md) | [`m03-effects-and-refs/l01-useeffect-basics/`](project/src/examples/m03-effects-and-refs/l01-useeffect-basics/index.tsx) |
| 3.2 Live-Uhr: Intervalle und Cleanup | [thx](m03-effects-and-refs/l02-live-clock-and-cleanup/l02-live-clock-and-cleanup-thx.md) | [exc](m03-effects-and-refs/l02-live-clock-and-cleanup/l02-live-clock-and-cleanup-exc.md) | [sol](m03-effects-and-refs/l02-live-clock-and-cleanup/l02-live-clock-and-cleanup-sol.md) | [`m03-effects-and-refs/l02-live-clock-and-cleanup/`](project/src/examples/m03-effects-and-refs/l02-live-clock-and-cleanup/index.tsx) |
| 3.3 useRef: Werte merken ohne Re-Render | [thx](m03-effects-and-refs/l03-useref/l03-useref-thx.md) | [exc](m03-effects-and-refs/l03-useref/l03-useref-exc.md) | [sol](m03-effects-and-refs/l03-useref/l03-useref-sol.md) | [`m03-effects-and-refs/l03-useref/`](project/src/examples/m03-effects-and-refs/l03-useref/index.tsx) |
| 3.4 Countdown-Timer bauen | [thx](m03-effects-and-refs/l04-countdown-timer/l04-countdown-timer-thx.md) | [exc](m03-effects-and-refs/l04-countdown-timer/l04-countdown-timer-exc.md) | [sol](m03-effects-and-refs/l04-countdown-timer/l04-countdown-timer-sol.md) | [`m03-effects-and-refs/l04-countdown-timer/`](project/src/examples/m03-effects-and-refs/l04-countdown-timer/index.tsx) |

### Modul 4: Komponenten und Styling (Tag 1)

Cheatsheet: [`components-tailwind-cheatsheet.md`](m04-components-and-styling/components-tailwind-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 4.1 Komponenten und Props: TodoItem auslagern | [thx](m04-components-and-styling/l01-components-and-props/l01-components-and-props-thx.md) | [exc](m04-components-and-styling/l01-components-and-props/l01-components-and-props-exc.md) | [sol](m04-components-and-styling/l01-components-and-props/l01-components-and-props-sol.md) | [`m04-components-and-styling/l01-components-and-props/`](project/src/examples/m04-components-and-styling/l01-components-and-props/index.tsx) |
| 4.2 Styling mit Tailwind CSS | [thx](m04-components-and-styling/l02-tailwind-styling/l02-tailwind-styling-thx.md) | [exc](m04-components-and-styling/l02-tailwind-styling/l02-tailwind-styling-exc.md) | [sol](m04-components-and-styling/l02-tailwind-styling/l02-tailwind-styling-sol.md) | [`m04-components-and-styling/l02-tailwind-styling/`](project/src/examples/m04-components-and-styling/l02-tailwind-styling/index.tsx) |
| 4.3 Mini-Challenge: Reaktionsspiel (Erweiterung) | [thx](m04-components-and-styling/l03-reaction-game-challenge/l03-reaction-game-challenge-thx.md) | [exc](m04-components-and-styling/l03-reaction-game-challenge/l03-reaction-game-challenge-exc.md) | [sol](m04-components-and-styling/l03-reaction-game-challenge/l03-reaction-game-challenge-sol.md) | [`m04-components-and-styling/l03-reaction-game-challenge/`](project/src/examples/m04-components-and-styling/l03-reaction-game-challenge/index.tsx) |

### Modul 5: Daten aus einer API laden (Tag 2)

Cheatsheet: [`fetch-axios-cheatsheet.md`](m05-api-fetching/fetch-axios-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 5.1 Daten laden mit fetch: Rick and Morty API | [thx](m05-api-fetching/l01-fetch-with-promises/l01-fetch-with-promises-thx.md) | [exc](m05-api-fetching/l01-fetch-with-promises/l01-fetch-with-promises-exc.md) | [sol](m05-api-fetching/l01-fetch-with-promises/l01-fetch-with-promises-sol.md) | [`m05-api-fetching/l01-fetch-with-promises/`](project/src/examples/m05-api-fetching/l01-fetch-with-promises/index.tsx) |
| 5.2 async/await, Ladezustand und Fehler | [thx](m05-api-fetching/l02-async-await-loading-errors/l02-async-await-loading-errors-thx.md) | [exc](m05-api-fetching/l02-async-await-loading-errors/l02-async-await-loading-errors-exc.md) | [sol](m05-api-fetching/l02-async-await-loading-errors/l02-async-await-loading-errors-sol.md) | [`m05-api-fetching/l02-async-await-loading-errors/`](project/src/examples/m05-api-fetching/l02-async-await-loading-errors/index.tsx) |
| 5.3 axios und Pagination | [thx](m05-api-fetching/l03-axios-and-pagination/l03-axios-and-pagination-thx.md) | [exc](m05-api-fetching/l03-axios-and-pagination/l03-axios-and-pagination-exc.md) | [sol](m05-api-fetching/l03-axios-and-pagination/l03-axios-and-pagination-sol.md) | [`m05-api-fetching/l03-axios-and-pagination/`](project/src/examples/m05-api-fetching/l03-axios-and-pagination/index.tsx) |

### Modul 6: Server-State mit TanStack Query (Tag 2)

Cheatsheet: [`tanstack-query-cheatsheet.md`](m06-tanstack-query/tanstack-query-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 6.1 useQuery: Laden ohne eigenen Effekt | [thx](m06-tanstack-query/l01-usequery-basics/l01-usequery-basics-thx.md) | [exc](m06-tanstack-query/l01-usequery-basics/l01-usequery-basics-exc.md) | [sol](m06-tanstack-query/l01-usequery-basics/l01-usequery-basics-sol.md) | [`m06-tanstack-query/l01-usequery-basics/`](project/src/examples/m06-tanstack-query/l01-usequery-basics/index.tsx) |

### Modul 7: Seiten und Navigation mit React Router (Tag 2)

Cheatsheet: [`router-cheatsheet.md`](m07-react-router/router-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 7.1 Von der eigenen Navigation zum Router | [thx](m07-react-router/l01-router-setup-and-links/l01-router-setup-and-links-thx.md) | [exc](m07-react-router/l01-router-setup-and-links/l01-router-setup-and-links-exc.md) | [sol](m07-react-router/l01-router-setup-and-links/l01-router-setup-and-links-sol.md) | [`m07-react-router/l01-router-setup-and-links/`](project/src/examples/m07-react-router/l01-router-setup-and-links/index.tsx) |
| 7.2 Detailseite mit URL-Parametern | [thx](m07-react-router/l02-route-params-detail-page/l02-route-params-detail-page-thx.md) | [exc](m07-react-router/l02-route-params-detail-page/l02-route-params-detail-page-exc.md) | [sol](m07-react-router/l02-route-params-detail-page/l02-route-params-detail-page-sol.md) | [`m07-react-router/l02-route-params-detail-page/`](project/src/examples/m07-react-router/l02-route-params-detail-page/index.tsx) |
| 7.3 Layouts, Route-Objekte und Loader (Erweiterung) | [thx](m07-react-router/l03-layouts-route-objects-loader/l03-layouts-route-objects-loader-thx.md) | [exc](m07-react-router/l03-layouts-route-objects-loader/l03-layouts-route-objects-loader-exc.md) | [sol](m07-react-router/l03-layouts-route-objects-loader/l03-layouts-route-objects-loader-sol.md) | [`m07-react-router/l03-layouts-route-objects-loader/`](project/src/examples/m07-react-router/l03-layouts-route-objects-loader/index.tsx) |

### Modul 8: Zustand teilen und Logik wiederverwenden (Tag 2)

Cheatsheet: [`context-hooks-cheatsheet.md`](m08-context-and-custom-hooks/context-hooks-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 8.1 Theme-App: Props durchreichen | [thx](m08-context-and-custom-hooks/l01-prop-drilling/l01-prop-drilling-thx.md) | [exc](m08-context-and-custom-hooks/l01-prop-drilling/l01-prop-drilling-exc.md) | [sol](m08-context-and-custom-hooks/l01-prop-drilling/l01-prop-drilling-sol.md) | [`m08-context-and-custom-hooks/l01-prop-drilling/`](project/src/examples/m08-context-and-custom-hooks/l01-prop-drilling/index.tsx) |
| 8.2 Context: Globaler Zustand ohne Prop Drilling | [thx](m08-context-and-custom-hooks/l02-context-api/l02-context-api-thx.md) | [exc](m08-context-and-custom-hooks/l02-context-api/l02-context-api-exc.md) | [sol](m08-context-and-custom-hooks/l02-context-api/l02-context-api-sol.md) | [`m08-context-and-custom-hooks/l02-context-api/`](project/src/examples/m08-context-and-custom-hooks/l02-context-api/index.tsx) |
| 8.3 Eigene Hooks: useTodos und useCountdown | [thx](m08-context-and-custom-hooks/l03-custom-hooks/l03-custom-hooks-thx.md) | [exc](m08-context-and-custom-hooks/l03-custom-hooks/l03-custom-hooks-exc.md) | [sol](m08-context-and-custom-hooks/l03-custom-hooks/l03-custom-hooks-sol.md) | [`m08-context-and-custom-hooks/l03-custom-hooks/`](project/src/examples/m08-context-and-custom-hooks/l03-custom-hooks/index.tsx) |

### Modul 9: Formulare und Tests (Tag 2)

Cheatsheet: [`forms-testing-cheatsheet.md`](m09-forms-and-testing/forms-testing-cheatsheet.md)

| Lab | Theorie | Übung | Lösung | Beispiel-App |
| --- | --- | --- | --- | --- |
| 9.1 Formulare mit useState | [thx](m09-forms-and-testing/l01-forms-with-usestate/l01-forms-with-usestate-thx.md) | [exc](m09-forms-and-testing/l01-forms-with-usestate/l01-forms-with-usestate-exc.md) | [sol](m09-forms-and-testing/l01-forms-with-usestate/l01-forms-with-usestate-sol.md) | [`m09-forms-and-testing/l01-forms-with-usestate/`](project/src/examples/m09-forms-and-testing/l01-forms-with-usestate/index.tsx) |
| 9.2 Validierung mit React Hook Form und Zod | [thx](m09-forms-and-testing/l02-react-hook-form-zod/l02-react-hook-form-zod-thx.md) | [exc](m09-forms-and-testing/l02-react-hook-form-zod/l02-react-hook-form-zod-exc.md) | [sol](m09-forms-and-testing/l02-react-hook-form-zod/l02-react-hook-form-zod-sol.md) | [`m09-forms-and-testing/l02-react-hook-form-zod/`](project/src/examples/m09-forms-and-testing/l02-react-hook-form-zod/index.tsx) |
| 9.3 Tests mit Vitest und Testing Library | [thx](m09-forms-and-testing/l03-vitest-testing-library/l03-vitest-testing-library-thx.md) | [exc](m09-forms-and-testing/l03-vitest-testing-library/l03-vitest-testing-library-exc.md) | [sol](m09-forms-and-testing/l03-vitest-testing-library/l03-vitest-testing-library-sol.md) | [`m09-forms-and-testing/l03-vitest-testing-library/`](project/src/examples/m09-forms-and-testing/l03-vitest-testing-library/index.tsx) |
