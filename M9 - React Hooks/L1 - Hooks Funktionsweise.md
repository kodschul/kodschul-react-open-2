## Funktionsweise von Hooks in React

Hooks sind eine neue Ergänzung in React 16.8, die es Funktionskomponenten ermöglichen, Zustand und andere React-Funktionen zu nutzen, die zuvor nur in Klassenkomponenten verfügbar waren. Sie bieten eine elegante Möglichkeit, Zustand und Nebeneffekte in Funktionskomponenten zu verwalten, ohne dass eine Umwandlung in Klassenkomponenten erforderlich ist. Im Folgenden werden einige grundlegende Konzepte und Beispiele zur Funktionsweise von Hooks in React erläutert:

### Beispiel 1: Verwendung des State-Hooks (`useState`)

```jsx
import React, { useState } from 'react';

function Counter() {
  // Deklariere eine neue State-Variable, die wir "count" nennen
  // Initialisieren des State mit 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} Mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}

export default Counter;
```

In diesem Beispiel wird der State-Hook (useState) verwendet, um den Zustand count und die zugehörige Update-Funktion setCount in einer Funktionskomponente zu verwalten.

Beispiel 2: Verwendung des Effect-Hooks (useEffect)

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Ähnlich wie componentDidMount und componentDidUpdate:
  useEffect(() => {
    // Update des Dokumententitels mit einem benutzerdefinierten Wert
    document.title = `Du hast ${count} Mal geklickt`;
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

export default Example;
```

Dieses Beispiel zeigt die Verwendung des Effect-Hooks (useEffect), um Nebeneffekte in Funktionskomponenten zu handhaben. In diesem Fall wird der Seitentitel aktualisiert, basierend auf dem aktuellen Wert von count.

Beispiel 3: Erstellung von benutzerdefinierten Hooks

```jsx
import { useState, useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
```

In diesem Beispiel wird ein benutzerdefinierter Hook useDocumentTitle erstellt, der es ermöglicht, den Seitentitel basierend auf einem übergebenen Wert zu aktualisieren. Dies zeigt die Flexibilität von Hooks, da sie es ermöglichen, Logik zwischen Komponenten zu teilen.