# Lab 1.3 – Übung: Statisches Counter-Layout und Typ `Character`

**Dauer:** ca. 15 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m01-l03-counter-layout.tsx`

## Vorbereitung

- Dev-Server läuft (`npm run dev` im Ordner `project/`).
- Die Adresse `/playground` ist im Browser geöffnet.

## Aufgaben

1. Kopiere den Inhalt von `src/starters/m01-l03-counter-layout.tsx` nach `src/playground/App.tsx` und speichere. Der Playground zeigt die Überschrift „Counter App“.
2. Lege oberhalb des `return` eine Konstante `startValue` mit dem Wert `100` an und zeige sie unter der Überschrift per `{}` in einem eigenen Element an.
3. Gib dem Element mit der Zahl über das Attribut `style` eine Schriftgröße von 40 und fette Schrift.
4. Ergänze unter der Zahl zwei Buttons mit den Beschriftungen „+“ und „–“. Die Buttons haben noch keine Funktion.
5. Definiere oberhalb der Komponente einen `type Character` mit den Feldern `id` (Zahl), `name`, `species`, `image` (Texte) und `status` (nur die Werte `"Alive"`, `"Dead"` und `"unknown"`).
6. Lege ein Objekt `rick` vom Typ `Character` an und zeige seinen Namen und Status in einem Absatz unter den Buttons an.
7. Setze testweise `id: "1"` im Objekt `rick`, notiere die Meldung des Editors und korrigiere den Wert wieder.

## Checkpoint

- Der Playground zeigt Titel, Zahl `100`, die Buttons „+“ und „–“ und den Absatz mit dem Charakternamen.
- Ein Klick auf die Buttons bewirkt nichts.
- Der Editor markiert `id: "1"` rot und nennt den erwarteten Typ `number`.

## Abschlusskriterien

- Das Layout wird ohne Fehler in Browser und Konsole angezeigt.
- `type Character` verwendet eine Union für `status`; `rick` ist ohne Typfehler.
- Der Startwert kommt aus der Variablen, nicht als fester Text im JSX.

## Erweiterung (optional)

Ergänze im Typ `Character` das optionale Feld `type?: string` und lege einen zweiten Charakter ohne dieses Feld an. Prüfe, dass der Editor beide Objekte akzeptiert.
