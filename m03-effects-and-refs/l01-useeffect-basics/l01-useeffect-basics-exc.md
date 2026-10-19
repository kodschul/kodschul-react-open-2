# Lab 3.1 – Übung: useEffect – Code beim Start und bei Änderungen

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m03-l01-two-counters.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`, der Playground ist unter `/playground` erreichbar.
- Die Browser-Konsole ist geöffnet (Entwicklertools, Reiter „Konsole“).

## Aufgaben

1. Kopiere `src/starters/m03-l01-two-counters.tsx` nach `src/playground/App.tsx` und öffne `/playground`.
2. Lege zwei States `count1` und `count2` an, ersetze die festen Zahlen im JSX und verbinde die beiden Buttons mit den Settern.
3. Ergänze Effekt 1: Er loggt „Willkommen“ einmal beim Start.
4. Ergänze Effekt 2: Er loggt jede Änderung von `count1` zusammen mit dem aktuellen Wert.
5. Ergänze Effekt 3: Er loggt bei jedem Render, dass sich etwas geändert hat. Ein Dependency-Array fehlt dabei bewusst.
6. Lade die Seite neu, klicke einmal auf „+ Counter 1“ und einmal auf „+ Counter 2“. Notiere pro Aktion, welche Effekte in der Konsole erscheinen, und begründe jede Zeile, auch das doppelte Auftreten beim Laden.
7. Setze den Seitentitel auf „Counter: <Wert von Counter 1>“, zunächst mit einem Effekt (`document.title`). Prüfe den Titel im Browser-Tab nach drei Klicks.
8. Entferne den Titel-Effekt und setze den Titel stattdessen mit `<title>` im JSX.
9. Zeige unter Counter 1 an, ob dessen Wert gerade oder ungerade ist, ohne zusätzlichen State und ohne Effekt.

## Checkpoint

- Nach dem Laden zeigt die Konsole „Willkommen“ (in der Entwicklung doppelt).
- Ein Klick auf „+ Counter 1“ erzeugt Ausgaben von Effekt 2 und Effekt 3.
- Ein Klick auf „+ Counter 2“ erzeugt nur eine Ausgabe von Effekt 3.
- Der Tab-Titel lautet nach drei Klicks „Counter: 3“.

## Abschlusskriterien

- Drei Effekte mit drei verschiedenen Dependency-Arrays laufen.
- Das Protokoll aus Aufgabe 6 liegt als Tabelle mit Begründung vor.
- Der Titel kommt aus `<title>`, nicht aus einem Effekt.
- Gerade/ungerade ist eine berechnete Variable, kein State.
