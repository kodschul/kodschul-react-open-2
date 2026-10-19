# Lab 1.2 – Lösung: Einkaufsliste mit Spread, filter und map

## Aufgabe 1: Referenzskript ausführen

```bash
node src/examples/m01-react-start/l02-javascript-essentials/essentials.js
```

Auszug der Ausgabe:

```text
{ name: 'Test_edited' }
[ 'Apfel', 'Birne', 'Kiwi' ]
1
string number boolean undefined
object object
true
true
false
false
Hallo, Anna! Hallo, Ben! Hallo, Cem!
10
volljährig
volljährig
[ 2, 4, 6, 8, 10 ] [ 2, 4, 6, 8, 10 ]
[ 2, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 'coden', 'essen', 'trinken' ]
[ 'essen', 'trinken' ]
false
```

Jede Ausgabe steht in der Datei als Kommentar hinter der `console.log`-Zeile.

## Aufgabe 2: Starter kopieren

```bash
cp src/starters/m01-l02-shopping-list.js src/playground/shopping-list.js
node src/playground/shopping-list.js
```

Unter Windows `copy` statt `cp`. Erwartete Ausgabe:

```text
1. Original: [ 'Milch', 'Brot', 'Äpfel' ]
```

## Aufgabe 3: Eintrag vorne einfügen (Spread)

```javascript
const withTea = ["Tee", ...shoppingList];
console.log("2. Mit Tee vorne:", withTea);
```

```text
2. Mit Tee vorne: [ 'Tee', 'Milch', 'Brot', 'Äpfel' ]
```

Begründung: Spread bildet ein neues Array; `shoppingList.unshift("Tee")` würde das Original verändern.

Gültige Alternative: `[].concat("Tee", shoppingList)` liefert dasselbe Ergebnis, Spread ist kürzer und in React üblich.

## Aufgabe 4: Eintrag entfernen (filter)

```javascript
const withoutBread = withTea.filter((item) => item !== "Brot");
console.log("3. Ohne Brot:", withoutBread);
```

```text
3. Ohne Brot: [ 'Tee', 'Milch', 'Äpfel' ]
```

Begründung: `filter` behält alle Elemente, für die die Funktion `true` liefert, und gibt ein neues Array zurück.

## Aufgabe 5: Großbuchstaben (map)

```javascript
const shouting = withoutBread.map((item) => item.toUpperCase());
console.log("4. Großbuchstaben:", shouting);
```

```text
4. Großbuchstaben: [ 'TEE', 'MILCH', 'ÄPFEL' ]
```

Begründung: `map` liefert ein neues Array gleicher Länge mit dem Rückgabewert der Funktion je Element.

## Aufgabe 6: Original prüfen

```javascript
console.log("Original unverändert:", shoppingList);
```

```text
Original unverändert: [ 'Milch', 'Brot', 'Äpfel' ]
```

Jeder Schritt arbeitet mit einer eigenen Konstante und liefert ein neues Array. Mit `push`, `unshift` oder `splice` wäre `shoppingList` verändert worden; genau das vermeidet React-Code (Lab 2.4).

## Aufgabe 7: Zuweisung an eine Konstante

```javascript
shoppingList = [];
```

Ausgabe:

```text
TypeError: Assignment to constant variable.
```

`const` verbietet die Neuzuweisung; `shoppingList.push("Tee")` wäre dagegen erlaubt und würde die Liste still verändern.

## Erweiterung: Objekt-Destructuring

```javascript
const detailedList = [
  { name: "Milch", amount: 2 },
  { name: "Brot", amount: 1 },
];
const lines = detailedList.map(({ name, amount }) => `${amount}x ${name}`);
console.log("Erweiterung:", lines);
```

Ausgabe:

```text
Erweiterung: [ '2x Milch', '1x Brot' ]
```

Referenzskript mit allen Schritten: `src/examples/m01-react-start/l02-javascript-essentials/shopping-list.js`
