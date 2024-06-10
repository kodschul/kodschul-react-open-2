### Variablen, Datentypen und Operatoren in JavaScript

JavaScript bietet eine Vielzahl von Datentypen und Operatoren zur Verarbeitung von Daten. Hier ist eine Einführung in Variablen, Datentypen und Operatoren:

#### Variablen:

Variablen werden verwendet, um Werte zu speichern und später darauf zuzugreifen. In JavaScript können Variablen mit `var`, `let` oder `const` deklariert werden.

```javascript
// Verwendung von var (global oder lokal)
var name = "Max";

// Verwendung von let (blockscoped)
let age = 30;

// Verwendung von const (konstante Variable)
const PI = 3.14;
```

Datentypen:
JavaScript unterstützt verschiedene Datentypen, darunter:

Number: Ganze Zahlen, Fließkommazahlen, usw.
String: Textwerte.
Boolean: Entweder true oder false.
Array: Eine geordnete Sammlung von Werten.
Object: Eine Sammlung von Schlüssel-Wert-Paaren.
Undefined: Eine Variable, die keinen Wert zugewiesen hat.
Null: Ein spezieller Wert, der "nichts" oder "leer" bedeutet.

```javascript
let number = 10;
let text = "Hallo";
let isTrue = true;
let fruits = ["Apfel", "Banane", "Orange"];
let person = { name: "Max", age: 30 };
let undefinedVar;
let nullVar = null;

```

Operatoren:
JavaScript unterstützt verschiedene Arten von Operatoren, darunter:

Arithmetische Operatoren: +, -, *, /, %.
Zuweisungsoperatoren: =, +=, -=, usw.
Vergleichsoperatoren: ==, !=, ===, !==, >, <, >=, <=.
Logische Operatoren: &&, ||, !.
Inkrement- und Dekrementoperatoren: ++, --.
Ternärer Operator: condition ? expr1 : expr2.

```javascript
let a = 5;
let b = 10;
let result = (a + b) * 2; // arithmetischer Operator
let isGreater = (a > b); // Vergleichsoperator
let x = (isGreater) ? "a ist größer als b" : "b ist größer als a"; // Ternärer Operator

```