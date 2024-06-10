### Einführung in TypeScript

TypeScript ist eine von Microsoft entwickelte Programmiersprache, die eine optionale statische Typisierung für JavaScript bietet. Hier ist eine grundlegende Einführung in TypeScript:

#### Variablen und Datentypen:

In TypeScript können Variablen mit `let` oder `const` deklariert werden, ähnlich wie in JavaScript. TypeScript ermöglicht jedoch auch die explizite Angabe von Datentypen.

```typescript
let name: string = "Max";
let age: number = 30;
let isTrue: boolean = true;
let fruits: string[] = ["Apfel", "Banane", "Orange"];
let person: { name: string, age: number } = { name: "Max", age: 30 };
let undefinedVar: undefined;
let nullVar: null = null;
```

Funktionen:
In TypeScript können Funktionen Typen für Parameter und Rückgabewerte haben.

```typescript
function add(x: number, y: number): number {
    return x + y;
}

let result: number = add(5, 10);

```

Interfaces:
Interfaces ermöglichen die Definition von Strukturen für Objekte.

```typescript
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return `Hallo ${person.name}, du bist ${person.age} Jahre alt.`;
}

let user: Person = { name: "Max", age: 30 };
let greeting: string = greet(user);

```

Klassen:
Klassen ermöglichen die Definition von Objekten mit Methoden und Eigenschaften.

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log(`${this.name} macht Geräusche.`);
    }
}

let dog = new Animal("Bello");
dog.speak();

```

Generics:
Generics ermöglichen die Definition von wiederverwendbaren Komponenten, die mit verschiedenen Datentypen arbeiten können.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Hallo");

```