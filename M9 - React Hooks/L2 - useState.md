## Verwendung von useState-Hook zur Verwaltung von Zuständen in Funktionskomponenten

Der State-Hook (`useState`) in React ermöglicht es Funktionskomponenten, lokalen Zustand zu verwalten. Dies ist besonders nützlich, wenn Komponenten interne Daten speichern müssen, die sich im Laufe der Zeit ändern können. Im Folgenden sind einige Codebeispiele zur Verwendung des State-Hooks in Funktionskomponenten:

### Beispiel 1: Einfacher Zustand

```jsx
import React, { useState } from 'react';

function Counter() {
  // Deklariere eine neue Zustandsvariable namens "count"
  // Initialisiere den Zustand mit 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} Mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}

export default Counter;
```

In diesem Beispiel wird ein einfacher Zähler implementiert. Der useState-Hook wird verwendet, um den Zustand count und die Funktion setCount zum Aktualisieren dieses Zustands zu erstellen. Jedes Mal, wenn der Button geklickt wird, wird der Zähler inkrementiert.

Beispiel 2: Komplexer Zustand (Objekt)

```jsx
import React, { useState } from 'react';

function UserInfo() {
  // Deklariere eine neue Zustandsvariable namens "user"
  // Initialisiere den Zustand mit einem leeren Objekt
  const [user, setUser] = useState({ name: '', age: 0 });

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name eingeben"
      />
      <input
        type="number"
        value={user.age}
        onChange={e => setUser({ ...user, age: parseInt(e.target.value) || 0 })}
        placeholder="Alter eingeben"
      />
      <p>Name: {user.name}</p>
      <p>Alter: {user.age}</p>
    </div>
  );
}

export default UserInfo;
```

In diesem Beispiel wird ein Formular zur Eingabe von Benutzerinformationen erstellt. Der Zustand user ist ein Objekt mit den Eigenschaften name und age. Der useState-Hook wird verwendet, um den initialen Zustand zu erstellen und die Funktion setUser zum Aktualisieren des Zustands zu erhalten. Beachten Sie, dass setUser das vorherige Objekt kopiert und nur die entsprechende Eigenschaft ändert, um die Unveränderlichkeit des Zustands sicherzustellen.

Beispiel 3: Verwendung mehrerer Zustandsvariablen

```jsx
import React, { useState } from 'react';

function Toggle() {
  // Deklariere zwei separate Zustandsvariablen: "isToggled" und "message"
  const [isToggled, setIsToggled] = useState(false);
  const [message, setMessage] = useState('Der Schalter ist ausgeschaltet');

  return (
    <div>
      <button onClick={() => setIsToggled(!isToggled)}>
        Schalter umschalten
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Toggle;
```