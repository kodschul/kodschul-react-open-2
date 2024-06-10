## Übersicht über häufig verwendete eingebaute Hooks wie useContext und useRef

React bietet eine Vielzahl von eingebauten Hooks, die es erleichtern, den Zustand und das Verhalten von Funktionskomponenten zu verwalten. Hier ist eine Übersicht über einige der häufig verwendeten eingebauten Hooks:

### 1. useState

Der `useState`-Hook ermöglicht es Funktionskomponenten, lokalen State zu verwalten.

Beispiel:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

2. useEffect
Der useEffect-Hook ermöglicht es Funktionskomponenten, Side-Effects in ihrer Funktionsweise zu integrieren, z. B. Daten laden, Abonnements einrichten usw.

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Daten laden
    fetchData().then(result => setData(result));
  }, []); // Leeres Array als Abhängigkeiten, um den Effekt nur einmalig auszuführen

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}

export default DataFetcher;
```

3. useContext
Der useContext-Hook ermöglicht den Zugriff auf den Kontext in Funktionskomponenten.

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemeComponent() {
  const theme = useContext(ThemeContext);
  return <p>Aktuelles Thema: {theme}</p>;
}

export default ThemeComponent;
```

4. useRef
Der useRef-Hook ermöglicht den Zugriff auf ein persistierendes Objekt, dessen aktuelle Eigenschaft .current ist.

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const focusInput = () => {
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={focusInput}>Fokus setzen</button>
    </div>
  );
}

export default TextInputWithFocusButton;
```