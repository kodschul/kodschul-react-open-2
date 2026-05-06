import React, { useEffect, useState } from "react";
import axios from "axios";

type ICharacter = {
  name: string;
  id: string;
  image: string;
};

function CharactersList() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://rickandmortyapi.com/api/character");
      setCharacters(res.data.results);
    } catch (e) {
      //
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>The Rick and Morty App</h1>

      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-7">
          {characters.map((character) => (
            <div className="flex flex-col items-center" key={character.id}>
              <img src={character.image} className="w-24 h-24 " />
              <div>{character.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharactersList;
