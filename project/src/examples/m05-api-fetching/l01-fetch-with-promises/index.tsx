import { useEffect, useState } from "react";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

const App = () => {
  // Beim ersten Render ist die Liste leer: Die Daten sind noch unterwegs.
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/character`)
      .then((response) => response.json())
      .then((data: CharacterPage) => setCharacters(data.results))
      .catch((error) => console.error("Anfrage fehlgeschlagen", error));
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      <p className="mb-4">{characters.length} Charaktere geladen</p>
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
