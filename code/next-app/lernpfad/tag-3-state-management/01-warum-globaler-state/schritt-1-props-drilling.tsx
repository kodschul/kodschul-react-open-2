// ============================================================
// SCHRITT 1 – Props Drilling: Das Problem
// ============================================================
//
// Props Drilling = State durch viele Ebenen weiterreichen,
//                  obwohl die mittleren Ebenen ihn nicht brauchen.
//
// Visualisierung:
//   App (hat "user")
//    └─ Layout (braucht "user" nicht – gibt ihn aber weiter)
//        └─ Header (braucht "user" nicht – gibt ihn aber weiter)
//            └─ UserAvatar (braucht "user" ← hier wird er genutzt)
//
// Problem:
//   ✗ Layout und Header müssen "user" in ihren Props kennen
//   ✗ Jede Umbenennung / Typänderung muss durch alle Ebenen
//   ✗ Schwer zu refaktorieren
//
// Diese Datei zeigt das Problem und dann die Context-Lösung.
// ============================================================

// ── Das Problem: 4 Ebenen Props Drilling ─────────────────────

type User = { name: string; avatar: string };

// Ebene 1: App – hat den State
function App() {
  const user: User = { name: "Rick Sanchez", avatar: "/rick.png" };
  return <Layout user={user} />;
}

// Ebene 2: Layout – braucht user NICHT, reicht ihn nur durch
function Layout({ user }: { user: User }) {
  return (
    <div>
      <Header user={user} /> {/* ← unnötige Weitergabe */}
      <main>Inhalt</main>
    </div>
  );
}

// Ebene 3: Header – braucht user NICHT, reicht ihn weiter
function Header({ user }: { user: User }) {
  return (
    <header>
      <UserAvatar user={user} /> {/* ← immer noch weitergeben */}
    </header>
  );
}

// Ebene 4: UserAvatar – hier wird user TATSÄCHLICH gebraucht
function UserAvatar({ user }: { user: User }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
      <span>{user.name}</span>
    </div>
  );
}

// ============================================================
// Wann ist Props Drilling noch OK?
// ============================================================
//
//   ✓ 1-2 Ebenen: Normal und lesbar
//   ✗ 3+ Ebenen: Context oder globaler State sinnvoller
//
// Faustregel: Wenn ihr euch beim Tippen der Props-Typen wiederholt,
//             ist globaler State wahrscheinlich die bessere Wahl.

export { App };
