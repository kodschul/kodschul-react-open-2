## Festsetzen und Ändern des Anwendungszustands

Der State-Hook (`useState`) in React ermöglicht es Funktionskomponenten, den Zustand einer Anwendung zu verwalten. Dies ist entscheidend für die Reaktivität und Dynamik von React-Anwendungen. Im Folgenden sind einige Codebeispiele zum Festsetzen und Ändern des Anwendungszustands:

### Beispiel 1: Einfacher Zustand

```jsx
import React, { useState } from 'react';

function App() {
  // Definiere eine State-Variable mit dem Namen "isLoggedIn"
  // Initialisiere den Zustand mit "false" (Benutzer ist nicht eingeloggt)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Willkommen zurück!</h1>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Einloggen</button>
      )}
    </div>
  );
}

export default App;
```

In diesem Beispiel wird der Zustand isLoggedIn verwendet, um zu verfolgen, ob der Benutzer eingeloggt ist. Durch Klicken auf den Button wird der Zustand auf true gesetzt und eine Willkommensnachricht wird angezeigt.

Beispiel 2: Komplexer Zustand (Objekt)

```jsx
import React, { useState } from 'react';

function UserProfile() {
  // Definiere eine State-Variable mit dem Namen "user"
  // Initialisiere den Zustand mit einem leeren Objekt
  const [user, setUser] = useState({ name: '', email: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        placeholder="Name eingeben"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="E-Mail eingeben"
      />
      <p>Name: {user.name}</p>
      <p>E-Mail: {user.email}</p>
    </form>
  );
}

export default UserProfile;
```

Dieses Beispiel zeigt ein Formular zur Eingabe von Benutzerprofilinformationen. Der Zustand user ist ein Objekt mit den Eigenschaften name und email. Beim Ändern eines Eingabefeldes wird der entsprechende Wert im Zustand aktualisiert.

Beispiel 3: Verwendung mehrerer Zustandsvariablen

```jsx
import React, { useState } from 'react';

function Counter() {
  // Definiere zwei separate State-Variablen: "count" und "step"
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    setCount(count + step);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <input
        type="number"
        value={step}
        onChange={e => setStep(parseInt(e.target.value))}
      />
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```
In diesem Beispiel werden zwei separate State-Variablen (count und step) verwendet. Der count-Zähler wird um den Wert von step erhöht, wenn der Button geklickt wird.