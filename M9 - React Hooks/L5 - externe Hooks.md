## Installation und Verwendung von externen Hooks aus Bibliotheken

Externe Hooks aus Bibliotheken bieten eine einfache Möglichkeit, gängige Funktionalitäten in React-Anwendungen zu integrieren und den Code wiederzuverwenden. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Installation und Verwendung von externen Hooks aus Bibliotheken:

### Beispiel 1: Installation eines externen Hooks

```bash
npm install react-use
```

Hier wird das Paket react-use als Beispiel für eine Bibliothek mit verschiedenen React-Hooks installiert.

Beispiel 2: Verwendung des externen Hooks

```jsx
import React from 'react';
import { useLocalStorage } from 'react-use';

function App() {
  const [value, setValue] = useLocalStorage('myKey', 'defaultValue');

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Gespeicherter Wert: {value}</p>
    </div>
  );
}

export default App;

```

In diesem Beispiel wird der useLocalStorage-Hook aus der react-use-Bibliothek verwendet, um einen Wert im Local Storage zu speichern und zu lesen.

Beispiel 3: Verwendung eines weiteren externen Hooks

```jsx
import React from 'react';
import { useWindowSize } from 'react-use';

function DisplayWindowSize() {
  const { width, height } = useWindowSize();

  return <div>Fenstergröße: {width}x{height}</div>;
}

export default DisplayWindowSize;
```

Hier wird der useWindowSize-Hook aus der react-use-Bibliothek verwendet, um die Größe des Browserfensters abzurufen und anzuzeigen.