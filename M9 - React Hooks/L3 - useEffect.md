## Verwendung von useEffect-Hook für nebenläufige Operationen und Effekte

Der useEffect-Hook in React ermöglicht es Funktionskomponenten, nebenläufige Operationen und Effekte auszuführen. Dies ist nützlich, um auf Seiteneffekte wie Daten laden, Abonnements einrichten oder DOM-Manipulationen zu reagieren. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Verwendung des useEffect-Hooks:

### Beispiel 1: Einfacher Effekt

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Aktualisiere den Titel des Dokuments mit dem aktuellen Zählerstand
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>Du hast {count} Mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}

export default App;
```

In diesem Beispiel wird der useEffect-Hook verwendet, um den Seitentitel basierend auf dem Zählerstand zu aktualisieren. Der Effekt wird bei jedem Rendern der Komponente ausgeführt.

Beispiel 2: Steuern des Effektverhaltens

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    // Führe diesen Effekt nur aus, wenn der Name geändert wurde
    document.title = `Hallo, ${name}!`;
  }, [name]);

  return (
    <div>
      <p>Dein Name: {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name eingeben"
      />
      <p>Du hast {count} Mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}

export default App;
```

In diesem Beispiel wird der Effekt nur ausgeführt, wenn sich der Wert von name ändert. Dies wird durch die Array-Abhängigkeit in useEffect erreicht.

Beispiel 3: Aufräumen mit dem Cleanup-Effekt

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Definiere einen Effekt, der aufgerufen wird, wenn die Komponente demontiert wird
    return () => {
      console.log('Aufräumen');
    };
  }, []);

  return (
    <div>
      <p>Du hast {count} Mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}

export default App;
```

In diesem Beispiel wird ein Cleanup-Effekt definiert, der aufgerufen wird, wenn die Komponente demontiert wird. Dies ist nützlich für das Aufräumen von Ressourcen wie Abonnements oder Timern.