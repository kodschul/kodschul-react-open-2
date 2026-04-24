import { produce } from "immer";
type TodoState = {
  todoText: string;
  todos: string[];
};

// type Todo = {
//   addTodo: () => void;
//   removeTodo: (text: string) => void;
//   setTodoDraft: (text: string) => void;
//   clearTodoDraft: () => void;
// };

export const initialState: TodoState = {
  todoText: "",
  todos: ["essen", "trinken", "coden"],
};

export const todoActions = {
  addTodo: () => ({ type: "ADD_TODO" }),
  removeTodo: (text: string) => ({ type: "REMOVE_TODO", payload: text }),
  setTodoDraft: (text: string) => ({ type: "DRAFT_TODO_TEXT", payload: text }),
};

const todoReducer = (
  state: TodoState = initialState,
  action: { type: string; payload?: any }
) => {
  const newState = produce(state, (draft) => {
    switch (action.type) {
      case "ADD_TODO":
        draft.todos = [draft.todoText, ...draft.todos];
        draft.todoText = "";
        break;
      case "REMOVE_TODO":
        draft.todos = draft.todos.filter((x) => x != action.payload);
        break;

      case "DRAFT_TODO_TEXT":
        draft.todoText = action.payload;
        break;
    }
  });

  console.log({ state, newState });

  return newState;
};

export default todoReducer;
