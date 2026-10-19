# Lab 4.2 – Übung: Styling mit Tailwind CSS

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m04-l02-todo-inline.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`.
- Kopiere `src/starters/m04-l02-todo-inline.tsx` nach `src/playground/App.tsx`. Der Starter ist die Todo-App aus Lab 4.1 mit Inline-Styles; `TodoItem` steht in derselben Datei.

## Aufgaben

1. Öffne `/playground` und notiere das Aussehen der App (Hintergrund, Abstände, Durchstreichen). Es dient als Vergleich nach der Umstellung.
2. Öffne `vite.config.ts` und `src/index.css` und finde die zwei Stellen, an denen Tailwind eingerichtet ist. Notiere beide Zeilen.
3. Ersetze `styles.container` durch Tailwind-Klassen: Flex-Spalte, zentrierte Ausrichtung, volle Bildschirmhöhe, blauer Hintergrund, weiße Schrift, Abstand nach oben.
4. Gestalte das Eingabefeld mit Tailwind: transparenter Hintergrund, weißer Rahmen, abgerundete Ecken, Innenabstand, größere Schrift, andere Rahmenfarbe bei Fokus.
5. Gestalte die Einträge als Karte: halbtransparenter Hintergrund, Innenabstand, abgerundete Ecken, Schatten, Abstand zwischen den Karten, Hover-Effekt.
6. Ersetze das Durchstreichen per `textDecoration` durch eine dynamische Klasse, die vom State `isDone` abhängt.
7. Setze die Überschrift auf eine kleine Schriftgröße und ab dem Breakpoint `md` auf eine größere. Ändere die Fensterbreite und beobachte die Überschrift.
8. Entferne das `styles`-Objekt und alle `style`-Attribute. Prüfe mit `grep -n "style=" src/playground/App.tsx`, dass nichts übrig ist.

## Checkpoint

- Die App sieht ähnlich aus wie mit Inline-Styles, die Einträge sind jetzt Karten.
- Beim Überfahren eines Eintrags mit der Maus ändert sich seine Hintergrundfarbe.
- Ein angeklickter Eintrag ist durchgestrichen und blasser.
- Die Überschrift wechselt beim Verbreitern des Fensters auf die größere Schrift.
- `grep -n "style=" src/playground/App.tsx` liefert keine Treffer.

## Abschlusskriterien

- Die Datei enthält weder ein `styles`-Objekt noch ein `style`-Attribut.
- Die dynamische Klasse für `isDone` besteht aus vollständigen Klassennamen.
- `npm run lint` meldet für die Datei keine Fehler.
