# Lab 2.1 – Übung: Counter ohne State untersuchen

**Dauer:** ca. 15 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m02-l01-counter-without-state.tsx`

## Vorbereitung

- Dev-Server läuft (`npm run dev` im Ordner `project/`).
- Browser-DevTools sind geöffnet (Tab „Console“), die Adresse `/playground` ist geladen.

## Aufgaben

1. Kopiere den Inhalt von `src/starters/m02-l01-counter-without-state.tsx` nach `src/playground/App.tsx` und speichere.
2. Lade `/playground` neu und notiere, wie oft `RENDERING` in der Konsole steht.
3. Leere die Konsole, klicke dreimal auf „+“ und einmal auf „–“. Notiere die Konsolenausgaben und die angezeigte Zahl nach jedem Klick.
4. Wähle im Tab „Components“ der React Developer Tools die Komponente `App` und notiere, ob dort ein State-Eintrag steht.
5. Schreibe als Kommentar an den Anfang von `src/playground/App.tsx` einen Satz, der erklärt, warum die Anzeige stehen bleibt.
6. Entferne die erste Zeile der Datei (`eslint-disable …`), führe im Terminal `npx eslint src/playground/App.tsx` aus und notiere die Regel und die Meldung. Stelle die Zeile danach wieder her.

## Checkpoint

- Die Konsole zeigt nach den Klicks `UP 101`, `UP 102`, `UP 103`, `DOWN 102`; die Seite zeigt weiterhin `100`.
- Bei den Klicks erscheint kein neues `RENDERING`.
- Der Linter nennt eine Regel zum Zuweisen von Variablen nach dem Rendern.
- Der Kommentar enthält genau eine Hypothese in einem Satz.

## Abschlusskriterien

- Konsole und Anzeige sind verglichen, der Widerspruch ist benannt.
- Die Hypothese steht als Kommentar in `src/playground/App.tsx`.

## Fallback

Ohne React Developer Tools entfällt Aufgabe 4; Konsole und Anzeige reichen als Beleg.
