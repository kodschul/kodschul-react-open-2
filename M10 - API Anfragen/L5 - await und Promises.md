## Verwendung von await und Promises in JavaScript

In JavaScript ermöglichen Promises eine saubere und effiziente Handhabung asynchroner Operationen. Das `await`-Keyword kann verwendet werden, um das Ergebnis einer Promise-Operation zu erhalten. Im Folgenden sind einige Beispiele zur Verwendung von `await` und Promises:

### Beispiel 1: Verwendung von await mit einer Promise-Funktion

```javascript
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function myAsyncFunction() {
  console.log('Starte...');
  await wait(2000);
  console.log('2 Sekunden gewartet!');
}

myAsyncFunction();
```

In diesem Beispiel wird die Funktion wait(ms) definiert, die eine Promise zurückgibt und nach einer bestimmten Zeitdauer aufgelöst wird. Die Funktion myAsyncFunction wartet mithilfe von await darauf, dass die Promise abgeschlossen ist, bevor sie fortgesetzt wird.

Beispiel 2: Verwendung von await mit einer API-Anfrage

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Daten erhalten:', data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

fetchData();
```

Hier wird await verwendet, um auf die Antwort einer HTTP-Anfrage zu warten. Der Code wartet darauf, dass fetch die Daten abruft und response.json() die JSON-Daten analysiert, bevor er mit der Verarbeitung fortsetzt.

Beispiel 3: Verwendung von Promise.all mit await

```javascript
async function fetchMultipleData() {
  try {
    const [userData, postsData] = await Promise.all([
      fetch('https://api.example.com/users').then(response => response.json()),
      fetch('https://api.example.com/posts').then(response => response.json())
    ]);
    console.log('Benutzerdaten:', userData);
    console.log('Beitragsdaten:', postsData);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

fetchMultipleData();
```

In diesem Beispiel werden mehrere API-Anfragen parallel ausgeführt und mit Promise.all kombiniert. Das await wartet darauf, dass alle Promises in der Array-Liste erfolgreich aufgelöst werden, bevor es mit der Verarbeitung fortfährt.