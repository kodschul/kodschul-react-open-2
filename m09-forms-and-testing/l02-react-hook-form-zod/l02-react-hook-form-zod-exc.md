# Lab 9.2 – Übung: Validierung mit React Hook Form und Zod

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m09-l02-register-form-state.tsx`

## Vorbereitung

- `npm run dev` läuft im Ordner `project/`.
- Kopiere `src/starters/m09-l02-register-form-state.tsx` nach `src/playground/App.tsx` und öffne `http://localhost:5173/playground`. Die Datei enthält das Formular aus Lab 9.1 mit eigenem State.
- Die Pakete `react-hook-form`, `zod` und `@hookform/resolvers` sind im Projekt installiert.

## Aufgaben

1. Prüfe, dass das Formular beim Absenden die Werte in die Konsole schreibt.
2. Definiere ein Zod-Schema `schema` mit diesen Regeln und deutschen Fehlermeldungen: Benutzername mindestens 3 Zeichen, Passwort mindestens 8 Zeichen, E-Mail im gültigen Format.
3. Leite den Typ `FormValues` mit `z.infer` aus dem Schema ab und entferne den handgeschriebenen Typ.
4. Ersetze `useState` und `handleChange` durch `useForm<FormValues>` mit `zodResolver(schema)` und `mode: "onTouched"`.
5. Binde jedes Input per `register("<feldname>")` an und entferne `name`, `value` und `onChange`.
6. Nutze `handleSubmit(onSubmit)` am `<form>`, schreibe `onSubmit` (Werte in die Konsole) und setze `noValidate` am `<form>`. Entferne den alten `handleSubmit`.
7. Zeige unter jedem Feld die Fehlermeldung aus `formState.errors`.
8. Deaktiviere den Button, solange das Formular ungültig ist.
9. Teste ungültige Eingaben (zu kurzer Name, E-Mail ohne `@`) und danach gültige Eingaben.

## Checkpoint

- Nach dem Verlassen eines Feldes mit ungültigem Inhalt erscheint die Meldung darunter und verschwindet nach Korrektur beim Tippen.
- Der Button bleibt deaktiviert, bis alle drei Felder gültig sind.
- Die Konsole zeigt nach dem Absenden ein Objekt mit den drei Werten.

## Abschlusskriterien

- Kein `useState` für Formularfelder, kein `onChange` an den Inputs.
- `FormValues` stammt aus `z.infer`.
- Der Editor zeigt keine TypeScript-Fehler; Tippfehler in `register("…")` werden gemeldet.
