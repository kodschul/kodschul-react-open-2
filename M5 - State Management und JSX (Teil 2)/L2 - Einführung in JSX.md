## Einführung in JSX: Die React-Templatesprache

JSX ist eine JavaScript-Erweiterung, die es ermöglicht, React-Elemente in einem syntaktisch suggerierten HTML-ähnlichen Format zu schreiben. Es bietet eine intuitive und deklarative Möglichkeit, Benutzeroberflächen zu erstellen. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Einführung in JSX:

### Beispiel 1: Grundlegende Verwendung von JSX

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// JSX-Element
const element = <h1>Hallo, Welt!</h1>;

// Rendern des JSX-Elements in den DOM
ReactDOM.render(element, document.getElementById('root'));
```

In diesem Beispiel wird ein einfaches JSX-Element (<h1>Hallo, Welt!</h1>) erstellt und mit ReactDOM.render() in den DOM gerendert.

Beispiel 2: Verwendung von JSX mit Ausdrücken

```jsx
import React from 'react';

function Greeting(props) {
  return <h1>Hallo, {props.name}!</h1>;
}

// Verwendung des Greeting-Komponenten mit JSX
const element = <Greeting name="John" />;

export default element;
```

Hier wird die Greeting-Komponente mit JSX definiert und verwendet. JSX ermöglicht es, JavaScript-Ausdrücke innerhalb von geschweiften Klammern {} einzubetten, um dynamische Inhalte zu rendern.

Beispiel 3: Verwendung von JSX mit Bedingungen und Schleifen

```jsx
import React from 'react';

function App() {
  const isLoggedIn = true;
  const numbers = [1, 2, 3, 4, 5];

  return (
    <div>
      {isLoggedIn ? (
        <p>Willkommen zurück!</p>
      ) : (
        <button>Anmelden</button>
      )}
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Hier wird JSX mit Bedingungen (isLoggedIn ? ... : ...) und Schleifen (numbers.map(...)) verwendet, um dynamische Inhalte basierend auf dem Anwendungsstatus zu rendern.
