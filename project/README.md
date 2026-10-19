# Kurs-Projekt: React-Einführung

Eine Vite-App mit allen Beispiel-Apps des Kurses, den Starter-Dateien der Übungen und einem Playground als Arbeitsbereich. Handouts und Aufgaben liegen eine Ebene höher: [`../README.md`](../README.md).

## Start

Voraussetzung: Node.js ≥ 22.22 (empfohlen 24 LTS). React Router 8 und Vitest 5 setzen das voraus. Installation, Fallbacks und häufige Probleme: [`../00-setup-and-installation.md`](../00-setup-and-installation.md).

```bash
npm install
npm run dev
```

## Stack

| Bereich | Paket (Version laut `package.json`) |
| --- | --- |
| UI | React und React DOM `^19.3.1` |
| Build und Dev-Server | Vite `^8.3.4`, `@vitejs/plugin-react` `^6.1.2` |
| Sprache | TypeScript `~6.0.2` |
| Styling | Tailwind CSS `^4.3.3` (Vite-Plugin `@tailwindcss/vite`) |
| Routing | React Router `^8.4.0` (Import nur aus `react-router`) |
| Server-State | TanStack Query `^5.104.4` |
| HTTP | axios `^1.20.0` |
| Formulare | React Hook Form `^7.90.0`, Zod `^4.6.7`, `@hookform/resolvers` `^5.2.2` |
| Tests | Vitest `^5.0.5`, Testing Library (`@testing-library/react` `^16.3.3`, `@testing-library/dom`, `@testing-library/jest-dom`), jsdom |
| Qualität | ESLint `^9.39.1` mit `eslint-plugin-react-hooks` `^7.1.1` |

React Compiler 1.0 (`babel-plugin-react-compiler`) läuft über `@rolldown/plugin-babel` in `vite.config.ts`. Er memoisiert Komponenten beim Build; `useMemo`, `useCallback` und `memo` sind im Kurs daher nicht nötig. `<StrictMode>` ist in `src/main.tsx` aktiv und ruft Komponenten und Effekte in der Entwicklung doppelt auf.

## Skripte

| Befehl | Wirkung |
| --- | --- |
| `npm run dev` | Dev-Server mit Hot Reload auf `http://localhost:5173/` |
| `npm run build` | Typprüfung (`tsc -b`) und Produktions-Build nach `dist/` |
| `npm run lint` | ESLint über alle `.ts`- und `.tsx`-Dateien, inklusive React-Hooks-Regeln |
| `npm test` | Vitest im Watch-Modus (`q` beendet) |
| `npm run test:run` | alle Tests einmal ausführen |

## Launcher-URLs

Der Launcher (`src/launcher/`) arbeitet pfadbasiert, ohne eigenen Router.

| URL | Anzeige |
| --- | --- |
| `/` | Startseite mit Liste aller Beispiele |
| `/playground` | eigene Lösung aus `src/playground/App.tsx` |
| `/examples/<modul>/<lab>` | fertige Beispiel-App eines Labs (`index.tsx`) |
| `/examples/<modul>/<lab>/<app-name>` | Variante desselben Labs (`app-<name>.tsx`), z. B. Fehlerbild oder Erweiterung |

## Ordnerstruktur

```text
project/
├── public/
│   └── characters-page-1.json   Offline-Daten (nur Seite 1 der Rick-and-Morty-API)
└── src/
    ├── examples/<mNN-…>/<lNN-…>/  fertige Beispiel-App: index.tsx, Varianten app-*.tsx, Hilfsdateien
    ├── starters/                  Starter-Dateien der Übungen (mNN-lNN-<name>.tsx)
    ├── playground/App.tsx         Arbeitsdatei der Übungen
    ├── shared/character.ts        API_BASE_URL und Typen Character, CharacterPage
    ├── launcher/                  Startseite, Beispiel-Weiche, routerBasename()
    ├── main.tsx                   Einstieg (StrictMode)
    └── index.css                  Tailwind-Import
```

| Ordner | Regel |
| --- | --- |
| `src/examples/` | `index.tsx` und `app-*.tsx` erscheinen automatisch im Launcher; andere Dateien sind Hilfsdateien (Komponenten, Hooks, Tests) |
| `src/starters/` | Inhalt der Starter-Datei nach `src/playground/App.tsx` kopieren, wie im `-exc.md` beschrieben |
| `src/playground/` | Arbeitsbereich; zusätzliche Dateien der Übung (z. B. `api.ts`) liegen daneben |
| `src/shared/` | gemeinsame Typen und `API_BASE_URL` für alle Beispiele und Starter |

Router-Beispiele und -Starter nutzen `routerBasename()` aus `src/launcher/router-basename.ts` (`<BrowserRouter basename={routerBasename()}>`). Der Helper liefert den passenden Pfad im Playground und in den Beispielen.

## Lab → Beispiel-App → Starter

Pfade relativ zu `src/`. Beispiel-App unter `examples/`, Starter unter `starters/`.

| Lab | Beispiel-App | Starter |
| --- | --- | --- |
| 1.1 | `examples/m01-react-start/l01-why-react-and-vite-setup/` | leerer Playground |
| 1.2 | `examples/m01-react-start/l02-javascript-essentials/` (Node-Skripte) | `starters/m01-l02-shopping-list.js` |
| 1.3 | `examples/m01-react-start/l03-jsx-and-typescript-basics/` | `starters/m01-l03-counter-layout.tsx` |
| 2.1 | `examples/m02-state-and-events/l01-counter-without-state/` | `starters/m02-l01-counter-without-state.tsx` |
| 2.2 | `examples/m02-state-and-events/l02-usestate-counter/` | `starters/m02-l02-counter.tsx` |
| 2.3 | `examples/m02-state-and-events/l03-controlled-inputs/` | `starters/m02-l03-input-app.tsx` |
| 2.4 | `examples/m02-state-and-events/l04-lists-and-conditional-rendering/` | `starters/m02-l04-todo-app.tsx` |
| 3.1 | `examples/m03-effects-and-refs/l01-useeffect-basics/` | `starters/m03-l01-two-counters.tsx` |
| 3.2 | `examples/m03-effects-and-refs/l02-live-clock-and-cleanup/` | `starters/m03-l02-clock.tsx` |
| 3.3 | `examples/m03-effects-and-refs/l03-useref/` | `starters/m03-l03-input-and-counter.tsx` |
| 3.4 | `examples/m03-effects-and-refs/l04-countdown-timer/` | `starters/m03-l04-countdown.tsx` |
| 4.1 | `examples/m04-components-and-styling/l01-components-and-props/` | `starters/m04-l01-todo-app.tsx` |
| 4.2 | `examples/m04-components-and-styling/l02-tailwind-styling/` | `starters/m04-l02-todo-inline.tsx` |
| 4.3 | `examples/m04-components-and-styling/l03-reaction-game-challenge/` | `starters/m04-l03-reaction-game.tsx` |
| 5.1 | `examples/m05-api-fetching/l01-fetch-with-promises/` | `starters/m05-l01-gallery.tsx` |
| 5.2 | `examples/m05-api-fetching/l02-async-await-loading-errors/` | `starters/m05-l02-gallery-then.tsx` |
| 5.3 | `examples/m05-api-fetching/l03-axios-and-pagination/` | `starters/m05-l03-gallery-async.tsx` |
| 6.1 | `examples/m06-tanstack-query/l01-usequery-basics/` | `starters/m06-l01-gallery-axios.tsx` |
| 7.1 | `examples/m07-react-router/l01-router-setup-and-links/` | `starters/m07-l01-router-start.tsx` |
| 7.2 | `examples/m07-react-router/l02-route-params-detail-page/` | `starters/m07-l02-router-gallery.tsx` |
| 7.3 | `examples/m07-react-router/l03-layouts-route-objects-loader/` | `starters/m07-l03-routes-start.tsx` |
| 8.1 | `examples/m08-context-and-custom-hooks/l01-prop-drilling/` | `starters/m08-l01-theme-app.tsx` |
| 8.2 | `examples/m08-context-and-custom-hooks/l02-context-api/` | `starters/m08-l02-theme-drilling.tsx` |
| 8.3 | `examples/m08-context-and-custom-hooks/l03-custom-hooks/` | `starters/m08-l03-todo-app.tsx`, Erweiterung `starters/m08-l03-countdown-app.tsx` |
| 9.1 | `examples/m09-forms-and-testing/l01-forms-with-usestate/` | `starters/m09-l01-register-form.tsx` |
| 9.2 | `examples/m09-forms-and-testing/l02-react-hook-form-zod/` | `starters/m09-l02-register-form-state.tsx` |
| 9.3 | `examples/m09-forms-and-testing/l03-vitest-testing-library/` | `starters/m09-l03-calculator.ts`, `m09-l03-calculator.test.ts`, `m09-l03-counter.tsx`, `m09-l03-counter.test.tsx` |
| Transfer | `examples/m09-forms-and-testing/transfer/` | `starters/m09-transfer-explorer.tsx` |

## Offline-Daten

Ist die Rick-and-Morty-API nicht erreichbar, liefert Vite die Kopie `public/characters-page-1.json` unter `/characters-page-1.json`. In Beispielen und Übungen ab Modul 5 ersetzt sie die URL-Zeile der Abfrage; Paging, Detailseiten und Filter funktionieren damit nicht. Einzelheiten: Abschnitt „Offline-Daten statt API“ in [`../00-setup-and-installation.md`](../00-setup-and-installation.md).
