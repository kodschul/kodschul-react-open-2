# Lab 8.1 – Übung: Theme-App: Props durchreichen

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m08-l01-theme-app.tsx`

## Vorbereitung

- `npm run dev` läuft im Ordner `project/`.
- Kopiere `src/starters/m08-l01-theme-app.tsx` nach `src/playground/App.tsx` und öffne `http://localhost:5173/playground`.
- Die Seite zeigt Titel, Text und einen Button ohne Funktion.

## Aufgaben

1. Lege in `App` den State `isDark` mit Setter `setDark` an (Startwert `false`).
2. Gib `CardContainer` und `TextSection` die Prop `isDark` und typisiere sie (`boolean`).
3. Gib `CardContainer` zusätzlich `setDark` und typisiere sie als Funktion `(isDark: boolean) => void`.
4. Reiche `isDark` und `setDark` von `CardContainer` über `ContentSection` bis `ThemeToggleButton` durch. Ergänze die Props und Typen in jeder Komponente der Kette.
5. Färbe `CardContainer` und `TextSection` abhängig von `isDark` (dunkler Hintergrund mit heller Schrift, hell umgekehrt).
6. Schalte in `ThemeToggleButton` per Klick um (`setDark`) und lasse die Beschriftung je nach Theme wechseln.
7. Zähle die Komponenten, die `isDark` oder `setDark` nur weiterreichen. Notiere das Ergebnis als Kommentar am Dateianfang (`// Durchreicher: …`).

## Checkpoint

- Ein Klick auf den Button wechselt Hintergrund, Textfarbe und Beschriftung.
- Der Editor zeigt keine TypeScript-Fehler.
- Am Dateianfang steht ein Kommentar mit der Liste der Durchreicher.

## Abschlusskriterien

- Der Dark Mode funktioniert über Props; `isDark` und `setDark` stammen ausschließlich aus dem State in `App`.
- Alle Props sind typisiert, kein `any`.
- Die Durchreicher sind benannt.
