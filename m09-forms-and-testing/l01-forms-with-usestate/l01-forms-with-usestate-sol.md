# Lab 9.1 – Lösung: Formulare mit useState

## Aufgabe 1: Verhalten ohne Handler

Erwartet: Nach dem Klick lädt die Seite neu, die Felder sind leer, und die Adresszeile enthält die Werte, z. B. `…/playground?username=morty&password=geheim1234&email=morty%40example.com`. Das ist das Standardverhalten eines `<form>`.

## Aufgabe 2: Typ

```tsx
type FormValues = {
  username: string;
  password: string;
  email: string;
};
```

## Aufgabe 3: State-Objekt

```tsx
const [form, setForm] = useState<FormValues>({ username: "", password: "", email: "" });
```

Ein Objekt statt drei States hält die Felder zusammen; das Ergebnis lässt sich als Ganzes ausgeben.

## Aufgabe 4: `handleChange`

```tsx
import { useState, type ChangeEvent, type FormEvent } from "react";

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

<input name="username" type="text" value={form.username} onChange={handleChange} />
<input name="password" type="password" value={form.password} onChange={handleChange} />
<input name="email" type="email" value={form.email} onChange={handleChange} />
```

`name` und `value` werden vor dem Updater gelesen; `prev` sorgt dafür, dass bei schnellem Tippen kein Feld überschrieben wird.

## Aufgabe 5: `handleSubmit`

```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Formular gesendet:", form);
};

<form onSubmit={handleSubmit} className="…">
```

## Aufgabe 6: Erwartete Ausgabe

```text
Formular gesendet: {username: 'morty', password: 'geheim1234', email: 'morty@example.com'}
```

Die Adresszeile bleibt unverändert, die Felder behalten ihren Inhalt.

## Alternative

| Variante | Anmerkung |
| --- | --- |
| Ein `onChange` pro Feld: `onChange={(e) => setForm({ ...form, username: e.target.value })}` | funktioniert, wiederholt sich aber bei jedem Feld |

Referenz-App: `src/examples/m09-forms-and-testing/l01-forms-with-usestate/index.tsx`
