# Lab 9.2: Validierung mit React Hook Form und Zod

**Leitfragen:**

<details>
<summary>Welche Regeln braucht ein Anmeldeformular?</summary>

Pflichtfelder, eine Mindestlänge für Benutzername und Passwort sowie ein gültiges E-Mail-Format. Jede Regel bekommt eine verständliche Fehlermeldung.

</details>

<details>
<summary>Wann soll eine Fehlermeldung erscheinen: beim Tippen oder beim Absenden?</summary>

Beim Tippen in ein noch unberührtes Feld wirken Meldungen aufdringlich. `mode: "onTouched"` prüft erstmals beim Verlassen des Feldes und danach bei jeder Eingabe; der Standard `onSubmit` prüft erst beim Absenden.

</details>

<details>
<summary>Welche Zeilen aus Lab 9.1 fallen weg?</summary>

`useState` für die Felder, `handleChange`, `value` und `onChange` an jedem Input sowie `preventDefault`. `register` und `handleSubmit` übernehmen das.

</details>

<details>
<summary>Warum ist ein Schema gleichzeitig Validierung und Typ?</summary>

Zod beschreibt die Regeln als Laufzeit-Objekt; `z.infer` leitet daraus den TypeScript-Typ ab. Regeln und Typ stammen aus einer Quelle und laufen nicht auseinander.

</details>

- Zod beschreibt Regeln als Schema; React Hook Form verwaltet Felder, Absenden und Fehler.
- Der `zodResolver` verbindet beides.

## Ohne und mit Bibliothek

| Aufgabe | Lab 9.1 (`useState`) | Lab 9.2 (React Hook Form + Zod) |
| --- | --- | --- |
| Werte halten | State-Objekt `form` | von `useForm` verwaltet |
| Feld anbinden | `name`, `value`, `onChange` | `{...register("username")}` |
| Absenden | `onSubmit` mit `preventDefault` | `onSubmit={handleSubmit(onSubmit)}` |
| Regeln | von Hand | Zod-Schema |
| Fehlermeldungen | eigener `errors`-State | `formState.errors` |
| Typ der Werte | handgeschriebener Typ | `z.infer<typeof schema>` |

## Schema mit Zod 4

```tsx
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3, "Mindestens 3 Zeichen"),
  password: z.string().min(8, "Mindestens 8 Zeichen"),
  email: z.email("Ungültige E-Mail-Adresse"),   // Zod 4: z.email() statt z.string().email()
});

// Der Typ entsteht aus dem Schema: { username: string; password: string; email: string }
type FormValues = z.infer<typeof schema>;
```

| Zod | Prüft |
| --- | --- |
| `z.string()` | Text |
| `.min(n, "Meldung")` / `.max(n)` | Länge |
| `z.email("Meldung")` | E-Mail-Format |
| `.regex(/…/, "Meldung")` | beliebiges Muster |
| `z.number()`, `z.boolean()` | Zahl, Wahrheitswert |
| `.optional()` | Feld darf fehlen |
| `schema.safeParse(daten)` | prüft beliebige Daten ohne Formular, liefert `success` und `data` oder `error` |

## Formular mit `useForm`

Referenz-App: `src/examples/m09-forms-and-testing/l02-react-hook-form-zod/index.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),   // Regeln aus dem Schema
    mode: "onTouched",               // erste Prüfung beim Verlassen, danach live
  });

  // Läuft nur bei gültigen Werten; verhindert den Seiten-Reload selbst.
  const onSubmit = (values: FormValues) => {
    console.log("Formular gesendet:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Benutzername
        <input type="text" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </label>
      {/* password und email analog */}
      <button type="submit" disabled={!isValid}>Registrieren</button>
    </form>
  );
};
```

| API | Wirkung |
| --- | --- |
| `register("username")` | liefert `name`, `onChange`, `onBlur` und `ref` für das Input |
| `handleSubmit(onSubmit)` | prüft per Resolver; ruft `onSubmit` nur bei gültigen Werten auf |
| `formState.errors.username?.message` | Fehlermeldung des Feldes aus dem Schema |
| `formState.isValid` | `true`, wenn alle Regeln erfüllt sind |
| `formState.isSubmitting` | `true` während eines asynchronen `onSubmit` |
| `noValidate` am `<form>` | schaltet die Browser-Prüfung ab; Zod übernimmt |

| `mode` | Erste Prüfung |
| --- | --- |
| `"onSubmit"` (Standard) | beim Absenden, danach bei jeder Änderung |
| `"onBlur"` | beim Verlassen des Feldes |
| `"onChange"` | bei jeder Eingabe |
| `"onTouched"` | beim ersten Verlassen, danach bei jeder Eingabe |
| `"all"` | beim Verlassen und bei jeder Eingabe |

- React Hook Form registriert Felder über Refs und liest Werte beim Absenden; nicht jeder Tastendruck löst ein Re-Render aus.
- `isValid` bleibt `false`, bis alle Felder gültig sind; der Button ist so lange deaktiviert.

## Formik in älterem Code

| Formik (Altprojekte, Folien 2024) | React Hook Form |
| --- | --- |
| `<Formik initialValues onSubmit>` | `useForm({ resolver, defaultValues })` |
| `<Field name="email" />` | `<input {...register("email")} />` |
| `<ErrorMessage name="email" />` | `errors.email?.message` |
| Regeln mit Yup | Regeln mit Zod |

Formik hat seit 11/2025 keine neue Version erhalten (Stand 18.10.2026); für neue Projekte ist React Hook Form verbreiteter.

> **Merksatz:** Das Zod-Schema ist die einzige Quelle für Regeln und Typ; das Formular reicht es per `zodResolver` an React Hook Form weiter.

## Fazit

- Schema (Zod) + `useForm` + `zodResolver` ersetzen eigenen State, Handler und Prüflogik.
- `register`, `handleSubmit` und `formState.errors` sind die drei Kernwerkzeuge.
- `mode` steuert, wann Fehlermeldungen erscheinen.

In der Übung wird das Formular aus Lab 9.1 auf React Hook Form und Zod umgestellt.
