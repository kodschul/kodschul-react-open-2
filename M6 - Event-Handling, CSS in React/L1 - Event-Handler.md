## Event-Handler in React: Grundlagen und Verwendung

Event-Handler sind Funktionen, die aufgerufen werden, wenn bestimmte Ereignisse in einer React-Anwendung auftreten. Sie ermöglichen es, auf Benutzerinteraktionen wie Klicken, Eingeben von Text, Versenden von Formularen usw. zu reagieren. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Verwendung von Event-Handlern in React:

### Beispiel 1: Einfacher Klick-Event-Handler

```jsx
import React from 'react';

function ClickHandler() {
  const handleClick = () => {
    console.log('Button wurde geklickt!');
  };

  return (
    <button onClick={handleClick}>
      Klick mich
    </button>
  );
}

export default ClickHandler;
```

In diesem Beispiel wird ein einfacher Klick-Event-Handler erstellt. Die Funktion handleClick wird aufgerufen, wenn der Button geklickt wird.

Beispiel 2: Verwendung von Event-Handler mit Parameter

```jsx
import React from 'react';

function Greeting() {
  const handleGreet = (name) => {
    alert(`Hallo, ${name}!`);
  };

  return (
    <button onClick={() => handleGreet('John')}>
      Grüße anzeigen
    </button>
  );
}

export default Greeting;
```

Hier wird ein Event-Handler verwendet, um eine personalisierte Grußmeldung anzuzeigen. Der Parameter name wird an die handleGreet-Funktion übergeben.

Beispiel 3: Verwendung von Event-Handler in Formularen

```jsx
import React, { useState } from 'react';

function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Wert des Eingabefelds: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Gib hier etwas ein"
      />
      <button type="submit">Absenden</button>
    </form>
  );
}

export default Form;

```

In diesem Beispiel wird die Verwendung von Event-Handlern in einem Formular gezeigt. Die Funktion handleChange reagiert auf Änderungen im Eingabefeld, während handleSubmit aufgerufen wird, wenn das Formular abgesendet wird.