// ============================================================
// SCHRITT 2 – Context API: Die einfache Lösung
// ============================================================
//
// React Context löst Props Drilling ohne externe Bibliothek.
//
// Drei Schritte:
//   1. createContext()  → erstellt den Context-Container
//   2. Provider         → stellt den Wert bereit
//   3. useContext()     → liest den Wert aus
//
// Wann Context reicht:
//   ✓ Theme (dark/light)
//   ✓ Authentifizierter User
//   ✓ Sprache / Locale
//   ✓ Dinge die sich selten ändern
//
// Wann Context NICHT reicht:
//   ✗ Häufige Updates (z.B. jede Tastatureingabe)
//      → Alle Consumer re-rendern bei jedem Update!
//   ✗ Komplexe async State (Loading/Error/Data)
//   ✗ Zeitreise-Debugging, DevTools
//   → Dann: Redux Toolkit oder Zustand
//
// ============================================================

import { createContext, useContext, useState, ReactNode } from "react";

// ── 1. Context erstellen ──────────────────────────────────────
type User = { name: string; avatar: string };
type UserContextType = { user: User | null; logout: () => void };

// createContext() braucht einen Defaultwert (für Tests/Storybook ohne Provider)
const UserContext = createContext<UserContextType>({
  user: null,
  logout: () => {},
});

// ── 2. Custom Hook – best practice statt useContext direkt ────
//
// Vorteile:
//   ✓ Zeigt Fehler wenn außerhalb Provider verwendet
//   ✓ Kürzerer Import in Konsumenten
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser muss innerhalb von UserProvider verwendet werden");
  }
  return ctx;
}

// ── 3. Provider Component ─────────────────────────────────────
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: "Rick Sanchez",
    avatar: "/rick.png",
  });

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// ── 4. Konsument – kein Props Drilling mehr ───────────────────
// UserAvatar braucht keine Props mehr
function UserAvatar() {
  const { user, logout } = useUser();

  if (!user) return <button onClick={() => {}}>Login</button>;

  return (
    <div className="flex items-center gap-2">
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
      <span>{user.name}</span>
      <button onClick={logout} className="text-sm text-gray-500">
        Logout
      </button>
    </div>
  );
}

// Layout braucht KEINE user-Prop mehr!
function Header() {
  return (
    <header className="flex justify-between p-4 border-b">
      <h1>Meine App</h1>
      <UserAvatar />
    </header>
  );
}

export function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <main className="p-4">Inhalt ohne Props-Drilling</main>
      </div>
    </UserProvider>
  );
}
