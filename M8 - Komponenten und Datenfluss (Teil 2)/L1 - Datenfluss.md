## Datenfluss zwischen Komponenten: Verwendung von Props und State

In React werden Daten zwischen Komponenten über Props und State übertragen. Dies ermöglicht die Kommunikation und den Datenfluss in der Anwendung. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Verwendung von Props und State für den Datenfluss zwischen Komponenten:

### Beispiel 1: Verwendung von Props

```jsx
import React from 'react';

// Funktionale Komponente mit Props
function Greeting(props) {
  return <h1>Hallo, {props.name}!</h1>;
}

// Verwendung der Greeting-Komponente mit Props
const element = <Greeting name="John" />;

export default element;
```

In diesem Beispiel wird die Greeting-Komponente mit Props verwendet. Props sind Daten, die von einer übergeordneten Komponente an eine untergeordnete Komponente übergeben werden können.

Beispiel 2: Verwendung von State

```jsx
import React, { useState } from 'react';

// Funktionale Komponente mit State
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Zähler: {count}</p>
      <button onClick={() => setCount(count + 1)}>Erhöhen</button>
    </div>
  );
}

export default Counter;
```

Hier wird die Counter-Komponente mit State verwendet. State ist lokal und kann von der Komponente selbst verwaltet werden. Die useState-Hook wird verwendet, um den Zustand zu initialisieren und eine Funktion zum Aktualisieren des Zustands bereitzustellen.

Beispiel 3: Datenfluss zwischen Eltern- und Kindkomponenten

```jsx
import React, { useState } from 'react';

// Kindkomponente
function ChildComponent(props) {
  return <p>{props.message}</p>;
}

// Elternkomponente
function ParentComponent() {
  const [message, setMessage] = useState('Initialnachricht');

  const handleMessageChange = () => {
    setMessage('Neue Nachricht');
  };

  return (
    <div>
      <ChildComponent message={message} />
      <button onClick={handleMessageChange}>Nachricht ändern</button>
    </div>
  );
}

export default ParentComponent;
```

Hier wird der Datenfluss zwischen Eltern- und Kindkomponenten veranschaulicht. Die ParentComponent hat einen State (message), der an die ChildComponent über Props übergeben wird. Durch Interaktion mit der ParentComponent wird der Zustand aktualisiert und die Änderungen werden an die ChildComponent weitergeleitet.