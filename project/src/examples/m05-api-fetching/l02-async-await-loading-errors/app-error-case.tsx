import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

// FEHLERFALL: absichtlich falsche URL (richtig wäre "/character"). Die API antwortet mit 404.
const ENDPOINT = "/character-";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: CharacterPage = await response.json();
        setCharacters(data.results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacters();
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      {isLoading && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {characters.map((character) => (
          <div key={character.id}>
            <img
              className="h-48 w-48 rounded object-cover"
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
            />
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
