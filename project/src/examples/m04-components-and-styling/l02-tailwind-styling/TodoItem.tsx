import { useState } from "react";

type TodoItemProps = {
  text: string;
  onRemove: (todo: string) => void;
};

const TodoItem = ({ text, onRemove }: TodoItemProps) => {
  const [isDone, setDone] = useState(false);

  const handleClick = () => {
    if (!isDone) {
      setDone(true);
    } else {
      onRemove(text);
    }
  };

  return (
    <div
      // dynamische Klasse: vollständige Klassennamen, die Tailwind beim Scannen findet
      className={`cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-2xl shadow transition-colors hover:bg-white/20 ${
        isDone ? "line-through opacity-60" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default TodoItem;
