// JavaScript-Grundlagen für React. Ausführen: node essentials.js
// Jeder Abschnitt zeigt nur, was in den React-Beispielen des Kurses vorkommt.

// 1. const und let ---------------------------------------------------------
const obj = {
  name: "test",
};

// const verbietet nur die Neuzuweisung der Variable, nicht die Änderung des Inhalts.
obj.name = "Test_edited";
console.log(obj); // { name: 'Test_edited' }

const fruits = ["Apfel", "Birne"];
fruits.push("Kiwi"); // erlaubt: das Array selbst wird verändert
console.log(fruits); // [ 'Apfel', 'Birne', 'Kiwi' ]

// fruits = [];  // TypeError: Assignment to constant variable. (Zeile einkommentieren zum Testen)

let counter = 0; // let erlaubt Neuzuweisung
counter = counter + 1;
console.log(counter); // 1

// 2. Datentypen und === ---------------------------------------------------
console.log(typeof "Text", typeof 42, typeof true, typeof undefined); // string number boolean undefined
console.log(typeof [], typeof {}); // object object (Arrays sind Objekte)
console.log(Array.isArray([])); // true

console.log(1 == "1"); // true  (== wandelt Typen um)
console.log(1 === "1"); // false (=== vergleicht Typ und Wert)
console.log(0 === false); // false

// 3. Funktionen -----------------------------------------------------------
function greetDeclaration(name) {
  return "Hallo, " + name + "!";
}

const greetAnonymous = function (name) {
  return "Hallo, " + name + "!";
};

const greetArrow = (name) => "Hallo, " + name + "!"; // ein Ausdruck: return entfällt

console.log(greetDeclaration("Anna"), greetAnonymous("Ben"), greetArrow("Cem"));

// Funktionen sind Werte und lassen sich übergeben: genau das tun onClick und map
const apply = (value, operation) => operation(value);
console.log(apply(5, (n) => n * 2)); // 10

// 4. if und Ternary -------------------------------------------------------
const age = 20;

if (age >= 18) {
  console.log("volljährig");
} else {
  console.log("minderjährig");
}

// Der Ternary ist ein Ausdruck und passt deshalb in JSX
const label = age >= 18 ? "volljährig" : "minderjährig";
console.log(label); // volljährig

// 5. Arrays mit map und filter statt Schleifen ----------------------------
const numbers = [1, 2, 3, 4, 5];

const doubledByLoop = [];
for (let i = 0; i < numbers.length; i++) {
  doubledByLoop.push(numbers[i] * 2);
}

const doubled = numbers.map((n) => n * 2); // gibt ein NEUES Array gleicher Länge zurück
const evens = numbers.filter((n) => n % 2 === 0); // gibt ein NEUES Array mit den passenden Elementen zurück

console.log(doubledByLoop, doubled); // [ 2, 4, 6, 8, 10 ] [ 2, 4, 6, 8, 10 ]
console.log(evens); // [ 2, 4 ]
console.log(numbers); // [ 1, 2, 3, 4, 5 ]  (Original unverändert)

// 6. Spread: Kopien statt Änderungen --------------------------------------
const todos = ["essen", "trinken"];
const withNew = ["coden", ...todos]; // neuer Eintrag vorne, Rest dahinter
console.log(withNew); // [ 'coden', 'essen', 'trinken' ]
console.log(todos); // [ 'essen', 'trinken' ]  (alt bleibt unverändert)
console.log(withNew === todos); // false (neue Referenz)

const user = { name: "Anna", city: "Köln" };
const moved = { ...user, city: "Berlin" }; // Kopie mit einem geänderten Feld
console.log(user, moved); // { name: 'Anna', city: 'Köln' } { name: 'Anna', city: 'Berlin' }

// Object.assign erzeugt ebenfalls eine Kopie (ältere Schreibweise)
const copy = Object.assign({}, user, { city: "Berlin" });
console.log(copy); // { name: 'Anna', city: 'Berlin' }

// 7. Destructuring --------------------------------------------------------
const [first, second] = ["eins", "zwei"]; // Position entscheidet: so liefert useState seinen Wert und Setter
const { name, city } = user; // Name entscheidet
console.log(first, second, name, city); // eins zwei Anna Köln

// 8. Template Literals ----------------------------------------------------
console.log(`${name} wohnt in ${city} und ist ${age} Jahre alt`); // Anna wohnt in Köln und ist 20 Jahre alt
