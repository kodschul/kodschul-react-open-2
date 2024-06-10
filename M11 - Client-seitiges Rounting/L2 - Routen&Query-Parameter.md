## Verwendung von Routen-Parametern und Query-Parametern

In React können Routen-Parameter und Query-Parameter verwendet werden, um dynamische Inhalte basierend auf der URL zu rendern. Dies ermöglicht es, verschiedene Ansichten und Inhalte innerhalb einer Anwendung zu verwalten. Im Folgenden sind einige Beispiele und Erklärungen zur Verwendung von Routen-Parametern und Query-Parametern:

### Beispiel 1: Verwendung von Routen-Parametern

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function UserProfile(props) {
  return (
    <div>
      <h2>Benutzerprofil</h2>
      <p>Benutzername: {props.match.params.username}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <h1>Meine App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/profile/john">Johns Profil</Link>
            </li>
            <li>
              <Link to="/profile/sarah">Sarahs Profil</Link>
            </li>
          </ul>
        </nav>
        <Route path="/profile/:username" component={UserProfile} />
      </div>
    </Router>
  );
}

export default App;
```

In diesem Beispiel wird die UserProfile-Komponente erstellt, um Benutzerprofile anzuzeigen. Die Route /profile/:username definiert einen Routenparameter :username, der den Benutzernamen darstellt. Beim Navigieren zu /profile/john oder /profile/sarah wird der entsprechende Benutzername als Routenparameter übergeben und in der UserProfile-Komponente angezeigt.

Beispiel 2: Verwendung von Query-Parametern

```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get('q');

  return (
    <div>
      <h2>Suchergebnisse für "{query}"</h2>
      {/* Hier werden die Suchergebnisse angezeigt */}
    </div>
  );
}

export default SearchResults;

```

In diesem Beispiel wird die SearchResults-Komponente erstellt, um Suchergebnisse basierend auf einem Query-Parameter q anzuzeigen. Die useLocation()-Hook wird verwendet, um auf die aktuelle URL zu zugreifen, und dann werden die Query-Parameter mit URLSearchParams analysiert. Der Wert des q-Parameters wird dann extrahiert und angezeigt.