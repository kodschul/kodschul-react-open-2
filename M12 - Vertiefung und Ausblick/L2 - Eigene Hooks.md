## Erstellung eigener Hooks zur Wiederverwendung von Logik in Funktionskomponenten

Hooks sind eine leistungsstarke Funktion in React, mit der Logik zwischen Komponenten wiederverwendet werden kann. Indem eigene Hooks erstellt werden, können Sie Code besser organisieren und Funktionalitäten über verschiedene Komponenten hinweg teilen. Im Folgenden sind einige Beispiele und Konzepte zur Erstellung eigener Hooks:

### Beispiel 1: Verwendung eines benutzerdefinierten Hooks

```jsx
import React, { useState, useEffect } from 'react';

// Benutzerdefinierter Hook zum Verfolgen der Fensterbreite
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

// Komponente, die den benutzerdefinierten Hook verwendet
function WindowWidth() {
  const width = useWindowWidth();

  return <p>Fensterbreite: {width}px</p>;
}

export default WindowWidth;
```

In diesem Beispiel wird ein benutzerdefinierter Hook useWindowWidth erstellt, der die Breite des Browserfensters verfolgt. Die WindowWidth-Komponente verwendet diesen Hook, um die Fensterbreite anzuzeigen.

Beispiel 2: Verwendung eines benutzerdefinierten Hooks zur API-Anbindung

```jsx
import React, { useState, useEffect } from 'react';

// Benutzerdefinierter Hook zum Abrufen von Daten über eine API
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    }

    fetchData();
  }, [url]);

  return { data, loading };
}

// Komponente, die den benutzerdefinierten Hook verwendet
function UserProfile() {
  const { data, loading } = useFetch('https://api.example.com/user');

  if (loading) {
    return <p>Lade Benutzerprofil...</p>;
  }

  return (
    <div>
      <h2>Benutzerprofil</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}

export default UserProfile;
```

Hier wird ein benutzerdefinierter Hook useFetch erstellt, um Daten über eine API abzurufen. Die UserProfile-Komponente verwendet diesen Hook, um das Benutzerprofil anzuzeigen, während die Daten geladen werden.