import { useState } from "react";

type TodoItemProps = {
  text: string;
  onRemove: (todo: string) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const [isDone, setDone] = useState(false);

  const markAsDone = () => {
    if (!isDone) {
      setDone(true);
    } else {
      // REMOVE

      props.onRemove(props.text);
    }
  };

  return (
    <div
      style={{
        fontSize: 30,
        fontWeight: "semibold",
        marginTop: 10,
        textDecoration: isDone ? "line-through" : "",
      }}
      onClick={markAsDone}
    >
      {props.text}
    </div>
  );
};

export default TodoItem;
