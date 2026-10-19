# Lab 8.2 – Übung: Context: Globaler Zustand ohne Prop Drilling

**Dauer:** ca. 30 Minuten
**Arbeitsdatei:** `src/playground/App.tsx` und `src/playground/theme-context.ts`
**Starter:** `src/starters/m08-l02-theme-drilling.tsx`

## Vorbereitung

- Kopiere `src/starters/m08-l02-theme-drilling.tsx` nach `src/playground/App.tsx`. Die Datei enthält die Theme-App mit Prop Drilling aus Lab 8.1.
- Öffne `http://localhost:5173/playground` und prüfe, dass der Dark Mode funktioniert.

## Aufgaben

1. Lege `src/playground/theme-context.ts` an. Definiere den Typ `ThemeState` (`isDark`, `setDark`) und exportiere `ThemeContext` über `createContext` mit dem Startwert `null`.
2. Schreibe in derselben Datei den Hook `useTheme()`: Er liest den Context und wirft einen Fehler, wenn der Wert `null` ist.
3. Umschließe in `App` den Inhalt mit `<ThemeContext value={{ isDark, setDark }}>`.
4. Ersetze in `CardContainer`, `ThemeToggleButton` und `TextSection` die Props durch `useTheme()`.
5. Entferne `isDark` und `setDark` aus den Props von `ContentSection` und aus allen Aufrufen. Lösche nicht mehr benötigte Typen.
6. Rendere testweise `<ThemeToggleButton />` außerhalb des Providers und lies die Fehlermeldung. Entferne den Test danach wieder.

## Checkpoint

- Der Dark Mode wechselt Hintergrund, Textfarbe und Beschriftung wie zuvor.
- Keine Komponente außer `App` erhält `isDark` oder `setDark` als Prop.
- Der Testaufruf außerhalb des Providers zeigt die Fehlermeldung aus `useTheme`.

## Abschlusskriterien

- `ThemeContext` wird als `<ThemeContext value={…}>` bereitgestellt, nicht über `.Provider`.
- Verbraucher nutzen `useTheme()`, nicht `useContext` direkt.
- `tsc` und der Editor zeigen keine Fehler.

## Erweiterung

Optional: Merke das Theme im `localStorage`, sodass es ein Neuladen der Seite übersteht. Lies den Startwert beim ersten Render und schreibe ihn beim Umschalten (nicht in einem Effekt).
