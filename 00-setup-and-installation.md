# Setup und Installation

Diese Anleitung bringt das Kurs-Repo auf dem Laptop zum Laufen, in der Reihenfolge der Abschnitte. Nach den Installationsschritten steht jeweils eine Prüfung.

## Checkliste

| Werkzeug | Version | Prüfung |
| --- | --- | --- |
| Node.js | mindestens 22.22, empfohlen 24 LTS | `node -v` |
| npm | wird mit Node.js installiert (10 oder neuer) | `npm -v` |
| VS Code | aktuell | `code --version` oder Start des Programms |
| Browser | aktueller Chrome, Firefox oder Edge | Entwicklertools mit `F12` |
| React Developer Tools | Browser-Erweiterung | Tab „Components“ in den Entwicklertools |
| Git (optional) | aktuell | `git --version` |
| Netzzugang | `registry.npmjs.org`, `rickandmortyapi.com` | siehe Abschnitt „Proxy und Firmennetz“ |

## Node.js installieren

React Router 8 und Vitest 5 setzen Node.js 22.22 oder neuer voraus. Empfohlen ist die aktuelle LTS-Version (24).

| Weg | Vorgehen |
| --- | --- |
| Installer | LTS-Version von [nodejs.org](https://nodejs.org) herunterladen und mit den Standardoptionen installieren |
| Versionsverwaltung (macOS, Linux) | `nvm install 24` und `nvm use 24` (nvm) oder `fnm install 24` (fnm) |
| Versionsverwaltung (Windows) | nvm-windows oder fnm: `nvm install 24`, `nvm use 24` |

Danach ein neues Terminal öffnen und prüfen:

```bash
node -v
npm -v
```

Erwartet: `node -v` zeigt `v22.22.0` oder höher (empfohlen `v24.x.x`), `npm -v` zeigt eine Versionsnummer.

## VS Code und Browser-Erweiterung

1. VS Code von [code.visualstudio.com](https://code.visualstudio.com) installieren.
2. Optional die Erweiterung „ESLint“ installieren; sie zeigt Linter-Meldungen (z. B. zu Hooks) direkt im Editor.
3. React Developer Tools im Erweiterungsstore des Browsers installieren (Links: [react.dev/learn/react-developer-tools](https://react.dev/learn/react-developer-tools)).
4. Nach der Installation die Seite neu laden. Auf React-Seiten erscheinen in den Entwicklertools die Tabs „Components“ und „Profiler“.

Ohne die Erweiterung ist der Kurs vollständig machbar: `console.log` und die Komponentenanzeigen in den Handouts ersetzen die Developer Tools.

## Kurs-Repo bekommen

| Variante | Vorgehen |
| --- | --- |
| Git-Klon | `git clone <URL-des-Kurs-Repos>` im gewünschten Ordner ausführen, danach `cd <repo-ordner>` |
| ZIP | Archiv in einen Ordner entpacken, der nicht von OneDrive, Dropbox o. Ä. synchronisiert wird |
| ZIP inklusive `node_modules` | wie ZIP; `npm install` entfällt (siehe Abschnitt „Fallbacks“) |

Das Repo enthält Handouts und lauffähigen Code. Der Code liegt im Ordner `project/`.

```text
<repo-ordner>/
├── m00-overview/          Überblick, Glossar, FAQ
├── mNN-<modul>/           Handouts je Lab (Theorie, Übung, Lösung) und Cheatsheet
├── 00-setup-and-installation.md
└── project/               lauffähige Vite-App
    ├── src/examples/      fertige Beispiel-App je Lab
    ├── src/playground/    Arbeitsdatei App.tsx für die Übungen
    ├── src/starters/      Starter-Dateien der Übungen
    └── public/            statische Dateien (u. a. Offline-Daten)
```

## Projekt installieren und starten

Alle npm-Befehle laufen im Ordner `project/`, weil dort `package.json` liegt.

```bash
cd project
npm install
npm run dev
```

| Befehl | Wirkung |
| --- | --- |
| `npm install` | lädt alle Pakete nach `node_modules/` (einmalig, dauert je nach Netz bis zu einigen Minuten) |
| `npm run dev` | startet den Dev-Server mit Hot Reload |

Erwartete Ausgabe von `npm run dev` (Version und Zeit weichen ab):

```text
  VITE v8.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Die `Local`-Adresse im Browser öffnen. Das Terminal bleibt geöffnet, solange der Dev-Server läuft; `Strg + C` beendet ihn.

## Startseite, Beispiele und Playground

Der Launcher (`src/launcher/`) zeigt je nach Adresse eine andere Seite. Eine Konfiguration oder ein Router ist nicht nötig.

| Adresse | Anzeige |
| --- | --- |
| `http://localhost:5173/` | Startseite mit allen Beispiel-Apps nach Modulen |
| `http://localhost:5173/examples/<modul>/<lab>` | fertige Beispiel-App eines Labs |
| `http://localhost:5173/examples/<modul>/<lab>/app-<name>` | Variante desselben Labs (Fehlerbild oder Erweiterung) |
| `http://localhost:5173/playground` | eigene Lösung aus `src/playground/App.tsx` |

Arbeitsweise für Übungen:

1. Im `-exc.md` des Labs steht die Starter-Datei, z. B. `src/starters/m02-l02-counter.tsx`.
2. Den Inhalt der Starter-Datei nach `src/playground/App.tsx` kopieren und speichern.
3. `/playground` im Browser öffnen; jede gespeicherte Änderung erscheint sofort (Hot Reload).
4. Die Lösung im `-sol.md` des Labs vergleichen; die fertige App liegt unter `src/examples/`.

Der ursprüngliche Inhalt von `src/playground/App.tsx` lässt sich bei einem Git-Klon mit `git restore src/playground/App.tsx` wiederherstellen.

## Prüfen mit Linter, Tests und Build

| Befehl | Wirkung |
| --- | --- |
| `npm run lint` | ESLint prüft alle `.ts`- und `.tsx`-Dateien, inkl. React-Hooks-Regeln |
| `npx eslint src/playground/App.tsx` | prüft nur die Arbeitsdatei |
| `npm test` | startet Vitest im Watch-Modus; `q` beendet |
| `npm run test:run` | führt alle Tests einmal aus |
| `npm run build` | prüft Typen (`tsc -b`) und erzeugt den Build in `dist/` |
| `npx tsc -p tsconfig.app.json --noEmit` | prüft nur die Typen |

Einzelne Beispiele zeigen absichtlich Fehlerbilder. Sie tragen bei Bedarf am Dateianfang einen `eslint-disable`-Kommentar mit Begründung, damit `npm run lint` sauber bleibt.

## Fallbacks

| Situation | Lösung |
| --- | --- |
| `npm install` scheitert oder ist gesperrt | bereitgestelltes ZIP des Kurs-Repos **inklusive `node_modules`** verwenden |
| Rick-and-Morty-API gesperrt oder nicht erreichbar | lokale Kopie `project/public/characters-page-1.json` verwenden |
| React Developer Tools lassen sich nicht installieren | `console.log` und die Komponentenanzeigen in den Handouts verwenden |
| Lokale Installation unmöglich | StackBlitz im Browser (letzte Option, nur falls im Firmennetz erlaubt; `prüfen`) |

### ZIP mit node_modules

Der Ordner `node_modules` enthält Programmteile, die zum Betriebssystem und zur Prozessorart passen (z. B. macOS mit Apple-Chip, Windows 64 Bit). Das ZIP funktioniert deshalb nur auf einem Rechner derselben Art; je Betriebssystem ist ein eigenes ZIP nötig. Bei Fehlern zu fehlenden nativen Modulen (z. B. `@rolldown/binding-…`) hilft ein `npm install` bei vorhandenem Netz.

Ablauf: ZIP entpacken, `cd project`, `npm run dev`. Node.js muss in der geforderten Version installiert sein.

### Offline-Daten statt API

Die Datei `project/public/characters-page-1.json` hat dieselbe Struktur wie die API-Antwort (`info` und `results` mit 20 Charakteren der Seite 1). Vite liefert sie unter `/characters-page-1.json` aus.

In den Beispielen und Übungen ab Modul 5 steht eine Zeile mit der Abfrage-URL (`fetch` oder `axios`). Nur diese Zeile wird ersetzt:

```ts
// Online (Standard)
const url = `${API_BASE_URL}/character?page=1`;

// Offline-Fallback: lokale Datei
const url = "/characters-page-1.json";
```

`API_BASE_URL` in `src/shared/character.ts` bleibt unverändert. Einschränkung: Die Datei enthält nur Seite 1. Seitenwechsel (Paging), Detailseiten und Filter über die API funktionieren damit nicht.

### StackBlitz

StackBlitz startet das Projekt im Browser ohne lokale Installation. Ob der Dienst im Firmennetz erreichbar ist und ob Node-Version und Projektkonfiguration dort funktionieren, ist vor dem Kurs zu prüfen (`prüfen`). Es ist nur der letzte Ausweg.

## Proxy und Firmennetz

Hinter einem Firmenproxy scheitern `npm install` und Browser-Abfragen häufig an Proxy oder Zertifikaten.

| Einstellung | Befehl |
| --- | --- |
| npm-Proxy setzen | `npm config set proxy http://<proxy>:<port>` und `npm config set https-proxy http://<proxy>:<port>` |
| Eigenes Firmenzertifikat | `npm config set cafile <pfad-zur-zertifikatsdatei>` |
| Interne Paketquelle | `npm config set registry <url-der-paketquelle>` |
| Einstellung prüfen | `npm config get proxy`, `npm config get https-proxy` |
| Einstellung entfernen | `npm config delete proxy` |

`npm config set strict-ssl false` schaltet die Zertifikatsprüfung ab und ist keine Lösung. Proxy-Adresse, Zertifikat und Paketquelle gibt die IT-Abteilung vor. Die Rick-and-Morty-API wird vom Browser aufgerufen; dort gelten die Proxy-Einstellungen des Browsers.

## Häufige Probleme

| Problem | Ursache | Lösung |
| --- | --- | --- |
| `node: command not found` oder `npm` wird nicht erkannt | Node.js fehlt oder Terminal kennt den neuen Pfad noch nicht | Node.js installieren, Terminal und VS Code neu starten, `node -v` prüfen |
| Warnung `EBADENGINE` bei `npm install` | Node.js älter als 22.22 | Node.js auf 22.22 oder neuer (empfohlen 24 LTS) aktualisieren |
| `npm error enoent … package.json` | Befehl im falschen Ordner | `cd project` und Befehl wiederholen |
| `npm install` hängt oder endet mit `ETIMEDOUT`, `ENOTFOUND` oder `EAI_AGAIN` | kein Zugriff auf `registry.npmjs.org` | Netz prüfen, Abschnitt „Proxy und Firmennetz“, sonst ZIP mit `node_modules` |
| `SELF_SIGNED_CERT_IN_CHAIN` oder `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` | Firmenproxy ersetzt Zertifikate | `npm config set cafile …` mit dem Firmenzertifikat |
| `EACCES` (Zugriff verweigert) bei `npm install` | Projekt in geschütztem Ordner | Repo in einen Ordner im eigenen Benutzerverzeichnis legen; kein `sudo` verwenden |
| `npm.ps1 cannot be loaded because running scripts is disabled` (Windows PowerShell) | Skriptausführung gesperrt | Terminal „Eingabeaufforderung“ (cmd) verwenden oder `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` ausführen |
| `npm run dev` meldet `Port 5173 is in use` und wählt einen anderen Port | Port belegt | die ausgegebene `Local`-Adresse verwenden oder `npm run dev -- --port 3000` |
| Browser zeigt „Beispiel nicht gefunden“ | falsche Adresse | `http://localhost:5173/` öffnen und das Beispiel über die Liste wählen |
| Änderung erscheint nicht im Browser | Datei nicht gespeichert, falsche Datei oder Dev-Server beendet | speichern (`Strg`/`Cmd` + `S`), `src/playground/App.tsx` prüfen, Terminal auf Fehler prüfen, `npm run dev` neu starten |
| Roter Fehlerbildschirm im Browser | Syntaxfehler im Code | Meldung lesen, Zeile im Editor korrigieren, speichern; die Seite lädt selbst neu |
| Fehler zu fehlenden nativen Modulen (z. B. `@rolldown/binding-…`) | `node_modules` stammt von einem anderen Betriebssystem | `node_modules` löschen und `npm install` ausführen oder ZIP für das eigene Betriebssystem verwenden |
| Tab „Components“ fehlt in den Entwicklertools | Erweiterung fehlt, ist deaktiviert oder Seite wurde nicht neu geladen | Erweiterung aktivieren, Seite neu laden, Entwicklertools neu öffnen |
| Beispiel mit Rick-and-Morty-API zeigt „Failed to fetch“ oder bleibt leer | API gesperrt oder kein Netz | Abschnitt „Offline-Daten statt API“ |
| `npm run lint` meldet Fehler in der eigenen Datei | Regelverstoß, z. B. Hook in einer Bedingung | Meldung lesen; die Regel nennt das Problem (`react-hooks/…`) |
