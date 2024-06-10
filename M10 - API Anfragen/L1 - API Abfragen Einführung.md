## Einführung in das Abfragen von APIs in React

Das Abfragen von APIs ist eine häufige Aufgabe in Webanwendungen, um Daten von einem Server zu erhalten. In React gibt es verschiedene Möglichkeiten, APIs abzufragen, wobei `fetch` und Bibliotheken wie `axios` und `fetch` verwendet werden können. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Einführung in das Abfragen von APIs in React:

### Beispiel 1: Verwendung von fetch

```jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Benutzerliste</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

In diesem Beispiel wird die fetch-API verwendet, um Daten von jsonplaceholder.typicode.com abzurufen und eine Liste von Benutzern anzuzeigen. Die useEffect-Hook wird verwendet, um die Daten beim Rendern der Komponente zu laden.

Beispiel 2: Verwendung von axios

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data));
  }, []);

  return (
    <div>
      <h1>Benutzerliste</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

In diesem Beispiel wird die axios-Bibliothek verwendet, um Daten von jsonplaceholder.typicode.com abzurufen. Zuerst muss die Bibliothek mit npm install axios installiert werden.