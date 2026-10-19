import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Das Schema beschreibt die Regeln und liefert zugleich den TypeScript-Typ.
const schema = z.object({
  username: z.string().min(3, "Mindestens 3 Zeichen"),
  password: z.string().min(8, "Mindestens 8 Zeichen"),
  email: z.email("Ungültige E-Mail-Adresse"),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-2 focus:outline-indigo-600";
const errorClass = "mt-1 text-sm text-red-600";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Erste Prüfung beim Verlassen eines Feldes, danach bei jeder Eingabe.
    mode: "onTouched",
  });

  // handleSubmit ruft die Funktion nur bei gültigen Werten auf und verhindert den Seiten-Reload.
  const onSubmit = (values: FormValues) => {
    console.log("Formular gesendet:", values);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-100 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-2xl font-bold">Registrierung</h1>

        <label className="block text-sm font-medium">
          Benutzername
          <input className={inputClass} type="text" {...register("username")} />
          {errors.username && <p className={errorClass}>{errors.username.message}</p>}
        </label>

        <label className="block text-sm font-medium">
          Passwort
          <input className={inputClass} type="password" {...register("password")} />
          {errors.password && <p className={errorClass}>{errors.password.message}</p>}
        </label>

        <label className="block text-sm font-medium">
          E-Mail
          <input className={inputClass} type="email" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-40"
        >
          Registrieren
        </button>
      </form>
    </main>
  );
};

export default App;
