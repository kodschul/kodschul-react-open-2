### TypeScript-Typen und Interfaces

In TypeScript können Typen und Interfaces verwendet werden, um die Struktur von Daten zu definieren und die Typsicherheit des Codes zu verbessern. Hier ist eine Einführung in TypeScript-Typen und Interfaces:

#### Grundlegende Typen:

TypeScript bietet eine Vielzahl von Grundtypen, darunter:

- **number**: Für numerische Werte.
- **string**: Für Zeichenketten.
- **boolean**: Für Wahrheitswerte.
- **null** und **undefined**: Für spezielle Werte.
- **any**: Für jede Art von Wert.
- **void**: Für Funktionen, die keinen Wert zurückgeben.

```typescript
let age: number = 30;
let name: string = "Max";
let isValid: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
let anyType: any = "beliebiger Wert";
let noReturn: void = undefined;
```

Arrays und Tupel:
TypeScript ermöglicht die Definition von Arrays mit spezifischen Elementtypen sowie Tupel für Arrays mit einer festgelegten Anzahl von Elementen und Typen.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let tuple: [string, number] = ["Max", 30];
```

Interfaces:
Interfaces ermöglichen die Definition von Strukturen für Objekte. Sie beschreiben, welche Eigenschaften ein Objekt haben muss.

```typescript
interface Person {
    name: string;
    age: number;
}

let user: Person = { name: "Max", age: 30 };
```

Optionale Eigenschaften:
Interfaces können auch optionale Eigenschaften enthalten, die nicht für jedes Objekt erforderlich sind.

```typescript
interface Car {
    brand: string;
    model: string;
    year?: number; // Optional
}

let myCar: Car = { brand: "Toyota", model: "Corolla" };
```

Readonly-Eigenschaften:
Interfaces können Readonly-Eigenschaften enthalten, die nach der Initialisierung nicht mehr geändert werden können.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p: Point = { x: 10, y: 20 };
p.x = 5; // Fehler, da 'x' schreibgeschützt ist
```