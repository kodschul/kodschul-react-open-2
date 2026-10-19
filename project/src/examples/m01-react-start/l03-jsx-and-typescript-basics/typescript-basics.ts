// TypeScript-Minimum für React (Lab 1.3). Prüfen im Editor oder mit: npx tsc -p tsconfig.app.json --noEmit
// Zeilen mit @ts-expect-error zeigen absichtliche Fehler: TypeScript meldet sie vor dem Browser.

// Grundtypen und Arrays
export const title: string = "Counter";
export const count: number = 100;
export const isRunning: boolean = false;
export const todos: string[] = ["essen", "trinken"];

// @ts-expect-error Type 'string' is not assignable to type 'number'
export const wrongCount: number = "100";

// type und interface beschreiben die Form eines Objekts; für Props und State reicht meist type
export type Point = { x: number; y: number };

export interface Person {
  readonly id: number; // nach dem Anlegen nicht mehr änderbar
  name: string;
  nickname?: string; // optional: darf fehlen
}

export const anna: Person = { id: 1, name: "Anna" };

// @ts-expect-error Cannot assign to 'id' because it is a read-only property
anna.id = 2;

// @ts-expect-error Property 'name' is missing in type '{ id: number; }'
export const nameless: Person = { id: 2 };

// Union-Typ: nur diese Werte sind erlaubt
export type Status = "Alive" | "Dead" | "unknown";
export const status: Status = "Alive";

// @ts-expect-error Type '"Missing"' is not assignable to type 'Status'
export const wrongStatus: Status = "Missing";

export const idOrName: number | string = 42;

// Typisierte Funktion: Parameter und Rückgabewert
export const add = (a: number, b: number): number => a + b;

export const greet = (person: Person): string => `Hallo, ${person.name}!`;

// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'
export const broken = add(1, "2");
