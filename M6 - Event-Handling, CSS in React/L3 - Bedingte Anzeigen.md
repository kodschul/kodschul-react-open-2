## Bedingte Anzeige von Elementen mit if / else in JSX

In JSX können Bedingungen mit Hilfe von Inline-If-Else-Ausdrücken oder dem Conditional-Operator (`condition ? true : false`) umgesetzt werden. Dies ermöglicht die bedingte Anzeige von Elementen in React-Komponenten. Im Folgenden sind einige Beispiele für die bedingte Anzeige von Elementen mit if / else in JSX:

### Beispiel 1: Inline-If-Else-Ausdruck

```jsx
import React from 'react';

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <div>
      {isLoggedIn ? (
        <h1>Willkommen zurück!</h1>
      ) : (
        <h1>Bitte einloggen</h1>
      )}
    </div>
  );
}

export default Greeting;
```

In diesem Beispiel wird die Komponente Greeting verwendet, um eine Begrüßungsnachricht basierend auf dem Anmeldestatus anzuzeigen. Wenn der Benutzer eingeloggt ist, wird "Willkommen zurück!" angezeigt, sonst wird "Bitte einloggen" angezeigt.

Beispiel 2: Conditional-Operator

```jsx
import React from 'react';

function StatusIndicator(props) {
  const status = props.status;

  return (
    <div>
      <p>
        Der Status ist: {status === 'online' ? 'Online' : 'Offline'}
      </p>
    </div>
  );
}

export default StatusIndicator;

```

Hier wird der Conditional-Operator verwendet, um den Status anzuzeigen. Wenn der Status 'online' ist, wird 'Online' angezeigt, sonst wird 'Offline' angezeigt.

Beispiel 3: Verwendung von Inline-If-Else mit logischer &&-Operator

```jsx
import React from 'react';

function Message(props) {
  const showMessage = props.showMessage;

  return (
    <div>
      {showMessage && <p>Die Nachricht wird angezeigt.</p>}
    </div>
  );
}

export default Message;

```

In diesem Beispiel wird der logische &&-Operator verwendet, um zu prüfen, ob die Nachricht angezeigt werden soll. Wenn showMessage wahr ist, wird die Nachricht angezeigt.