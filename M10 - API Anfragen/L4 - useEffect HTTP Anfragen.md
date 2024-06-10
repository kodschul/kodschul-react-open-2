## Verwendung des useEffect-Hooks zum Auslösen von HTTP-Anfragen

Das `useEffect`-Hook in React ermöglicht es Funktionskomponenten, Side-Effects durchzuführen, wie z. B. das Auslösen von HTTP-Anfragen. Dies ist nützlich, um Daten von einem Server zu laden und sie in der Benutzeroberfläche anzuzeigen. Im Folgenden sind einige Codebeispiele zur Verwendung des `useEffect`-Hooks zum Auslösen von HTTP-Anfragen:

### Beispiel 1: Einfache HTTP-Anfrage mit useEffect

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.example.com/data');
      setData(result.data);
    };

    fetchData();
  }, []); // Leerer Array als zweites Argument bedeutet, dass der Effekt nur einmalig nach dem ersten Rendern ausgeführt wird

  return (
    <div>
      {data ? (
        <p>Daten erfolgreich geladen: {data}</p>
      ) : (
        <p>Lade Daten...</p>
      )}
    </div>
  );
}

export default DataFetcher;
```

In diesem Beispiel wird das useEffect-Hook verwendet, um eine HTTP-GET-Anfrage an eine API (https://api.example.com/data) auszulösen. Die erhaltenen Daten werden im lokalen State gespeichert und in der Benutzeroberfläche angezeigt.

Beispiel 2: Verwendung von useEffect mit Abhängigkeiten

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://api.example.com/data/${props.id}`);
      setData(result.data);
    };

    fetchData();
  }, [props.id]); // Props als Abhängigkeiten, sodass die Anfrage erneut ausgelöst wird, wenn sich die ID ändert

  return (
    <div>
      {data ? (
        <p>Daten für ID {props.id}: {data}</p>
      ) : (
        <p>Lade Daten...</p>
      )}
    </div>
  );
}

export default DataFetcher;
```

Hier wird das useEffect-Hook verwendet, um eine HTTP-GET-Anfrage basierend auf einer übergebenen ID auszulösen. Die Anfrage wird erneut ausgelöst, wenn sich die ID ändert, da sie als Abhängigkeit angegeben ist.