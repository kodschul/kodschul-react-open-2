# Lab 1.1 – Lösung: Kurs-App starten und Hot Reload beobachten

## Aufgabe 1: Ordner in VS Code öffnen

`Datei → Ordner öffnen …` und den Ordner des Kurs-Repos wählen (nicht `project/` allein, damit die Handouts im Explorer sichtbar bleiben). Terminal: `Terminal → Neues Terminal`.

## Aufgabe 2: In den Projektordner wechseln

```bash
cd project
```

Alle npm-Befehle laufen in diesem Ordner, weil dort `package.json` liegt.

## Aufgabe 3: Abhängigkeiten installieren

```bash
npm install
```

Erwartete Ausgabe (Zahlen weichen ab):

```text
added 3xx packages, and audited 3xx packages in 20s
```

Danach existiert der Ordner `node_modules/`. Warnungen zu `deprecated` oder `audit` sind für den Kurs unkritisch; Fehlermeldungen siehe `00-setup-and-installation.md`.

## Aufgabe 4: Dev-Server starten

```bash
npm run dev
```

Erwartete Ausgabe (Version und Zeit weichen ab):

```text
  VITE v8.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Die `Local`-Adresse im Browser öffnen (`Cmd`/`Strg` + Klick im Terminal oder manuell eintippen). Das Terminal bleibt offen; `Strg + C` beendet den Server.

## Aufgabe 5: Startseite und Beispiel

Die Startseite listet alle Beispiel-Apps nach Modulen. Ein Klick auf „Lab 1.1: why react and vite setup“ zeigt die Seite aus `src/examples/m01-react-start/l01-why-react-and-vite-setup/index.tsx`. Der Link „← Übersicht“ unten rechts führt zurück.

## Aufgabe 6: React Developer Tools

Die Erweiterung gibt es im Erweiterungsstore von Chrome, Firefox und Edge (Links: [react.dev/learn/react-developer-tools](https://react.dev/learn/react-developer-tools)). Nach der Installation erscheinen in den Browser-DevTools (`F12`) die Tabs „Components“ und „Profiler“. Im Tab „Components“ steht der Baum, im Beispiel „Lab 1.1“ mit `App`, `Header`, `Intro` und `Footer`.

## Aufgabe 7: Playground öffnen

`http://localhost:5173/playground` zeigt die Komponente aus `src/playground/App.tsx` mit der Überschrift „Playground“.

## Aufgabe 8: Überschrift ändern

```tsx
const App = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Hallo React</h1>
      <p>Änderungen an dieser Datei erscheinen sofort im Browser.</p>
    </main>
  );
};

export default App;
```

Nach dem Speichern (`Strg`/`Cmd` + `S`) ändert sich die Überschrift in wenigen Millisekunden, die Adresse bleibt unverändert. Das Terminal protokolliert die Änderung, z. B. `hmr update /src/playground/App.tsx`. Ein manuelles Neuladen ist nicht nötig.

## Aufgabe 9: Einstiegspunkt finden

- `index.html`: `<script type="module" src="/src/main.tsx"></script>` lädt `main.tsx`.
- `src/main.tsx`: `createRoot(document.getElementById("root")!).render(…)` rendert die oberste Komponente, im Kurs-Repo den `Launcher`, der je nach Adresse Startseite, Beispiel oder Playground zeigt.

## Erweiterung

```bash
cd ..
npm create vite@latest hello-react -- --template react-ts
cd hello-react
npm install
npm run dev
```

Der Assistent stellt je nach Version Rückfragen (z. B. zum direkten Installieren und Starten); die Vorgaben bestätigen. In `src/App.tsx` einen Text ändern; die Anzeige aktualisiert sich per Hot Reload.

Referenz-App: `src/examples/m01-react-start/l01-why-react-and-vite-setup/index.tsx`
