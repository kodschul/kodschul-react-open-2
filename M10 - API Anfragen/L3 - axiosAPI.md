## Verwendung des axios-APIs zum Senden von HTTP-Anfragen

Axios ist eine beliebte JavaScript-Bibliothek, die eine einfache API bietet, um HTTP-Anfragen von einer Webanwendung aus zu senden. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Verwendung des axios-APIs:

### Beispiel 1: GET-Anfrage senden

```javascript
const axios = require('axios');

// Senden einer GET-Anfrage an eine bestimmte URL
axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log('Daten empfangen:', response.data);
  })
  .catch(error => {
    console.error('Fehler beim Empfangen der Daten:', error);
  });
```

In diesem Beispiel wird eine GET-Anfrage an die URL "https://jsonplaceholder.typicode.com/posts" gesendet. Die empfangenen Daten werden dann in der Konsole ausgegeben.

Beispiel 2: POST-Anfrage senden

```javascript
const axios = require('axios');

// Daten für die POST-Anfrage
const data = {
  title: 'foo',
  body: 'bar',
  userId: 1
};

// Senden einer POST-Anfrage mit den Daten an eine bestimmte URL
axios.post('https://jsonplaceholder.typicode.com/posts', data)
  .then(response => {
    console.log('Antwort erhalten:', response.data);
  })
  .catch(error => {
    console.error('Fehler beim Senden der POST-Anfrage:', error);
  });
```

Hier wird eine POST-Anfrage an die URL "https://jsonplaceholder.typicode.com/posts" gesendet und Daten mitgeschickt. Die Antwort der Anfrage wird dann in der Konsole ausgegeben.

Beispiel 3: Verwendung von axios mit async/await

```javascript
const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Daten empfangen:', response.data);
  } catch (error) {
    console.error('Fehler beim Empfangen der Daten:', error);
  }
}

fetchData();
```

Dieses Beispiel zeigt die Verwendung von axios mit async/await, um eine GET-Anfrage abzusenden. Dies kann den Code lesbarer machen, insbesondere wenn mehrere Anfragen nacheinander gesendet werden müssen.