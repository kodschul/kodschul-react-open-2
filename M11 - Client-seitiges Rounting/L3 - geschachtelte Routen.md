## Implementierung von geschachtelten Routen und Layouts

Das Erstellen von geschachtelten Routen und Layouts ist eine häufige Anforderung in React-Anwendungen, insbesondere bei größeren Anwendungen mit komplexen Navigationsstrukturen. Dies ermöglicht es, verschiedene Ansichten und Komponenten basierend auf der URL zu rendern. Im Folgenden sind einige Konzepte und Codebeispiele zur Implementierung von geschachtelten Routen und Layouts:

### Beispiel 1: Verwendung von React Router für geschachtelte Routen

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
```

In diesem Beispiel wird React Router verwendet, um geschachtelte Routen zu definieren. Die Komponenten Home, About, Dashboard und NotFound werden entsprechend ihren Pfaden gerendert.

Beispiel 2: Implementierung eines Layouts mit React Router

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

Hier wird ein einfaches Layout implementiert, das einen Header und einen Footer enthält. Die Hauptinhaltsteile werden mit React Router gerendert, um verschiedene Ansichten basierend auf der URL anzuzeigen.

Beispiel 3: Verschachtelte Routen mit React Router

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
```

Dieses Beispiel zeigt, wie man verschachtelte Routen mit React Router implementiert. Hier werden Routen wie /dashboard/profile und /dashboard/settings durch die Verwendung von Switch und verschachtelten Route-Komponenten ermöglicht.