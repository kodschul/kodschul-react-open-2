import { create } from "zustand";

import { persist } from "zustand/middleware";

type TodoStore = {
  todoText: string;
  todos: string[];

  addTodo: () => void;

  removeTodo: (text: string) => void;
  setTodoDraft: (text: string) => void;
  clearTodoDraft: () => void;
};

const useTodoPersist = create<TodoStore>()(
  persist(
    (set) => ({
      todoText: "",
      todos: ["essen", "trinken", "coden"],
      test: "",

      count: 0,

      addTodo: () =>
        set((state) => {
          //   state.todos = [state.todoText, ...state.todos];
          //   state.todoText = "";

          return { todos: [state.todoText, ...state.todos] };
        }),

      removeTodo: (todo: string) =>
        set((state) => {
          state.todos = state.todos.filter((x) => x != todo);

          return { ...state };
        }),

      clearTodoDraft: () => set((state) => ({ ...state, todoText: "" })),
      setTodoDraft: (draftText: string) =>
        set((state) => ({ ...state, todoText: draftText })),
    }),
    {
      name: "todo-store_sample",
    }
  )
);

const _useTodoStore = create<TodoStore>((set) => ({
  todoText: "",
  todos: ["essen", "trinken", "coden"],
  test: "",

  count: 0,

  addTodo: () =>
    set((state) => {
      //   state.todos = [state.todoText, ...state.todos];
      //   state.todoText = "";

      return { todos: [state.todoText, ...state.todos] };
    }),

  removeTodo: (todo: string) =>
    set((state) => {
      state.todos = state.todos.filter((x) => x != todo);

      return { ...state };
    }),

  clearTodoDraft: () => set((state) => ({ ...state, todoText: "" })),
  setTodoDraft: (draftText: string) =>
    set((state) => ({ ...state, todoText: draftText })),
}));

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todoText: "",
      todos: ["essen", "trinken", "coden"],
      test: "",

      count: 0,

      addTodo: () =>
        set((state) => {
          //   state.todos = [state.todoText, ...state.todos];
          //   state.todoText = "";

          return { todos: [state.todoText, ...state.todos] };
        }),

      removeTodo: (todo: string) =>
        set((state) => {
          state.todos = state.todos.filter((x) => x != todo);

          return { ...state };
        }),

      clearTodoDraft: () => set((state) => ({ ...state, todoText: "" })),
      setTodoDraft: (draftText: string) =>
        set((state) => ({ ...state, todoText: draftText })),
    }),
    { name: "todo-store" }
  )
);

// const useTodoHook = ()=>{

//     const [todoText, setTodoText] = useState()
//     const [todos, setTodos] = useState()
//     const [todos, setTodos] = useState()
//     const [todos, setTodos] = useState()
//     const [todos, setTodos] = useState()
//     const [todos, setTodos] = useState()

//     const addToDo: () => {
//         setTodoText("")
//     }

//return {addTodo}

// }

export default useTodoStore;
