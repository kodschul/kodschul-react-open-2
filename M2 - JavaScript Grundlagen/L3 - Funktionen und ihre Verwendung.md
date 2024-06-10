### Funktionen und ihre Verwendung in JavaScript

Funktionen sind ein zentrales Konzept in JavaScript, das es ermöglicht, Code zu strukturieren, zu organisieren und wiederzuverwenden. Hier ist eine Einführung in Funktionen und ihre Verwendung:

#### Funktionen definieren:

Funktionen in JavaScript können auf verschiedene Arten definiert werden, einschließlich benannter Funktionen, Funktionsausdrücken und Pfeilfunktionen.

1. **Benannte Funktion:**

```javascript
function greet(name) {
    return "Hallo, " + name + "!";
}
```

Funktionsausdruck:

```javascript
let greet = function(name) {
    return "Hallo, " + name + "!";
};
```

Pfeilfunktion (Arrow Function):

```javascript
let greet = (name) => {
    return "Hallo, " + name + "!";
};
```

Funktionen aufrufen:
Nachdem eine Funktion definiert wurde, kann sie durch ihren Namen aufgerufen werden. Argumente können an die Funktion übergeben werden, um bestimmte Aktionen auszuführen.

```javascript
let message = greet("Max");
console.log(message); // Ausgabe: Hallo, Max!
```

Funktionen mit Rückgabewert:
Funktionen können Werte zurückgeben, die von anderen Teilen des Codes verwendet werden können.

```javascript
function add(a, b) {
    return a + b;
}

let sum = add(5, 3);
console.log(sum); // Ausgabe: 8
```

Funktionen als Parameter übergeben:
In JavaScript können Funktionen auch als Parameter an andere Funktionen übergeben werden.

```javascript
function applyOperation(a, b, operation) {
    return operation(a, b);
}

function multiply(x, y) {
    return x * y;
}

let result = applyOperation(5, 3, multiply);
console.log(result); // Ausgabe: 15
```

Funktionen in Objekten:
JavaScript ermöglicht auch das Definieren von Funktionen als Eigenschaften von Objekten.

```javascript
let calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3)); // Ausgabe: 8
console.log(calculator.subtract(5, 3)); // Ausgabe: 2
```