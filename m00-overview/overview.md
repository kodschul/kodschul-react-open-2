# Überblick: Einführung in React

Zweitägiger Einsteigerkurs (täglich 09:00–16:30), auf drei Tage dehnbar. Vom ersten Klick zur App mit Daten aus dem Internet, Routing, Context, Formularen und Tests.

## Ziel

Nach dem Kurs sind folgende Aufgaben ohne fremde Hilfe machbar:

- ein Vite-Projekt starten und eine React-App mit TypeScript lesen
- State, Effekte und Refs gezielt einsetzen (Counter, Todo-App, Live-Uhr, Countdown)
- Daten aus der Rick-and-Morty-API laden, mit Lade- und Fehlerzustand, per `fetch`, axios und TanStack Query
- Seiten mit React Router verbinden, inklusive Detailseite mit URL-Parameter
- Zustand per Context teilen und Logik in eigene Hooks auslagern
- Formulare mit React Hook Form und Zod validieren, Komponenten mit Vitest testen

Nicht Teil des Kurses: HTML-/CSS-Grundkurs, Klassenkomponenten im Detail, Next.js/SSR, State-Libraries wie Redux, Deployment.

## Zielgruppe und Voraussetzungen

| Thema | Angabe |
| --- | --- |
| Zielgruppe | gemischte Gruppe: von ersten Programmierschritten bis zu Entwickelnden aus anderen Sprachen oder Frameworks; Niveau Foundation |
| Vorwissen | keines verpflichtend; HTML/CSS/JavaScript-Grundlagen optional in [`00-prework.md`](../00-prework.md) |
| Rechner | Laptop mit Node.js ≥ 22.22 (empfohlen 24 LTS), npm, VS Code |
| Browser | aktueller Chrome, Firefox oder Edge mit DevTools und React Developer Tools |
| Netz | Zugriff auf `registry.npmjs.org` und `rickandmortyapi.com` |
| Installation | Schritt für Schritt in [`00-setup-and-installation.md`](../00-setup-and-installation.md), mit Fallbacks (ZIP, Offline-Daten) |

## Arbeitsweise

- **Erst ohne, dann mit:** Jedes Konzept beginnt mit einer kleinen App, die ohne das Konzept scheitert (Counter ohne State, Navigation ohne Router, Theme ohne Context). Danach folgt die Lösung mit dem Konzept.
- **Isolierte Beispiel-Apps statt eines Kursprojekts:** Jedes Lab steht für sich; eine verpasste Übung blockiert keine spätere.
- **Playground:** Jede Übung wird in `project/src/playground/App.tsx` bearbeitet und unter `http://localhost:5173/playground` angezeigt.
- **Starter:** Das `-exc.md` nennt die Starter-Datei in `project/src/starters/`; deren Inhalt wird nach `src/playground/App.tsx` kopiert.
- **Referenz-Apps:** Die fertige Lösung jedes Labs liegt in `project/src/examples/` und läuft unter `/examples/<modul>/<lab>`; das `-sol.md` verweist darauf.
- **Pro Lab drei Dateien:** `-thx.md` (Theorie mit Leitfragen), `-exc.md` (Übung), `-sol.md` (Lösung). Pro Modul ein Cheatsheet mit Syntax-Tabellen.
- **Stand:** React 19.3, Vite 8, TypeScript 6, Tailwind 4, React Router 8, TanStack Query 5; React Compiler und StrictMode sind aktiv.

## Aufbau des Kurs-Repos

| Pfad | Inhalt |
| --- | --- |
| [`README.md`](../README.md) | Einstieg, Karte Modul → Handout → Beispiel-App |
| [`m00-overview/`](.) | Überblick, Themen, Glossar, Best Practices, FAQ |
| `00-setup-and-installation.md`, `00-prework.md` | Setup, optionale Vorbereitung |
| `m01-…` bis `m09-…` | Module mit Labs (`lNN-…/`) und Cheatsheet |
| [`project/`](../project/README.md) | lauffähige Vite-App mit Beispielen, Startern und Playground |

## Tag 1: Vom ersten Klick zur interaktiven App

| Zeit | Block | Inhalt |
| --- | --- | --- |
| 09:00–09:15 | Auftakt | Kursablauf, Erfahrungsstand, Leitmotiv „erst ohne, dann mit“ |
| 09:15–10:30 | [Modul 1: Start mit React](../m01-react-start/) (75) | Lab 1.1 Vite-Projekt (30), Lab 1.2 JavaScript-Grundlagen (25), Lab 1.3 JSX und TypeScript (20) |
| 10:30–10:45 | Pause | |
| 10:45–12:15 | [Modul 2: State und Events](../m02-state-and-events/) (90) | Lab 2.1 Counter ohne State (20), Lab 2.2 `useState` (25), Lab 2.3 Controlled Inputs (20), Lab 2.4 Todo-App (25) |
| 12:15–13:15 | Mittagspause | |
| 13:15–14:45 | [Modul 3: Effekte und Refs](../m03-effects-and-refs/) (90) | Lab 3.1 `useEffect` (25), Lab 3.2 Live-Uhr und Cleanup (25), Lab 3.3 `useRef` (20), Lab 3.4 Countdown (20) |
| 14:45–15:00 | Pause | |
| 15:00–16:15 | [Modul 4: Komponenten und Styling](../m04-components-and-styling/) (75) | Lab 4.1 Komponenten und Props (30), Lab 4.2 Tailwind (25), Lab 4.3 Reaktionsspiel (20, Erweiterung) |
| 16:15–16:30 | Tagesabschluss | Recap mit der Tabelle Variable/State/Ref, offene Fragen, Ausblick auf Tag 2 |

## Tag 2: Daten, Seiten und Struktur

| Zeit | Block | Inhalt |
| --- | --- | --- |
| 09:00–09:15 | Tagesauftakt | Recap Tag 1 (Variable, State oder Ref?), Ziel des Tages |
| 09:15–10:30 | [Modul 5: Daten aus einer API laden](../m05-api-fetching/) (75) | Lab 5.1 `fetch` (25), Lab 5.2 `async/await`, Lade- und Fehlerzustand (25), Lab 5.3 axios und Pagination (25) |
| 10:30–10:45 | Pause | |
| 10:45–11:10 | [Modul 6: Server-State mit TanStack Query](../m06-tanstack-query/) (25) | Lab 6.1 `useQuery` (25) |
| 11:10–12:15 | [Modul 7: Seiten und Navigation](../m07-react-router/) (65) | Lab 7.1 Router und Links (25), Lab 7.2 Detailseite mit URL-Parametern (25), Lab 7.3 Layouts, Route-Objekte, Loader (15, Demo, Erweiterung) |
| 12:15–13:15 | Mittagspause | |
| 13:15–14:45 | [Modul 8: Zustand teilen, Logik wiederverwenden](../m08-context-and-custom-hooks/) (90) | Lab 8.1 Props durchreichen (25), Lab 8.2 Context (30), Lab 8.3 eigene Hooks (35) |
| 14:45–15:00 | Pause | |
| 15:00–16:15 | [Modul 9: Formulare und Tests](../m09-forms-and-testing/) (75) | Lab 9.1 Formulare mit `useState` (20), Lab 9.2 React Hook Form und Zod (25), Lab 9.3 Vitest und Testing Library (30) |
| 16:15–16:30 | Kursabschluss | Landkarte der Konzepte, Ausblick (Projektstruktur, Frameworks, Server Components, React-19-Form-Actions, `<ViewTransition>`), Feedback |

## Variante mit 3 Tagen

Inhalt und Reihenfolge bleiben gleich. Mehr Übungszeit, alle Erweiterungen und eine Transferübung kommen hinzu.

| Variante | Tag 1 | Tag 2 | Tag 3 |
| --- | --- | --- | --- |
| 2 Tage (Standard) | m01–m04 | m05–m09 | – |
| 3 Tage | m01–m03 (+ alle Erweiterungen, Lab 2.4 und 3.4 mit mehr Zeit) | m04–m07 (Lab 7.3 als Übung statt Demo) | m08–m09, danach Transferübung „Rick and Morty Explorer“ (≈ 120 min) |

Die Transferübung (Paararbeit) verbindet Galerie mit Pagination und Statusfilter, Detailseite per Router, Favoriten über Context, Tailwind-Layout und einen Komponententest: [`m09-exc.md`](../m09-forms-and-testing/m09-exc.md), Lösung [`m09-sol.md`](../m09-forms-and-testing/m09-sol.md).
