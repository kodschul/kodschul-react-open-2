## Binden von Inhalten und Properties

Das Binden von Inhalten und Eigenschaften in React ermöglicht es, dynamische Daten in JSX einzubetten und Komponenten flexibel zu gestalten. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zum Binden von Inhalten und Properties:

### Beispiel 1: Binden von Textinhalten

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hallo, {props.name}!</h1>;
}

const element = <Welcome name="John" />;

export default element;
```

In diesem Beispiel wird der Name "John" als Eigenschaft an die Welcome-Komponente übergeben und in den Textinhalt (<h1>Hallo, {props.name}!</h1>) eingebunden.

Beispiel 2: Binden von Attributen

```jsx
import React from 'react';

function Link(props) {
  return <a href={props.url}>Link</a>;
}

const element = <Link url="https://www.example.com" />;

export default element;
```

Hier wird die URL "https://www.example.com" als Eigenschaft an die Link-Komponente übergeben und im href-Attribut des a-Elements eingebunden.

Beispiel 3: Bedingtes Rendern

```jsx
import React from 'react';

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Willkommen zurück!</h1>;
  }
  return <h1>Bitte einloggen.</h1>;
}

const element = <Greeting isLoggedIn={false} />;

export default element;
```

In diesem Beispiel wird die isLoggedIn-Eigenschaft an die Greeting-Komponente übergeben, um zu entscheiden, welcher Text gerendert werden soll.