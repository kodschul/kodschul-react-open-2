# Lab 9.1: Formulare mit useState

**Leitfragen:**

<details>
<summary>Warum lädt die Seite ohne `preventDefault` neu?</summary>

Ein `<form>` sendet beim Absenden standardmäßig eine Anfrage an den Server (hier: dieselbe URL mit den Feldern als Query). Der Browser lädt dadurch die Seite neu, und der State geht verloren.

</details>

<details>
<summary>Wie viele States braucht ein Formular mit zehn Feldern?</summary>

Einen: ein Objekt mit allen Feldern und einen gemeinsamen `onChange`-Handler. Zehn einzelne States erzeugen zehn Handler und viel Wiederholung.

</details>

- Ein Formular besteht aus mehreren Controlled Inputs (Lab 2.3), deren Werte zusammen ein Objekt bilden.
- Beim Absenden verhindert `preventDefault` den Seiten-Reload; danach stehen die Werte im State bereit.

## Ein State pro Feld

Der direkte Weg aus Lab 2.3: je Feld ein State und ein Handler.

```tsx
// Drei Felder = drei States und drei onChange-Handler
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

<input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
<input name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
```

## Ein State-Objekt für alle Felder

Referenz-App: `src/examples/m09-forms-and-testing/l01-forms-with-usestate/index.tsx`

```tsx
type FormValues = {
  username: string;
  password: string;
  email: string;
};

const App = () => {
  const [form, setForm] = useState<FormValues>({ username: "", password: "", email: "" });

  // Ein Handler für alle Felder: Das name-Attribut bestimmt, welches Feld sich ändert.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));   // Spread + berechneter Schlüssel
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();                                // kein Seiten-Reload
    console.log("Formular gesendet:", form);           // Werte als ein Objekt
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Benutzername
        <input name="username" type="text" value={form.username} onChange={handleChange} />
      </label>
      {/* password und email analog */}
      <button type="submit">Registrieren</button>
    </form>
  );
};
```

| Baustein | Aufgabe |
| --- | --- |
| `name`-Attribut am Input | verbindet das Feld mit dem Schlüssel im State-Objekt |
| `{ ...prev, [name]: value }` | neues Objekt: alle alten Felder, ein Feld ersetzt (Immutability) |
| `value={form.username}` + `onChange` | Controlled Input; der State ist die einzige Wahrheit |
| `onSubmit` am `<form>` | greift bei Klick auf den Submit-Button und bei Enter im Feld |
| `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>` | Typen der Event-Parameter |

- `<label>` umschließt das Feld: Klick auf den Text fokussiert das Feld, und Tests finden es über den Label-Text.
- `type="submit"` ist der Standard für Buttons in einem Formular; `type="button"` löst kein Absenden aus.

## Tailwind-Layout

```tsx
const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 focus:outline-2 focus:outline-indigo-600";

<form className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
```

`space-y-4` setzt Abstände zwischen den Feldern, `max-w-md` begrenzt die Breite, `focus:outline-2` markiert das aktive Feld.

## Grenzen der Handarbeit

| Anforderung | Aufwand ohne Bibliothek |
| --- | --- |
| Fehlermeldung pro Feld | zweites State-Objekt `errors`, pro Feld eine Regel |
| Prüfung beim Verlassen oder Tippen | zusätzliche Handler und State für „berührt“ |
| Typen der Felder | Typ und Prüflogik doppelt pflegen |
| Button nur bei gültigem Formular aktiv | alle Regeln bei jeder Änderung neu auswerten |

> **Merksatz:** Formularwerte gehören in ein State-Objekt, `preventDefault` gehört in jeden `onSubmit`-Handler.

## Fazit

- Ein State-Objekt mit `[name]: value` ersetzt einen State pro Feld.
- `preventDefault` verhindert den Seiten-Reload beim Absenden.
- Validierung von Hand wächst schnell; Lab 9.2 übernimmt sie mit einer Bibliothek.

In der Übung entsteht das Registrierungsformular mit Konsolenausgabe.
