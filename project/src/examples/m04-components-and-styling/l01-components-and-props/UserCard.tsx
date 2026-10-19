import type { CSSProperties } from "react";

type User = {
  id: number;
  name: string;
  role: string;
};

type UserCardProps = {
  user: User;
};

const styles = {
  card: {
    padding: 16,
    marginTop: 12,
    border: "2px solid white",
    borderRadius: 8,
    width: 260,
  },
  name: { fontSize: 22, fontWeight: "bold" },
} satisfies Record<string, CSSProperties>;

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div style={styles.card}>
      <div style={styles.name}>{user.name}</div>
      <div>{user.role}</div>
    </div>
  );
};

export type { User };
export default UserCard;
