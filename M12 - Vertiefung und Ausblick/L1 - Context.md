## Überblick über die Verwendung von Context in React zur Datenweitergabe über einen Komponentenbaum hinweg

Context ist ein leistungsfähiges Feature in React, das es ermöglicht, Daten durch den Komponentenbaum zu übergeben, ohne jede Komponente manuell durch Props zu durchlaufen. Es ist besonders nützlich, wenn Daten von vielen Komponenten in verschiedenen Ebenen des Baumes benötigt werden. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele für die Verwendung von Context in React:

### Beispiel 1: Erstellung und Verwendung eines Contexts

```jsx
import React, { createContext, useContext } from 'react';

// Erstellen eines Contexts
const ThemeContext = createContext('light');

// Verwendung des Contexts mit useContext-Hook
function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <p>Aktuelles Thema: {theme}</p>;
}

// Verwendung des Context-Providers
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

export default App;
```

In diesem Beispiel wird ein Context mit createContext erstellt und in einer Komponente mit useContext verwendet, um auf den aktuellen Wert des Contexts zuzugreifen. Der Context-Provider <ThemeContext.Provider> wird verwendet, um den Wert für den Context-Baum festzulegen.

Beispiel 2: Verwendung von Context in Klassenkomponenten

```jsx
import React from 'react';

// Erstellen eines Contexts
const ThemeContext = React.createContext('light');

// Verwendung des Context-Consumers in einer Klassenkomponente
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button theme={this.context}>{this.context}</button>;
  }
}

// Verwendung des Context-Providers
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export default App;

```

Dieses Beispiel zeigt, wie man einen Context in einer Klassenkomponente mit this.context verwendet. Der Context-Provider wird ebenfalls verwendet, um den Wert für den Context-Baum festzulegen.