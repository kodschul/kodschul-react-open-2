# Vorbereitung: HTML, CSS und JavaScript (optional)

Diese Datei ist ein Selbstlernmaterial für alle ohne Vorerfahrung mit HTML, CSS und JavaScript. Der Kurs setzt nur das voraus, was Lab 1.2 und Lab 1.3 wiederholen; hier steht alles ausführlicher, mit Übungen und Lösungen am Ende.

- Arbeitsaufwand: ca. 2 Stunden, in beliebiger Reihenfolge der Abschnitte.
- JavaScript-Beispiele laufen im Browser (F12, Reiter „Konsole“) oder lokal mit Node.js: `node meine-datei.js`.

## Code ausführen

| Ort | Vorgehen | Besonderheiten |
| --- | --- | --- |
| Browser-Konsole | F12 öffnen, Reiter „Konsole“, Code einfügen, Enter | `alert`, `prompt`, `document` verfügbar; ein zweites `const x` mit gleichem Namen meldet einen Fehler, dann Seite neu laden |
| Node.js | Datei `meine-datei.js` anlegen, im Terminal `node meine-datei.js` | kein `alert`, `prompt`, `document` |
| HTML-Datei | Datei `index.html` per Doppelklick im Browser öffnen | Änderungen speichern, Seite neu laden |

## HTML: Aufbau eines Dokuments

HTML beschreibt die Struktur einer Seite mit Tags. Der Browser liest die Datei und stellt sie dar.

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Titel im Browser-Tab</title>
  </head>
  <body>
    <!-- sichtbarer Inhalt -->
    <h1>Überschrift</h1>
    <p>Ein Absatz mit einem <a href="https://example.com">Link</a>.</p>
  </body>
</html>
```

| Tag | Bedeutung |
| --- | --- |
| `<html>` | Wurzel des Dokuments, `lang` nennt die Sprache |
| `<head>` | Metadaten: Titel, Zeichensatz, Verweise auf CSS und Skripte |
| `<body>` | sichtbarer Inhalt |
| `<h1>` … `<h6>` | Überschriften (eine `h1` pro Seite) |
| `<p>` | Absatz |
| `<a href="…">` | Link |
| `<img src="…" alt="…">` | Bild mit Alternativtext |
| `<ul>`, `<ol>`, `<li>` | Liste (ungeordnet, geordnet) und Listeneintrag |
| `<div>`, `<span>` | neutrale Gruppierung (Block, Inline) für CSS und JavaScript |
| `<button>` | Schaltfläche |

Semantische Elemente beschreiben den Zweck eines Bereichs:

| Element | Zweck |
| --- | --- |
| `<header>` | Kopfbereich der Seite oder eines Abschnitts |
| `<nav>` | Navigation |
| `<main>` | Hauptinhalt (einmal pro Seite) |
| `<section>` | thematischer Abschnitt |
| `<article>` | eigenständiger Beitrag |
| `<aside>` | Nebeninhalt, z. B. verwandte Links |
| `<footer>` | Fußbereich |

Attribute stehen im Start-Tag: `<a href="/kontakt" class="link" id="kontakt-link">`. `class` darf mehrfach vorkommen, `id` nur einmal pro Seite.

## CSS: Aussehen festlegen

CSS legt Farben, Abstände und Layout fest. Es gibt drei Wege, CSS einzubinden:

| Weg | Beispiel | Reichweite |
| --- | --- | --- |
| Inline | `<p style="color: blue; font-size: 16px;">` | nur dieses Element |
| Intern | `<style> p { color: blue; } </style>` im `<head>` | gesamtes Dokument |
| Extern | `<link rel="stylesheet" href="style.css">` im `<head>` | alle Seiten, die die Datei einbinden |

```css
/* style.css */
body {                      /* Selektor: alle <body> */
  font-family: sans-serif;
  background-color: #f5f5f5;
}
.box {                      /* Klasse: <div class="box"> */
  padding: 16px;
  border: 2px solid darkblue;
  border-radius: 8px;
}
#titel {                    /* ID: <h1 id="titel"> */
  color: darkblue;
}
a:hover {                   /* Zustand: Maus über dem Link */
  color: crimson;
}
```

| Eigenschaft | Wirkung |
| --- | --- |
| `color`, `background-color` | Text- und Hintergrundfarbe |
| `font-size`, `font-family`, `font-weight` | Schrift |
| `margin` | Abstand außen |
| `padding` | Abstand innen |
| `border` | Rahmen |
| `width`, `max-width` | Breite |
| `display: flex; gap: 12px;` | Elemente nebeneinander mit Abstand |
| `text-align: center` | Text zentrieren |

## JavaScript: Einführung und kurze Geschichte

JavaScript läuft in Webbrowsern und macht Seiten dynamisch. Mit Node.js läuft es auch außerhalb des Browsers.

| Jahr | Ereignis |
| --- | --- |
| 1995 | Netscape entwickelt JavaScript als einfache Skriptsprache für Webseiten |
| 1997 | erste Standardisierung als ECMAScript (ES1) |
| 2009 | Node.js führt JavaScript außerhalb des Browsers aus |
| 2012 | TypeScript (Microsoft) erscheint: JavaScript mit statischen Typen, übersetzt zu JavaScript |
| 2015 | ES2015 („ES6“) bringt `let`, `const`, Arrow Functions, Klassen und Module |

JavaScript lässt sich auf drei Wegen einbinden:

```html
<!-- inline: nur für dieses Element -->
<button onclick="alert('Hallo Welt!')">Klick mich</button>

<!-- intern: im <head> oder <body> -->
<script>
  function greet() {
    alert("Hallo Welt!");
  }
</script>

<!-- extern: Datei script.js, eingebunden im <head> oder am Ende des <body> -->
<script src="script.js"></script>
```

## Variablen, Datentypen und Operatoren

Variablen speichern Werte unter einem Namen.

| Schlüsselwort | Verhalten | Einsatz |
| --- | --- | --- |
| `const` | Name lässt sich nicht neu zuweisen | Standard |
| `let` | Name lässt sich neu zuweisen, nur im Block gültig | veränderliche Werte (Zähler) |
| `var` | älter, im ganzen Funktionsbereich gültig | nur in älterem Code |

```js
const userName = "Morty";   // string
let counter = 0;            // number
counter = counter + 1;
const isStudent = true;     // boolean
```

| Typ | Beispiel | Hinweis |
| --- | --- | --- |
| `string` | `"Text"`, `'Text'`, `` `Hallo ${userName}` `` | Backticks erlauben Variablen im Text (Template Literal) |
| `number` | `42`, `3.14` | ganze und Dezimalzahlen |
| `boolean` | `true`, `false` | Wahrheitswert |
| `null` | `null` | bewusst „kein Wert“ |
| `undefined` | `undefined` | Variable ohne Wert |
| `object` | `{ name: "Morty", age: 14 }` | Eigenschaften mit Namen |
| `array` | `[1, 2, 3]` | geordnete Liste |
| `function` | `() => 42` | Funktionen sind Werte |

`typeof wert` liefert den Typ als Text (`typeof null` ergibt aus historischen Gründen `"object"`). Umwandeln: `String(42)` ergibt `"42"`, `Number("42")` ergibt `42`.

| Gruppe | Operatoren | Beispiel |
| --- | --- | --- |
| Arithmetik | `+ - * / % **` | `7 % 2` ergibt `1` (Rest) |
| Vergleich | `=== !== > < >= <=` | `5 === 5` ergibt `true` |
| lockerer Vergleich | `==`, `!=` | `5 == "5"` ergibt `true`; stattdessen `===` verwenden |
| Logik | `&& \|\| !` | `x > 10 && y < 20` |
| Zuweisung | `= += -=` | `counter += 1` |
| Text verbinden | `+` oder Template Literal | `"a" + "b"` ergibt `"ab"`; `"5" + 3` ergibt `"53"` |

## Funktionen

Eine Funktion ist ein Codeblock mit Namen, der Parameter entgegennimmt und einen Wert zurückgibt.

```js
// Deklaration und Aufruf
function greet(name) {
  console.log(`Hallo, ${name}!`);
}
greet("Morty");

// Rückgabewert
function calculateArea(width, height) {
  return width * height;
}

// Standardwert für einen Parameter
function power(base, exponent = 2) {
  return base ** exponent;
}
```

| Schreibweise | Beispiel | Anmerkung |
| --- | --- | --- |
| Deklaration | `function add(a, b) { return a + b; }` | wird beim Laden bekannt |
| Anonyme Funktion | `const add = function (a, b) { return a + b; };` | Funktion ohne eigenen Namen, als Wert gespeichert |
| Arrow Function | `const add = (a, b) => a + b;` | kürzere Syntax; ohne `{}` ist der Ausdruck der Rückgabewert |
| Arrow, ein Parameter | `const double = n => n * 2;` | Klammern um einen einzelnen Parameter sind optional |
| Anonym als Argument | `[1, 2, 3].map((n) => n * 2)` | typisch für Callbacks |

Arrow Functions haben kein eigenes `this` und kein `arguments`-Objekt. In React-Beispielen ist das fast immer die gewünschte Form.

Funktionen sorgen für Modularität und Abstraktion:

- Modularität: Code wird in kleine, wiederverwendbare Teile zerlegt, die einzeln getestet werden können (Lab 8.3 und Lab 9.3 nutzen das).
- Abstraktion: Wer eine Funktion aufruft, muss ihre Implementierung nicht kennen, nur Name, Parameter und Rückgabe.
- Größere Programme teilen Funktionen auf mehrere Dateien auf und binden sie mit `import` und `export` ein (ES-Module); React-Projekte arbeiten durchgehend so.

## Bedingungen

```js
const age = 20;

if (age >= 18) {
  console.log("volljährig");
} else if (age >= 14) {
  console.log("Jugendliche");
} else {
  console.log("Kinder");
}

// Kurzform für zwei Möglichkeiten: Bedingung ? wenn wahr : wenn falsch
const label = age >= 18 ? "volljährig" : "minderjährig";
```

| Syntax | Wirkung |
| --- | --- |
| `if (…) { … }` | Block läuft, wenn die Bedingung wahr ist |
| `else if (…) { … }` | weitere Bedingung, wenn die vorige falsch war |
| `else { … }` | alle übrigen Fälle |
| `a ? b : c` | Ausdruck mit zwei Möglichkeiten (Ternary) |
| `a && b` | `b` nur, wenn `a` wahr ist |
| `a \|\| b` | `b` nur, wenn `a` falsch ist (Ersatzwert) |

Als falsch gelten `false`, `0`, `""`, `null`, `undefined` und `NaN`; alles andere gilt als wahr.

## Schleifen

Schleifen wiederholen einen Codeblock.

```js
// for: Anzahl der Durchläufe bekannt
for (let i = 0; i < 3; i++) {
  console.log(i);          // 0, 1, 2
}

// while: prüft die Bedingung vor jedem Durchlauf
let n = 3;
while (n > 0) {
  console.log(n);          // 3, 2, 1
  n--;
}

// do-while: läuft mindestens einmal, prüft danach
let tries = 0;
do {
  console.log("Versuch", tries);
  tries++;
} while (tries < 2);

// for…of: über die Elemente eines Arrays
for (const item of ["a", "b"]) {
  console.log(item);
}
```

| Schleife | Prüfung der Bedingung | Einsatz |
| --- | --- | --- |
| `for (start; bedingung; schritt)` | vor jedem Durchlauf | Zähler mit bekannter Anzahl |
| `while (bedingung)` | vor jedem Durchlauf | Wiederholung bis zu einem Ereignis |
| `do { } while (bedingung)` | nach jedem Durchlauf | Block läuft mindestens einmal |
| `for (const x of liste)` | je Element | Arrays durchlaufen |

`break` beendet die Schleife, `continue` springt zum nächsten Durchlauf. In React-Komponenten ersetzen `map` und `filter` die meisten Schleifen (Lab 1.2).

## Übungen

Jede Aufgabe läuft im Browser-Konsolenfenster oder mit `node`. Lösungen stehen im nächsten Abschnitt.

### Variablen und Datentypen

1. Deklariere `userName` (Text), `age` (Zahl) und `isStudent` (Wahrheitswert) mit passenden Werten und gib alle drei mit `console.log` aus.
2. Lege zwei Zahlen `a` und `b` an. Gib Summe, Differenz, Produkt, Quotient und den Rest von `a` geteilt durch 5 aus.
3. Gib mit `typeof` den Typ von `userName` aus. Wandle `age` mit `String(…)` in Text um, speichere das Ergebnis in `ageAsString` und gib dessen Typ aus. Vergleiche außerdem `5 == "5"` und `5 === "5"` sowie `"5" + 3` und `"5" * 3`.

### Funktionen

4. Schreibe eine Funktion `greet(name)`, die „Hallo, <Name>!“ ausgibt, und rufe sie mit zwei Namen auf. Schreibe `calculateArea(width, height)`, die die Fläche zurückgibt, und `isEven(number)`, die `true` für gerade Zahlen liefert. Rufe beide mit mehreren Werten auf.
5. Schreibe `greet` und `calculateArea` als Arrow Functions neu. Verdopple die Zahlen `[1, 2, 3]` mit `map`, einmal mit einer anonymen Funktion (`function () {}`) und einmal mit einer Arrow Function.

### Bedingungen und Schleifen

6. Lege eine Zahl `number` an und gib mit `if`/`else` aus, ob sie gerade oder ungerade ist.
7. Gib mit einer `for`-Schleife die Zahlen von 1 bis 10 aus.
8. Berechne die Summe der Zahlen von 1 bis `n` (z. B. `n = 5`), einmal mit `for` und einmal mit `while`. Im Browser darf `prompt()` den Wert für `n` abfragen; in Node.js genügt eine Variable.
9. Zähle mit `do-while` von 3 auf 1 herunter. Schreibe danach eine zweite `do-while`-Schleife mit einer Bedingung, die von Anfang an falsch ist, und beobachte, dass der Block trotzdem einmal läuft.

### Mini-Projekt und Modularität

10. Baue eine Mini-HTML-Seite mit externem CSS und JavaScript: Ordner `prework` mit `index.html`, `style.css` und `script.js`. Die Seite enthält `header` mit Überschrift und Navigation (zwei Links auf Abschnitte), `main` mit einem `section` (Überschrift, Absatz, Liste mit drei Einträgen) und einem `article` mit der Klasse `box`, einen `footer` sowie einen Button, der per JavaScript eine Begrüßung anzeigt. Das CSS setzt Schrift, Hintergrundfarbe, einen Rahmen mit Abstand für `.box` und eine Hover-Farbe für Links.
11. Nutze `isEven` aus Aufgabe 4 in einer neuen Funktion `describeNumber(value)`, die „<Zahl> ist gerade“ bzw. „<Zahl> ist ungerade“ zurückgibt. Rufe sie in einer Schleife für 1 bis 3 auf.

## Lösungen

### Aufgabe 1

```js
const userName = "Morty";
const age = 14;
const isStudent = true;
console.log(userName, age, isStudent);
```

```text
Morty 14 true
```

### Aufgabe 2

```js
const a = 12;
const b = 4;
console.log("Summe:", a + b);
console.log("Differenz:", a - b);
console.log("Produkt:", a * b);
console.log("Quotient:", a / b);
console.log("Rest:", a % 5);
```

```text
Summe: 16
Differenz: 8
Produkt: 48
Quotient: 3
Rest: 2
```

### Aufgabe 3

```js
console.log(typeof userName);          // string
const ageAsString = String(age);
console.log(typeof ageAsString);       // string
console.log(5 == "5", 5 === "5");      // true false
console.log("5" + 3, "5" * 3);         // 53 15
```

`==` wandelt Typen um und gilt deshalb als fehleranfällig; `===` vergleicht Wert und Typ. `+` verbindet bei Text, `*` rechnet immer.

### Aufgabe 4

```js
function greet(name) {
  console.log(`Hallo, ${name}!`);
}
greet("Morty");
greet("Summer");

function calculateArea(width, height) {
  return width * height;
}
console.log(calculateArea(3, 4));

function isEven(number) {
  return number % 2 === 0;
}
console.log(isEven(4), isEven(7));
```

```text
Hallo, Morty!
Hallo, Summer!
12
true false
```

### Aufgabe 5

```js
const greetArrow = (name) => console.log(`Hallo, ${name}!`);
greetArrow("Rick");

const area = (w, h) => w * h;
console.log(area(2, 5));

const doubled = [1, 2, 3].map(function (n) {   // anonyme Funktion
  return n * 2;
});
const tripled = [1, 2, 3].map((n) => n * 3);    // Arrow Function
console.log(doubled, tripled);
```

```text
Hallo, Rick!
10
[ 2, 4, 6 ] [ 3, 6, 9 ]
```

### Aufgabe 6

```js
const number = 7;
if (number % 2 === 0) {
  console.log(`${number} ist gerade`);
} else {
  console.log(`${number} ist ungerade`);
}
```

```text
7 ist ungerade
```

### Aufgabe 7

```js
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

Ausgabe: die Zahlen 1 bis 10, je eine pro Zeile.

### Aufgabe 8

```js
const n = 5;                 // im Browser alternativ: Number(prompt("Bis zu welcher Zahl?"))
let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}
console.log(`Summe von 1 bis ${n}: ${sum}`);

let j = 1;
let sumWhile = 0;
while (j <= n) {
  sumWhile += j;
  j++;
}
console.log(`Summe (while): ${sumWhile}`);
```

```text
Summe von 1 bis 5: 15
Summe (while): 15
```

### Aufgabe 9

```js
let countdown = 3;
do {
  console.log(countdown);
  countdown--;
} while (countdown > 0);

let attempts = 5;
do {
  console.log("läuft einmal");   // Bedingung ist falsch, der Block läuft trotzdem einmal
  attempts++;
} while (attempts < 3);
```

```text
3
2
1
läuft einmal
```

### Aufgabe 10

```html
<!-- prework/index.html -->
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meine Seite</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>
  <body>
    <header>
      <h1 id="titel">Meine Seite</h1>
      <nav>
        <a href="#hobbys">Hobbys</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </header>
    <main>
      <section id="hobbys">
        <h2>Hobbys</h2>
        <p>Das mache ich gern:</p>
        <ul>
          <li>Lesen</li>
          <li>Radfahren</li>
          <li>Programmieren</li>
        </ul>
      </section>
      <article class="box" id="kontakt">
        <h2>Kontakt</h2>
        <p>Nachrichten sind willkommen.</p>
        <button onclick="greet()">Begrüßen</button>
      </article>
    </main>
    <footer><p>&copy; 2026 Meine Seite</p></footer>
  </body>
</html>
```

```css
/* prework/style.css */
body {
  font-family: sans-serif;
  background-color: #f5f5f5;
  margin: 0;
}
header, main, footer {
  padding: 16px;
}
header {
  background-color: darkblue;
  color: white;
}
nav a {
  color: white;
  margin-right: 12px;
}
a:hover {
  color: gold;
}
.box {
  padding: 16px;
  border: 2px solid darkblue;
  border-radius: 8px;
  background-color: white;
}
```

```js
// prework/script.js
function greet() {
  alert("Hallo und willkommen!");
}
```

Erwartet: `index.html` im Browser öffnen zeigt einen dunkelblauen Kopfbereich mit Navigation, die Hobby-Liste und die Kontaktbox mit Rahmen. Der Button öffnet ein Dialogfenster mit der Begrüßung; Links färben sich beim Darüberfahren gelb.

### Aufgabe 11

```js
// isEven stammt aus Aufgabe 4 und steht in derselben Datei
const describeNumber = (value) => `${value} ist ${isEven(value) ? "gerade" : "ungerade"}`;

for (let i = 1; i <= 3; i++) {
  console.log(describeNumber(i));
}
```

```text
1 ist ungerade
2 ist gerade
3 ist ungerade
```

`describeNumber` baut auf `isEven` auf und kennt dessen Innenleben nicht: kleine Funktionen lassen sich kombinieren.
