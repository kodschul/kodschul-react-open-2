## Wiederholung von Elementen in JSX

Oft ist es notwendig, Elemente in JSX zu wiederholen, zum Beispiel um Listen oder Tabellen zu rendern. Hier sind einige Beispiele, wie man das in JSX macht:

### Beispiel 1: Wiederholung von Elementen mit einer Schleife

```jsx
import React from 'react';

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default NumberList;
```

In diesem Beispiel wird eine Liste von Zahlen (numbers) übergeben und mit der map-Methode in JSX-Listenelemente (<li>) umgewandelt. Jedes Element hat einen eindeutigen key, der benötigt wird, um React eine effiziente Aktualisierung zu ermöglichen.

Beispiel 2: Verwendung von Inline-Map in JSX

```jsx
import React from 'react';

function NumberList(props) {
  const numbers = props.numbers;

  return (
    <ul>
      {numbers.map((number) =>
        <li key={number.toString()}>{number}</li>
      )}
    </ul>
  );
}

export default NumberList;
```

Dieses Beispiel ist äquivalent zum vorherigen Beispiel, verwendet jedoch eine Inline-Map direkt innerhalb des JSX-Codes. Dies kann nützlich sein, um den Code etwas kompakter zu gestalten.

Beispiel 3: Wiederholung von Elementen mit bedingten Anzeigen

```jsx
import React from 'react';

function NumberList(props) {
  const numbers = props.numbers;
  const showEvenNumbers = props.showEvenNumbers;

  return (
    <ul>
      {numbers.map((number) =>
        showEvenNumbers && number % 2 === 0 ? (
          <li key={number.toString()}>{number}</li>
        ) : null
      )}
    </ul>
  );
}

export default NumberList;
```

Hier werden nur gerade Zahlen angezeigt, wenn showEvenNumbers auf true gesetzt ist. Dies wird durch die Verwendung einer bedingten Anzeige innerhalb der Map erreicht.
