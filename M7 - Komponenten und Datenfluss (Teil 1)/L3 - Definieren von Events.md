## Definieren von Events in eigenen Komponenten zur Benutzerinteraktion

In React können eigene Komponenten so definiert werden, dass sie auf Benutzerinteraktionen reagieren. Dies geschieht durch das Hinzufügen von Event-Handlern zu JSX-Elementen innerhalb der Komponenten. Im Folgenden sind einige Beispiele für die Definition von Events in eigenen Komponenten:

### Beispiel 1: Klick-Event

```jsx
import React from 'react';

class Button extends React.Component {
  handleClick() {
    console.log('Button wurde geklickt');
  }

  render() {
    return <button onClick={this.handleClick}>Klick mich</button>;
  }
}

export default Button;
```

In diesem Beispiel wird ein Button-Komponente definiert, die auf einen Klick reagiert. Der Event-Handler handleClick wird aufgerufen, wenn der Button geklickt wird.

Beispiel 2: Eingabe-Event

```jsx
import React from 'react';

class Input extends React.Component {
  handleChange(event) {
    console.log('Eingabewert geändert:', event.target.value);
  }

  render() {
    return <input type="text" onChange={this.handleChange} />;
  }
}

export default Input;
```

Hier wird eine Input-Komponente definiert, die auf Änderungen im Eingabefeld reagiert. Der Event-Handler handleChange wird jedes Mal aufgerufen, wenn der Wert im Eingabefeld geändert wird.

Beispiel 3: Formular-Submit-Event

```jsx
import React from 'react';

class Form extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log('Formular abgeschickt');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Absenden</button>
      </form>
    );
  }
}

export default Form;
```

In diesem Beispiel wird eine Form-Komponente definiert, die auf das Absenden des Formulars reagiert. Der Event-Handler handleSubmit wird aufgerufen, wenn das Formular abgeschickt wird, und event.preventDefault() wird verwendet, um das Standardverhalten des Browsers zu verhindern.