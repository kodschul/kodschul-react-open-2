## Verwendung des fetch-APIs zum Senden von HTTP-Anfragen

Das fetch-API bietet eine moderne Möglichkeit, HTTP-Anfragen in JavaScript zu senden und auf Antworten zu reagieren. Es ist standardmäßig in modernen Browsern verfügbar und bietet eine einfach zu verwendende Syntax. Im Folgenden sind einige Beispiele zur Verwendung des fetch-APIs:

### Beispiel 1: GET-Anfrage

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Netzwerkantwort war nicht in Ordnung');
    }
    return response.json();
  })
  .then(data => {
    console.log('Daten empfangen:', data);
  })
  .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
  });
```

In diesem Beispiel wird eine GET-Anfrage an die URL 'https://api.example.com/data' gesendet. Die fetch-Funktion gibt ein Promise zurück, das die Netzwerkantwort repräsentiert. Wir überprüfen zuerst, ob die Antwort erfolgreich war (Statuscode 200-299) und parsen dann die JSON-Daten aus der Antwort.

Beispiel 2: POST-Anfrage mit Daten

```javascript
const userData = {
  username: 'benutzer123',
  email: 'benutzer123@example.com'
};

fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => {
  console.log('Neuer Benutzer erstellt:', data);
})
.catch(error => {
  console.error('Fehler beim Erstellen des Benutzers:', error);
});
```

Dieses Beispiel sendet eine POST-Anfrage an 'https://api.example.com/users' und fügt JSON-Daten im Request-Body hinzu. Die fetch-Funktion akzeptiert ein optionales zweites Argument, das Konfigurationsoptionen wie die HTTP-Methode, Header und den Body enthält.

Beispiel 3: Verwendung von async/await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Netzwerkantwort war nicht in Ordnung');
    }
    const data = await response.json();
    console.log('Daten empfangen:', data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

fetchData();
```

Dieses Beispiel zeigt die Verwendung von async/await mit dem fetch-API. Die Funktion fetchData ruft die Daten ab und verarbeitet sie asynchron. Dies verbessert die Lesbarkeit und den Umgang mit asynchronem Code im Vergleich zur Verwendung von Promises.