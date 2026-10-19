import { useState } from "react";

// Props mit TypeScript-Typ: onRemove ist ein Callback, mit dem das Kind dem Elternteil Bescheid gibt
type TodoItemProps = {
  text: string;
  onRemove: (todo: string) => void;
};

const TodoItem = ({ text, onRemove }: TodoItemProps) => {
  // lokaler State: gehört nur diesem Item
  const [isDone, setDone] = useState(false);

  // erster Klick streicht durch, zweiter Klick entfernt
  const handleClick = () => {
    if (!isDone) {
      setDone(true);
    } else {
      onRemove(text);
    }
  };

  return (
    <div
      style={{
        fontSize: 30,
        marginTop: 10,
        cursor: "pointer",
        textDecoration: isDone ? "line-through" : "none",
      }}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default TodoItem;
