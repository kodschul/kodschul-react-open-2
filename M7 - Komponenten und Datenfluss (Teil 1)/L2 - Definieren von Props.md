## Definieren von Props in eigenen Komponenten und deren Verwendung

Props (Eigenschaften) sind eine Möglichkeit, Daten von einer Komponente an eine andere zu übergeben. Sie ermöglichen die Konfiguration von Komponenten und machen sie wiederverwendbar. Im Folgenden sind einige Codebeispiele zum Definieren von Props in eigenen Komponenten und deren Verwendung:

### Beispiel 1: Einfache Verwendung von Props

```jsx
import React from 'react';

function Greeting(props) {
  return <h1>Hallo, {props.name}!</h1>;
}

// Verwendung des Greeting-Komponenten mit Props
const element = <Greeting name="John" />;

export default element;
```

In diesem Beispiel wird die Greeting-Komponente definiert, die ein Prop name akzeptiert und eine personalisierte Begrüßung rendert.

Beispiel 2: Standardwerte für Props festlegen

```jsx
import React from 'react';

function Greeting(props) {
  const name = props.name || 'Welt'; // Standardwert für "name"

  return <h1>Hallo, {name}!</h1>;
}

// Verwendung des Greeting-Komponenten mit und ohne Props
const element1 = <Greeting />;
const element2 = <Greeting name="John" />;

export default { element1, element2 };
```

Hier wird die Greeting-Komponente so aktualisiert, dass sie einen Standardwert für name hat, falls kein Wert übergeben wird.

Beispiel 3: Verwendung von Props in Listen

```jsx
import React from 'react';

function UserList(props) {
  return (
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Verwendung des UserList-Komponenten mit Props
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Doe' }
];
const element = <UserList users={users} />;

export default element;
```

Dieses Beispiel zeigt, wie eine Liste von Benutzern an die UserList-Komponente übergeben und gerendert wird.