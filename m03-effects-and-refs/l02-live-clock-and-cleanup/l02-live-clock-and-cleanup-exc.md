# Lab 3.2 – Übung: Live-Uhr – Intervalle und Cleanup

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m03-l02-clock.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`, die Browser-Konsole ist geöffnet.
- Der Playground ist unter `/playground` erreichbar.

## Aufgaben

1. Kopiere `src/starters/m03-l02-clock.tsx` nach `src/playground/App.tsx`.
2. **Stufe a:** Halte die aktuelle Zeit in einem State. Starte in einem Effekt ein Intervall, das den State jede Sekunde aktualisiert und bei jedem Tick „Tick“ loggt, und gib eine Cleanup-Funktion zurück, die das Intervall löscht. Zeige die Zeit mit `toLocaleTimeString("de-DE")` an.
3. Prüfe die Konsole: „Tick“ erscheint einmal pro Sekunde.
4. **Fehlerfall:** Entferne den Cleanup kurz, speichere und beobachte Konsole und Tempo. Notiere, was in der Entwicklung passiert, und stelle den Cleanup danach wieder her.
5. **Stufe b:** Ein Klick auf die Uhrzeit stoppt die Uhr. Speichere die Timer-ID dafür in einem Ref (`useRef<number | undefined>(undefined)`) und lösche das Intervall im Klick-Handler.
6. **Stufe c:** Ersetze den Ref durch einen State `isRunning`. Der Effekt startet das Intervall nur bei `isRunning === true`; `isRunning` steht im Dependency-Array. Ein Klick auf die Uhr setzt den State auf `false`.
7. Füge den Button „Restart“ hinzu, der `isRunning` wieder auf `true` setzt.
8. Teste mehrfaches Stoppen und Neustarten und achte auf „Tick“ in der Konsole.

## Checkpoint

- Nach Stufe a läuft die Uhr, „Tick“ erscheint einmal pro Sekunde.
- Nach Stufe b hält ein Klick die Uhr an, die Konsole zeigt keine Ticks mehr.
- Nach Stufe c startet „Restart“ die Uhr wieder, es erscheint genau ein „Tick“ pro Sekunde.

## Abschlusskriterien

- Die Uhr läuft, stoppt per Klick und startet per „Restart“.
- Pro Sekunde erscheint genau ein „Tick“, auch nach mehreren Neustarts.
- Der Effekt gibt eine Cleanup-Funktion zurück, die das Intervall löscht.
- Das Verhalten ohne Cleanup ist in einem Satz beschrieben.
