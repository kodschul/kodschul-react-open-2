# Lab 1.1 – Übung: Kurs-App starten und Hot Reload beobachten

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** „leerer Playground“

## Vorbereitung

- Node.js und VS Code sind installiert (siehe `00-setup-and-installation.md`).
- Das Kurs-Repo liegt als Git-Klon oder entpacktes ZIP lokal vor.

## Aufgaben

1. Öffne den Ordner des Kurs-Repos in VS Code und das integrierte Terminal (`Terminal → Neues Terminal`).
2. Wechsle mit `cd project` in den Projektordner.
3. Installiere die Abhängigkeiten mit `npm install`.
4. Starte den Dev-Server mit `npm run dev` und öffne die ausgegebene `Local`-Adresse im Browser.
5. Öffne auf der Startseite das Beispiel „Lab 1.1“ und kehre über „← Übersicht“ zurück.
6. Installiere die Browser-Erweiterung React Developer Tools, öffne die Browser-DevTools und wähle den Tab „Components“.
7. Öffne die Adresse `/playground` im Browser.
8. Öffne `src/playground/App.tsx` und ändere den Text der Überschrift `<h1>`. Speichere die Datei und beobachte Browser und Terminal.
9. Öffne `index.html` und `src/main.tsx` und finde die Zeile, die `main.tsx` lädt, und die Zeile, die die oberste Komponente rendert.

## Checkpoint

- Das Terminal zeigt `ready in … ms` und eine `Local`-Adresse.
- Die Startseite listet die Beispiele, das Beispiel „Lab 1.1“ zeigt drei Komponenten.
- Der Tab „Components“ zeigt einen Baum mit den Komponenten der Seite.
- Die geänderte Überschrift erscheint nach dem Speichern ohne manuelles Neuladen.

## Abschlusskriterien

- Kurs-App läuft lokal unter `localhost`, Startseite und `/playground` sind erreichbar.
- React Developer Tools sind installiert und zeigen einen Komponentenbaum.
- Die Überschrift in `src/playground/App.tsx` ist geändert und im Browser sichtbar.

## Erweiterung (optional)

Lege ein leeres Projekt mit Vite an: `npm create vite@latest hello-react -- --template react-ts`. Wechsle in den neuen Ordner, installiere die Pakete, starte den Dev-Server und ändere einen Text in `src/App.tsx`.

## Fallback

- Ohne Internetzugang zu `registry.npmjs.org`: ZIP-Variante des Kurs-Repos mit vorhandenem `node_modules`-Ordner verwenden; `npm install` entfällt.
- Ohne React Developer Tools: `console.log` und die Komponentenanzeige in den Handouts reichen für alle Labs.
- Weitere Fehlerbilder und Lösungen: `00-setup-and-installation.md`.
