import type { CSSProperties } from "react";
import UserCard, { type User } from "./UserCard";

// Erweiterung: Eine Liste von Komponenten aus einem Array, die Daten kommen per Props von oben
const users: User[] = [
  { id: 1, name: "Rick Sanchez", role: "Wissenschaftler" },
  { id: 2, name: "Morty Smith", role: "Schüler" },
  { id: 3, name: "Summer Smith", role: "Schülerin" },
];

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#0a52c6",
  color: "white",
  paddingTop: 50,
} satisfies CSSProperties;

const App = () => {
  return (
    <div style={container}>
      <div style={{ fontSize: 30, fontWeight: "bold" }}>Benutzerliste</div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default App;
