# FAQ: Einführung in React

Häufige Fragen aus Kurs und Übungen, mit kurzer Antwort und Verweis auf das passende Lab. Setup-Probleme ausführlich in [`00-setup-and-installation.md`](../00-setup-and-installation.md).

## Verhalten der App

**Warum läuft mein Effekt doppelt?**
`<StrictMode>` (in `src/main.tsx`) führt Effekte in der Entwicklung absichtlich zweimal aus: Mount → Cleanup → Mount. Im Produktions-Build läuft der Effekt einmal. Läuft dabei ein Timer doppelt, fehlt der Cleanup (Lab 3.1, Lab 3.2).

**Warum tickt die Uhr nach dem Speichern zu schnell?**
Ohne Cleanup laufen mehrere Intervalle parallel. `clearInterval` im Cleanup des Effekts beendet das alte Intervall (Lab 3.2).

**Warum ändert sich die Anzeige nicht?**
Eine normale Variable löst kein neues Rendern aus. Anzeige-Daten gehören in `useState`, geändert über den Setter (Lab 2.1, Lab 2.2). Bei Listen und Objekten zusätzlich ein neues Array oder Objekt übergeben; `push` ändert nur das bestehende (Lab 2.4).

**Warum zeigt das Log nach `setCount` noch den alten Wert?**
`count` ist ein Schnappschuss des aktuellen Renders. Der Setter plant ein neues Rendern ein; der neue Wert gilt erst dort (Lab 2.2). Im Intervall hilft das funktionale Update `setSecs((prev) => prev - 1)` (Lab 3.4).

**Warum steht „RENDERING“ in der Konsole doppelt?**
StrictMode ruft Komponentenfunktionen in der Entwicklung doppelt auf, damit unreine Render auffallen (Lab 2.1).

**Warum lässt sich ins Eingabefeld nicht tippen?**
`value` ohne `onChange` macht das Feld schreibgeschützt. Beides gemeinsam setzen, damit der State die Wahrheit bleibt (Lab 2.3).

**Warum meldet die Konsole „Each child in a list should have a unique key“?**
Listeneinträge brauchen ein eindeutiges, stabiles `key`, bevorzugt eine ID (Lab 2.4).

**Warum lädt die Seite beim Absenden des Formulars neu?**
Der Standard-Submit des Browsers lädt neu. `e.preventDefault()` im `onSubmit`-Handler verhindert das (Lab 9.1).

## Hooks und Struktur

**Brauche ich `useMemo` und `useCallback`?**
In neuen Apps meist nicht. Der React Compiler ist im Kurs-Projekt aktiv und memoisiert beim Build automatisch. In älterem Code stehen die Aufrufe weiterhin (Lab 8.3).

**Warum dürfen Hooks nicht in `if` oder Schleifen stehen?**
React ordnet State anhand der Aufrufreihenfolge zu. Die Regel gilt auch vor einem frühen `return`; der Linter prüft sie (`react-hooks/rules-of-hooks`; Lab 2.2, Lab 8.3).

**Brauche ich einen Effekt, um einen Wert zu berechnen?**
Nein. Ableitbare Werte werden im Render berechnet (`const isEven = count % 2 === 0`); den Seitentitel liefert `<title>` im JSX (Lab 3.1, Lab 3.4).

**State, Ref oder Variable?**
State für alles, was auf dem Bildschirm steht. Ref für Werte, die nur gemerkt werden (Timer-ID, Klickzähler) oder ein DOM-Element. Variable nur als Hilfswert innerhalb eines Renders (Lab 3.3).

**Props oder Context?**
Props reichen für flache Bäume. Ab etwa drei Ebenen Durchreichen lohnt Context, aber nur für wenige, selten wechselnde, breit genutzte Werte (Lab 8.1, Lab 8.2).

**Teilen sich zwei Komponenten mit `useTodos()` dieselbe Liste?**
Nein. Ein eigener Hook teilt Logik, nicht State; jeder Aufruf besitzt eigenen State. Geteilter State braucht Context oder Props (Lab 8.3).

**Wo ist `forwardRef`, und wo sind Klassenkomponenten?**
Seit React 19 ist `ref` ein normales Prop, `forwardRef` taucht nur in älterem Code auf (Lab 4.1). Klassenkomponenten erscheinen nur als Randnotiz zu Altprojekten (Lab 2.2).

## Daten, Routing, Formulare, Tests

**`fetch`, axios oder `useQuery`?**
`fetch` zeigt das Grundprinzip, axios spart `.json()`, `ok`-Prüfung und URL-Bastelei, `useQuery` übernimmt zusätzlich Ladezustand, Fehler, Cache und Wiederholung. Für Server-Daten in echten Projekten ist `useQuery` der Standard (Lab 5.3, Lab 6.1).

**Warum ist die Liste beim ersten Render leer?**
Die Daten kommen erst nach der Antwort. Der erste Render zeigt immer den Startwert (`[]`); Ladeanzeige und Fehlerzustand überbrücken die Wartezeit (Lab 5.1, Lab 5.2).

**Warum wirft `fetch` bei 404 keinen Fehler?**
`fetch` lehnt nur bei fehlender Antwort ab. HTTP-Fehler erkennt `response.ok`; axios wirft bei 4xx/5xx selbst (Lab 5.2, Lab 5.3).

**Warum `Link` statt `<a href>`?**
`<a href>` lädt die ganze Seite neu und verwirft den State. `Link` wechselt nur die Ansicht (Lab 7.1).

**Warum kommt `react-router` und nicht `react-router-dom`?**
Ab React Router 8 gibt es nur noch das Paket `react-router`. `react-router-dom` steht nur noch in älterem Code (Lab 7.1).

**Loader oder `useQuery`?**
Der Loader wartet vor dem Seitenwechsel auf die Daten, `useQuery` zeigt die Seite sofort und lädt danach (Lab 7.3).

**Warum ist Formik nicht dabei?**
Formik hat seit 11/2025 keine neue Version erhalten (Stand 18.10.2026). Für neue Projekte ist React Hook Form mit Zod verbreiteter. Formik erscheint als Übersetzungstabelle für Altcode (Lab 9.2).

**Warum Vitest und nicht Jest?**
Vitest hat eine zu Jest kompatible API und nutzt die Konfiguration von Vite (Plugins, Compiler); eine zweite Build-Konfiguration entfällt. Jest steht in Altprojekten, die Gegenüberstellung steht im Lab (Lab 9.3).

## Kurs-Repo und Setup

**Warum Vite statt Create React App?**
Create React App ist seit 2025 eingestellt und steht nur noch in alten Tutorials. Vite liefert Dev-Server, Hot Reload und Build (Lab 1.1).

**Wo finde ich die Lösung?**
Im `-sol.md` des Labs; es verweist am Ende auf die fertige Referenz-App unter `project/src/examples/<modul>/<lab>/index.tsx`. Der Launcher unter `http://localhost:5173/` listet alle Beispiele.

**Wie beginnt eine Übung?**
Die Starter-Datei aus dem `-exc.md` (`src/starters/…`) nach `src/playground/App.tsx` kopieren und `/playground` öffnen. Der ursprüngliche Inhalt lässt sich bei einem Git-Klon mit `git restore src/playground/App.tsx` wiederherstellen.

**`npm run dev` meldet „Port 5173 is in use“.**
Vite wählt einen anderen Port; die ausgegebene `Local`-Adresse verwenden oder `npm run dev -- --port 3000` starten.

**Die Rick-and-Morty-API ist nicht erreichbar.**
In der Abfrage-Zeile die URL durch `/characters-page-1.json` ersetzen. Die Datei enthält nur Seite 1; Paging und Detailseiten funktionieren damit nicht (siehe Abschnitt „Offline-Daten statt API“ im Setup).

**`npm install` scheitert oder meldet `EBADENGINE`.**
Node.js muss mindestens Version 22.22 haben (empfohlen 24 LTS). Hinter einem Firmenproxy hilft der Abschnitt „Proxy und Firmennetz“ im Setup, sonst das ZIP mit `node_modules`.

**Der Tab „Components“ fehlt in den Entwicklertools.**
Erweiterung React Developer Tools aktivieren, Seite neu laden und Entwicklertools neu öffnen. Ohne die Erweiterung genügen `console.log` und die Komponentenanzeigen in den Handouts.

**Ist die Transferübung Pflicht?**
Nein. Die Übung gehört zur 3-Tage-Variante: [`m09-exc.md`](../m09-forms-and-testing/m09-exc.md), Lösung [`m09-sol.md`](../m09-forms-and-testing/m09-sol.md).
