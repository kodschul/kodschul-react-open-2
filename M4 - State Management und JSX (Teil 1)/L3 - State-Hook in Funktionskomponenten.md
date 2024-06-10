## Verwendung des State-Hooks in Funktionskomponenten

Der State-Hook (`useState`) in React ermöglicht es Funktionskomponenten, lokalen State zu verwalten. Dies ist besonders nützlich, wenn Komponenten intern Daten speichern müssen, die sich im Laufe der Zeit ändern können. Im Folgenden sind einige Codebeispiele zur Verwendung des State-Hooks in Funktionskomponenten:

### Beispiel 1: Einfacher State

```jsx
import React, { useState } from 'react';

function Counter() {
  // Deklariere eine neue State-Variable, die wir "count" nennen
  // Initialisieren des State mit 0
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

In diesem Beispiel wird ein einfacher Zähler implementiert. Der useState-Hook wird verwendet, um den State count und die Funktion setCount zum Aktualisieren dieses States zu erstellen. Jedes Mal, wenn der Button geklickt wird, wird der Zähler inkrementiert.

Beispiel 2: Komplexer State (Objekt)

```jsx
import React, { useState } from 'react';

function UserInfo() {
  // Deklariere eine neue State-Variable, die wir "user" nennen
  // Initialisieren des State mit einem Objekt
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

In diesem Beispiel wird ein Formular zur Eingabe von Benutzerinformationen erstellt. Der State user ist ein Objekt mit den Eigenschaften name und age. Die useState-Hook wird verwendet, um den initialen State zu erstellen und die Funktion setUser zum Aktualisieren des States zu erhalten. Beachten Sie, dass setUser das vorherige Objekt kopiert und nur die entsprechende Eigenschaft ändert, um die Unveränderlichkeit des States sicherzustellen.

Beispiel 3: Verwendung mehrerer State-Variablen

```jsx
import React, { useState } from 'react';

function Toggle() {
  // Deklariere zwei State-Variablen: "isToggled" und "message"
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