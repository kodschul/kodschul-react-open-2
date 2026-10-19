// Einkaufslisten-Skript (Lab 1.2). Ausführen: node shopping-list.js
// Jeder Schritt erzeugt ein neues Array; die Originalliste bleibt unverändert.

const shoppingList = ["Milch", "Brot", "Äpfel"];

// 1. Ausgangsliste
console.log("1. Original:", shoppingList);

// 2. Eintrag vorne einfügen (Spread)
const withTea = ["Tee", ...shoppingList];
console.log("2. Mit Tee vorne:", withTea);

// 3. Eintrag entfernen (filter behält alle, die nicht "Brot" sind)
const withoutBread = withTea.filter((item) => item !== "Brot");
console.log("3. Ohne Brot:", withoutBread);

// 4. Alle Einträge in Großbuchstaben (map gibt ein neues Array gleicher Länge zurück)
const shouting = withoutBread.map((item) => item.toUpperCase());
console.log("4. Großbuchstaben:", shouting);

// Beweis: das Original ist unverändert
console.log("Original unverändert:", shoppingList);

// Erweiterung: Einträge als Objekte, Destructuring im Parameter
const detailedList = [
  { name: "Milch", amount: 2 },
  { name: "Brot", amount: 1 },
];
const lines = detailedList.map(({ name, amount }) => `${amount}x ${name}`);
console.log("Erweiterung:", lines);
