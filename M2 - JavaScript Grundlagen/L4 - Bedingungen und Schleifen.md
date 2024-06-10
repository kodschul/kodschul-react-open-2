### Kontrollstrukturen: Bedingungen und Schleifen in JavaScript

Kontrollstrukturen ermöglichen es, den Ablauf des Programms basierend auf Bedingungen zu steuern und Schleifen zu verwenden, um wiederholte Aufgaben auszuführen. Hier ist eine Einführung in Bedingungen und Schleifen in JavaScript:

#### Bedingungen (if-else):

Die Bedingungsanweisungen ermöglichen es, Codeblöcke basierend auf verschiedenen Bedingungen auszuführen.

```javascript
let num = 10;

if (num > 0) {
    console.log("Die Zahl ist positiv.");
} else if (num === 0) {
    console.log("Die Zahl ist null.");
} else {
    console.log("Die Zahl ist negativ.");
}
```

Schleifen:
Schleifen werden verwendet, um Codeblöcke mehrmals auszuführen.

1. For-Schleife:

```javascript
for (let i = 0; i < 5; i++) {
    console.log("Iteration " + i);
}
```

2. While-Schleife:

```javascript
let i = 0;
while (i < 5) {
    console.log("Iteration " + i);
    i++;
}
```

3. Do-While-Schleife:

```javascript
let i = 0;
do {
    console.log("Iteration " + i);
    i++;
} while (i < 5);
```

Kontrollstrukturen und Schleifen kombinieren:

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        console.log(i + " ist eine gerade Zahl.");
    } else {
        console.log(i + " ist eine ungerade Zahl.");
    }
}
```

Break und Continue:
Die break-Anweisung wird verwendet, um eine Schleife vorzeitig zu beenden, und die continue-Anweisung wird verwendet, um eine bestimmte Iteration einer Schleife zu überspringen.

```javascript
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break; // Schleife vorzeitig beenden, wenn i gleich 3 ist
    }
    console.log("Iteration " + i);
}

for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue; // Die Iteration überspringen, wenn i gleich 3 ist
    }
    console.log("Iteration " + i);
}
```