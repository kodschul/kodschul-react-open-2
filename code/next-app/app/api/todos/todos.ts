const todos: { id: number; text: string; done: boolean }[] = [
  { id: 1, text: "Next.js API Routes kennenlernen", done: true },
  { id: 2, text: "BFF-Pattern verstehen", done: false },
];

const todoDb = {
  todos,
  nextId: 3,
};

export default todoDb;
