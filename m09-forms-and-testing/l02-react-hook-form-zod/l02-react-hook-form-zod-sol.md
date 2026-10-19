# Lab 9.2 – Lösung: Validierung mit React Hook Form und Zod

## Aufgabe 1: Ausgangsverhalten

Erwartet: Absenden gibt `Formular gesendet: {username: …, password: …, email: …}` aus; ungültige Werte werden nicht geprüft.

## Aufgabe 2: Schema

```tsx
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3, "Mindestens 3 Zeichen"),
  password: z.string().min(8, "Mindestens 8 Zeichen"),
  email: z.email("Ungültige E-Mail-Adresse"),
});
```

Zod 4 kennt `z.email()` als eigenen Baustein; der ältere Aufruf `z.string().email()` ist veraltet.

## Aufgabe 3: Typ aus dem Schema

```tsx
type FormValues = z.infer<typeof schema>;
```

Ändert sich das Schema (z. B. neues Feld), ändert sich der Typ mit; Regeln und Typ bleiben deckungsgleich.

## Aufgabe 4: `useForm`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const {
  register,
  handleSubmit,
  formState: { errors, isValid },
} = useForm<FormValues>({
  resolver: zodResolver(schema),
  mode: "onTouched",
});
```

`mode: "onTouched"` zeigt Meldungen erst nach dem ersten Verlassen eines Feldes. `isValid` wird in diesem Modus laufend berechnet.

## Aufgabe 5: `register`

```tsx
<input className={inputClass} type="text" {...register("username")} />
<input className={inputClass} type="password" {...register("password")} />
<input className={inputClass} type="email" {...register("email")} />
```

`register` liefert `name`, `onChange`, `onBlur` und `ref`. Der Feldname ist typgeprüft: `register("usrname")` ist ein TypeScript-Fehler.

## Aufgabe 6: Absenden

```tsx
const onSubmit = (values: FormValues) => {
  console.log("Formular gesendet:", values);
};

<form onSubmit={handleSubmit(onSubmit)} noValidate className="…">
```

`handleSubmit` verhindert den Reload und ruft `onSubmit` nur bei gültigen Werten auf. `noValidate` verhindert, dass der Browser bei `type="email"` eigene Meldungen zeigt.

## Aufgabe 7: Fehlermeldungen

```tsx
<label className="block text-sm font-medium">
  Benutzername
  <input className={inputClass} type="text" {...register("username")} />
  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
</label>
```

Gleiches Muster für `password` und `email`.

## Aufgabe 8: Button

```tsx
<button
  type="submit"
  disabled={!isValid}
  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-40"
>
  Registrieren
</button>
```

## Aufgabe 9: Erwartetes Verhalten

| Eingabe | Ergebnis |
| --- | --- |
| Benutzername `ab`, Feld verlassen | „Mindestens 3 Zeichen“ unter dem Feld |
| E-Mail `kein-mail`, Feld verlassen | „Ungültige E-Mail-Adresse“ |
| alle Felder gültig | Meldungen weg, Button aktiv |
| Klick auf „Registrieren“ | Konsole: `Formular gesendet: {username: 'morty', password: 'geheim1234', email: 'morty@example.com'}` |

## Alternativen

| Variante | Anmerkung |
| --- | --- |
| `mode: "onChange"` | Meldungen schon beim ersten Tippen |
| `mode: "onSubmit"` (Standard) | Meldungen erst nach dem Absenden |
| Button immer aktiv, Fehler nur bei Submit | gängiges Muster, wenn die Sperre irritiert |

Referenz-App: `src/examples/m09-forms-and-testing/l02-react-hook-form-zod/index.tsx`
