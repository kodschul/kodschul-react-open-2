# Lab 1.2: JavaScript-Grundlagen für React

**Leitfragen:**

<details>
<summary>Warum darf ein `const`-Array verändert, aber nicht neu zugewiesen werden?</summary>

`const` schützt nur die Variable vor einer neuen Zuweisung. Der Inhalt von Objekten und Arrays bleibt änderbar (`push`, `obj.name = …`). React verlangt trotzdem neue Arrays und Objekte statt Änderungen am Original.

</details>

<details>
<summary>Wie entsteht eine neue Liste, ohne die alte zu verändern?</summary>

Mit Spread (`[neu, ...alt]`) oder mit Methoden, die ein neues Array liefern (`map`, `filter`). Das Original bleibt unverändert.

</details>

<details>
<summary>Was gibt `map` zurück?</summary>

Ein neues Array mit gleicher Länge, dessen Elemente das Ergebnis der übergebenen Funktion sind. Das ursprüngliche Array bleibt unverändert.

</details>

- Dieses Lab deckt nur ab, was in den React-Beispielen des Kurses vorkommt; alles Weitere steht in `00-prework.md`.
- Alle Beispiele laufen als Node-Skript: `node essentials.js` im Ordner `src/examples/m01-react-start/l02-javascript-essentials/`.

## const, let und veränderbare Inhalte

| Schlüsselwort | Neuzuweisung | Gültigkeit | Einsatz |
| --- | --- | --- | --- |
| `const` | nein | Block | Standard, auch für Objekte, Arrays, Funktionen |
| `let` | ja | Block | Werte, die sich im Ablauf ändern |
| `var` | ja | Funktion | nur in altem Code, nicht mehr verwenden |

```javascript
const obj = { name: "test" };

// const verbietet nur die Neuzuweisung der Variable, nicht die Änderung des Inhalts.
obj.name = "Test_edited";
console.log(obj); // { name: 'Test_edited' }

const fruits = ["Apfel", "Birne"];
fruits.push("Kiwi"); // erlaubt: das Array selbst wird verändert
// fruits = [];      // TypeError: Assignment to constant variable.
```

> **Merksatz:** `const` friert die Variable ein, nicht den Inhalt; React erwartet trotzdem neue Objekte und Arrays statt Änderungen.

## Datentypen und Vergleiche

| Typ | Beispiel | `typeof` |
| --- | --- | --- |
| Zahl | `42`, `3.14` | `number` |
| Text | `"Hallo"`, `'Hallo'` | `string` |
| Wahrheitswert | `true`, `false` | `boolean` |
| nicht gesetzt | `undefined` | `undefined` |
| bewusst leer | `null` | `object` (historische Eigenheit) |
| Array | `[1, 2, 3]` | `object` (Test mit `Array.isArray`) |
| Objekt | `{ name: "Anna" }` | `object` |
| Funktion | `() => 1` | `function` |

Vergleiche nutzen `===` und `!==`. `==` wandelt Typen automatisch um und liefert überraschende Ergebnisse.

```javascript
console.log(1 == "1");  // true  (Typumwandlung)
console.log(1 === "1"); // false (Typ und Wert verglichen)
console.log(0 === false); // false
```

| Operator | Bedeutung | Beispiel |
| --- | --- | --- |
| `+ - * / %` | Rechnen (Rest mit `%`) | `7 % 2` ergibt `1` |
| `> < >= <=` | Größenvergleich | `age >= 18` |
| `&& \|\| !` | und, oder, nicht | `isLoggedIn && hasRights` |
| `cond ? a : b` | Ternary: Wert `a` oder `b` | `age >= 18 ? "volljährig" : "minderjährig"` |

## Funktionen

Funktionen sind Werte. Sie lassen sich in Variablen speichern und als Argument übergeben; genau das geschieht bei `onClick` und `map`.

```javascript
function greetDeclaration(name) {          // Deklaration
  return "Hallo, " + name + "!";
}

const greetAnonymous = function (name) {   // anonyme Funktion
  return "Hallo, " + name + "!";
};

const greetArrow = (name) => "Hallo, " + name + "!"; // Arrow Function

const apply = (value, operation) => operation(value);
console.log(apply(5, (n) => n * 2)); // 10
```

| Schreibweise | Merkmal | In React |
| --- | --- | --- |
| Deklaration | `function name() {}` | selten |
| anonyme Funktion | ohne Namen, meist als Argument | selten |
| Arrow Function | `() => …`, bei einem Ausdruck ohne `return` | Standard für Komponenten und Handler |

## Bedingungen und Ternary

`if` ist eine Anweisung, der Ternary ein Ausdruck. Nur Ausdrücke dürfen in JSX innerhalb von `{}` stehen (siehe Lab 1.3).

```javascript
const age = 20;

if (age >= 18) {
  console.log("volljährig");
} else {
  console.log("minderjährig");
}

const label = age >= 18 ? "volljährig" : "minderjährig"; // Ausdruck
```

## Arrays mit map und filter statt Schleifen

`for`-, `while`- und `do-while`-Schleifen funktionieren in JavaScript wie in anderen Sprachen (Details in `00-prework.md`). In React ersetzen `map` und `filter` die meisten Schleifen, weil sie ein neues Array liefern.

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubledByLoop = [];                      // Schleife: Ergebnis von Hand aufbauen
for (let i = 0; i < numbers.length; i++) {
  doubledByLoop.push(numbers[i] * 2);
}

const doubled = numbers.map((n) => n * 2);     // [2, 4, 6, 8, 10], gleiche Länge
const evens = numbers.filter((n) => n % 2 === 0); // [2, 4], nur passende Elemente

console.log(numbers); // [1, 2, 3, 4, 5], Original unverändert
```

| Methode | Funktion liefert | Ergebnis |
| --- | --- | --- |
| `map(fn)` | neuen Wert je Element | neues Array, gleiche Länge |
| `filter(fn)` | `true` oder `false` je Element | neues Array, nur Elemente mit `true` |

## Spread: Kopien statt Änderungen

`...` verteilt die Elemente eines Arrays oder die Felder eines Objekts in ein neues Array oder Objekt.

```javascript
const todos = ["essen", "trinken"];
const withNew = ["coden", ...todos];   // ['coden', 'essen', 'trinken']
console.log(todos);                    // ['essen', 'trinken'], unverändert
console.log(withNew === todos);        // false: neue Referenz

const user = { name: "Anna", city: "Köln" };
const moved = { ...user, city: "Berlin" }; // Kopie, ein Feld überschrieben
```

Randnotiz: `Object.assign({}, user, { city: "Berlin" })` erzeugt dieselbe Kopie und steht in älterem Code. Spread ist die heutige Schreibweise. Warum React neue Arrays und Objekte braucht, zeigt Lab 2.4.

## Destructuring

Destructuring entpackt Werte aus Arrays (nach Position) und Objekten (nach Name).

```javascript
const [first, second] = ["eins", "zwei"]; // so liefert useState Wert und Setter (Lab 2.2)
const { name, city } = user;               // Name entscheidet, nicht die Reihenfolge
```

## Template Literals

Backticks erlauben Text mit eingebetteten Ausdrücken und mehrzeiligen Text.

```javascript
console.log(`${name} wohnt in ${city} und ist ${age} Jahre alt`);
// Anna wohnt in Köln und ist 20 Jahre alt
```

## Fazit

- `const` verbietet Neuzuweisung, nicht Änderung des Inhalts; `===` ist der Standardvergleich.
- Arrow Functions, Ternary und `map` sind in React-Code allgegenwärtig, weil sie Ausdrücke liefern.
- Spread, `map` und `filter` erzeugen neue Arrays und Objekte; das Original bleibt unverändert.

Die Übung bearbeitet eine Einkaufsliste mit genau diesen Werkzeugen.
