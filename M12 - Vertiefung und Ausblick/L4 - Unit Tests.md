## Unit Tests in React-Anwendungen

Unit-Tests sind eine wesentliche Praxis in der Softwareentwicklung, um sicherzustellen, dass einzelne Einheiten des Quellcodes ordnungsgemäß funktionieren. In React-Anwendungen können Unit-Tests verwendet werden, um die Funktionalität von Komponenten, Hooks und anderen Modulen zu überprüfen. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele für die Durchführung von Unit-Tests in React-Anwendungen:

### Beispiel 1: Jest und React Testing Library verwenden

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('Counter increments correctly', () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText('Increment');
  fireEvent.click(incrementButton);
  expect(getByText('Count: 1')).toBeInTheDocument();
});
```

In diesem Beispiel wird ein einfacher Unit-Test für eine Counter-Komponente mit Jest und React Testing Library durchgeführt. Der Test überprüft, ob das Zähler-Element korrekt inkrementiert wird, wenn auf die entsprechende Schaltfläche geklickt wird.

Beispiel 2: Mocking von Funktionen und Modulen

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserComponent from './UserComponent';

jest.mock('axios');

test('Fetches and displays user data', async () => {
  axios.get.mockResolvedValueOnce({ data: { name: 'John', age: 30 } });
  const { getByText } = render(<UserComponent />);
  fireEvent.click(getByText('Load User'));
  expect(await findByText('Name: John')).toBeInTheDocument();
  expect(await findByText('Age: 30')).toBeInTheDocument();
});
```

Hier wird gezeigt, wie man Funktionen und Module in Unit-Tests mit Jest mockt. In diesem Beispiel wird eine asynchrone Funktion getestet, die Benutzerdaten von einem Server abruft und anzeigt.

Beispiel 3: Verwendung von Jest Matchers für Assertions

```javascript
import { sum } from './math';

test('Adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test('Adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5);
});
```

In diesem Beispiel werden verschiedene Jest-Matcher wie toBe() verwendet, um die Ergebnisse von Berechnungen in einer einfachen Mathematikfunktion zu überprüfen.