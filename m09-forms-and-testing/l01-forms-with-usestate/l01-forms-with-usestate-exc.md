# Lab 9.1 – Übung: Formulare mit useState

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m09-l01-register-form.tsx`

## Vorbereitung

- `npm run dev` läuft im Ordner `project/`.
- Kopiere `src/starters/m09-l01-register-form.tsx` nach `src/playground/App.tsx` und öffne `http://localhost:5173/playground`.
- Öffne die Browser-Konsole (F12).

## Aufgaben

1. Tippe Werte in alle Felder, klicke „Registrieren“ und beobachte Adresszeile und Seite.
2. Definiere den Typ `FormValues` mit den drei Feldern `username`, `password` und `email` (alle `string`).
3. Lege einen State `form` mit diesem Typ und leeren Startwerten an.
4. Schreibe einen Handler `handleChange`, der das Feld über das `name`-Attribut des Inputs aktualisiert. Setze an allen drei Inputs `value` und `onChange`.
5. Schreibe einen Handler `handleSubmit`, der das Neuladen der Seite verhindert und `form` in die Konsole schreibt. Hänge ihn an das `<form>`.
6. Fülle das Formular aus, sende es ab und prüfe Konsole, Adresszeile und Felder.

## Checkpoint

- Die Konsole zeigt ein Objekt mit den drei eingegebenen Werten.
- Die Seite lädt beim Absenden nicht neu; die Adresszeile bleibt unverändert.
- Die Felder behalten nach dem Absenden ihren Inhalt.

## Abschlusskriterien

- Es gibt genau einen State für alle Felder, keinen State pro Feld.
- Ein gemeinsamer `handleChange` bedient alle drei Inputs.
- Die Typen der Event-Parameter sind gesetzt, kein `any`.
