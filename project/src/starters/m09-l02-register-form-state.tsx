import { useState, type ChangeEvent, type FormEvent } from "react";

// Starter für Lab 9.2: Formular aus Lab 9.1 mit eigenem State.
// Aufgabe: auf React Hook Form + Zod umstellen (Schema, useForm mit zodResolver, register, Fehlermeldungen).

type FormValues = {
  username: string;
  password: string;
  email: string;
};

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-2 focus:outline-indigo-600";

const App = () => {
  const [form, setForm] = useState<FormValues>({ username: "", password: "", email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formular gesendet:", form);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-100 text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Registrierung</h1>

        <label className="block text-sm font-medium">
          Benutzername
          <input className={inputClass} name="username" type="text" value={form.username} onChange={handleChange} />
        </label>

        <label className="block text-sm font-medium">
          Passwort
          <input className={inputClass} name="password" type="password" value={form.password} onChange={handleChange} />
        </label>

        <label className="block text-sm font-medium">
          E-Mail
          <input className={inputClass} name="email" type="email" value={form.email} onChange={handleChange} />
        </label>

        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
          Registrieren
        </button>
      </form>
    </main>
  );
};

export default App;
