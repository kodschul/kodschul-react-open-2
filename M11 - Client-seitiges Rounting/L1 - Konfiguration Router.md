## Konfiguration von Routen und Anzeigen verschiedener Ansichten basierend auf der Route

Die Konfiguration von Routen und das Anzeigen verschiedener Ansichten basierend auf der aktuellen Route sind wichtige Aspekte beim Aufbau von Single-Page-Anwendungen mit React. React Router ist eine gängige Bibliothek, die dies ermöglicht. Im Folgenden sind einige grundlegende Konzepte und Codebeispiele zur Konfiguration von Routen und Anzeigen verschiedener Ansichten:

### Beispiel 1: Grundlegende Konfiguration von Routen

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}

export default App;
```

In diesem Beispiel werden Routen für die Startseite (/), die Über-Seite (/about) und die Kontakt-Seite (/contact) konfiguriert. Die Route-Komponente aus React Router rendert die entsprechende Ansicht basierend auf der aktuellen URL.

Beispiel 2: Anzeigen verschiedener Ansichten basierend auf der Route

```jsx
// Home.jsx
import React from 'react';

function Home() {
  return <h1>Willkommen auf der Startseite!</h1>;
}

export default Home;
```

```jsx
// About.jsx
import React from 'react';

function About() {
  return <h1>Über uns</h1>;
}

export default About;
```

```jsx
// Contact.jsx
import React from 'react';

function Contact() {
  return <h1>Kontaktiere uns</h1>;
}

export default Contact;
```

In diesem Beispiel werden separate Dateien für die Home-, About- und Contact-Ansichten erstellt. Jede Ansicht ist eine einfache React-Komponente, die beim Aufrufen der entsprechenden Route gerendert wird.