# Formulare- und Test-Cheatsheet

Schnellreferenz für Modul 9 (Formulare mit `useState`, React Hook Form + Zod, Vitest + Testing Library).

## Formular mit `useState`

| Syntax | Wirkung |
| --- | --- |
| `const [form, setForm] = useState<FormValues>({ username: "", … })` | ein State-Objekt für alle Felder |
| `<input name="email" value={form.email} onChange={handleChange} />` | Controlled Input; `name` entspricht dem Schlüssel im State |
| `const { name, value } = e.target;` | Feldname und Wert aus dem Event lesen |
| `setForm((prev) => ({ ...prev, [name]: value }))` | genau ein Feld ersetzen, Rest behalten |
| `<form onSubmit={handleSubmit}>` | Handler für Submit-Button und Enter im Feld |
| `e.preventDefault()` | verhindert den Seiten-Reload beim Absenden |
| `ChangeEvent<HTMLInputElement>` | Typ des `onChange`-Events |
| `FormEvent<HTMLFormElement>` | Typ des `onSubmit`-Events |
| `<label>Text<input … /></label>` | Label umschließt das Feld |

## Zod 4: Schema und Typ

| Syntax | Wirkung |
| --- | --- |
| `z.object({ … })` | Schema für ein Objekt |
| `z.string().min(3, "Meldung")` | Text mit Mindestlänge und Fehlermeldung |
| `z.string().max(20)` | maximale Länge |
| `z.email("Meldung")` | gültige E-Mail-Adresse |
| `z.string().regex(/…/, "Meldung")` | Text nach Muster |
| `z.number()`, `z.boolean()` | Zahl, Wahrheitswert |
| `.optional()` | Feld darf fehlen |
| `type FormValues = z.infer<typeof schema>` | TypeScript-Typ aus dem Schema |
| `schema.safeParse(daten)` | prüft Daten; Ergebnis mit `success`, `data` oder `error` |

## React Hook Form

| Syntax | Wirkung |
| --- | --- |
| `import { zodResolver } from "@hookform/resolvers/zod"` | Brücke zwischen Zod und React Hook Form |
| `useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" })` | Formular mit Schema und Prüfzeitpunkt |
| `{...register("username")}` | bindet ein Input an das Feld (`name`, `onChange`, `onBlur`, `ref`) |
| `<form onSubmit={handleSubmit(onSubmit)} noValidate>` | prüft per Schema, ruft `onSubmit` nur bei gültigen Werten auf |
| `formState: { errors }` | Fehler pro Feld |
| `errors.username?.message` | Meldung aus dem Schema |
| `formState: { isValid }` | alle Regeln erfüllt |
| `formState: { isSubmitting }` | asynchrones Absenden läuft |
| `defaultValues: { … }` | Startwerte der Felder |

## Prüfzeitpunkt (`mode`)

| Wert | Erste Prüfung |
| --- | --- |
| `"onSubmit"` | beim Absenden (Standard) |
| `"onBlur"` | beim Verlassen des Feldes |
| `"onChange"` | bei jeder Eingabe |
| `"onTouched"` | beim ersten Verlassen, danach bei jeder Eingabe |
| `"all"` | beim Verlassen und bei jeder Eingabe |

## Vitest ausführen

| Befehl | Wirkung |
| --- | --- |
| `npm test` | Watch-Modus: Tests laufen bei jeder Änderung neu |
| `npx vitest run` | alle Tests einmal ausführen |
| `npx vitest run <pfad>` | nur Tests in Datei oder Ordner |
| `npx vitest run -t "name"` | nur Tests, deren Name den Text enthält |
| `q` im Watch-Modus | beendet den Watch-Modus |
| `*.test.ts`, `*.test.tsx` | Namensmuster für Testdateien |

## Tests schreiben

| Syntax | Wirkung |
| --- | --- |
| `import { describe, it, expect, beforeEach, vi } from "vitest"` | Test-APIs importieren (keine Globals) |
| `describe("Name", () => { … })` | Gruppe zusammengehöriger Tests |
| `it("does x", () => { … })` | ein Test |
| `it.todo("later")` | vorgemerkter Test ohne Inhalt |
| `beforeEach(() => { … })` | läuft vor jedem Test |
| `expect(wert).toBe(2)` | Gleichheit (`===`) |
| `expect(obj).toEqual({ a: 1 })` | gleiche Struktur |
| `expect(wert).not.toBe(2)` | Gegenteil |
| `vi.fn()` | Attrappe einer Funktion |
| `vi.mock("axios")` | Modul durch Attrappe ersetzen |

## Komponenten testen

| Syntax | Wirkung |
| --- | --- |
| `render(<Counter />)` | rendert die Komponente im simulierten Browser (jsdom) |
| `screen.getByRole("button", { name: "+" })` | Element nach Rolle und Beschriftung (wirft bei keinem Treffer) |
| `screen.getByLabelText("E-Mail")` | Eingabefeld nach Label |
| `screen.getByText("Text")` | Element nach sichtbarem Text |
| `screen.getByTestId("countValue")` | Element mit `data-testid="countValue"` |
| `screen.queryByText("Text")` | liefert `null` statt Fehler (Prüfung auf „nicht vorhanden“) |
| `await screen.findByText("Text")` | wartet auf das Element |
| `fireEvent.click(element)` | simuliert einen Klick |
| `fireEvent.change(input, { target: { value: "x" } })` | simuliert eine Eingabe |
| `expect(el).toBeInTheDocument()` | Element steht im DOM |
| `expect(el).toHaveTextContent("101")` | Element enthält Text |
| `expect(el).toBeDisabled()` | Element ist deaktiviert |
| `expect(el).toHaveAttribute("href", "/x")` | Attribut hat den Wert |
