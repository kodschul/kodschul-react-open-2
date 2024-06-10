## CSS-Klassen und Stile in React-Komponenten

Das Styling von React-Komponenten kann auf verschiedene Arten erfolgen, einschließlich der Verwendung von CSS-Klassen und Inline-Stilen. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Verwendung von CSS-Klassen und Stilen in React-Komponenten:

### Beispiel 1: Verwendung von CSS-Klassen

```jsx
import React from 'react';
import './styles.css'; // Importieren externer CSS-Datei

function Button() {
  return <button className="btn-primary">Klick mich</button>;
}

export default Button;
```

In diesem Beispiel wird eine CSS-Klasse namens btn-primary auf einen Button angewendet. Die zugehörigen Styles werden in einer externen CSS-Datei definiert und über className zugewiesen.

Beispiel 2: Verwendung von Inline-Stilen

```jsx
import React from 'react';

function Card() {
  const cardStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '5px'
  };

  return <div style={cardStyle}>Inhalt der Karte</div>;
}

export default Card;
```

Hier wird ein Inline-Stilobjekt erstellt und auf eine <div>-Komponente angewendet. Die Stile werden direkt als JavaScript-Objekt definiert und über das style-Attribut zugewiesen.

Beispiel 3: Dynamisches Styling

```jsx
import React from 'react';

function Message({ isError }) {
  const messageStyle = {
    color: isError ? 'red' : 'green',
    fontSize: '18px'
  };

  return <p style={messageStyle}>{isError ? 'Fehler!' : 'Erfolgreich!'}</p>;
}

export default Message;
```

Hier wird das Styling basierend auf einer dynamischen Bedingung festgelegt. Je nach Wert der isError-Prop wird der Text entweder in Rot (Fehler) oder Grün (Erfolgreich) angezeigt.