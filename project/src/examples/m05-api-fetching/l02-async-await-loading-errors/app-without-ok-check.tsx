import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

// NEGATIVBEISPIEL: falsche URL und keine response.ok-Prüfung.
// Die 404-Antwort hat kein Feld "results"; die Seite stürzt beim map ab.
const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/character-`);
        const data: CharacterPage = await response.json();
        setCharacters(data.results);
      } catch (e) {
        console.error(e);
      }
    };
    loadCharacters();
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Ohne response.ok-Prüfung</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </main>
  );
};

export default App;
