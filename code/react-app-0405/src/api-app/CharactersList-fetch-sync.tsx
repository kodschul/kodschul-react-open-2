import React, { useEffect, useState } from "react";

type ICharacter = {
  name: string;
  id: string;
  image: string;
};

function CharactersList() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((e) => {
        console.log("an error occurred!", e);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>The Rick and Morty App</h1>

      <div className="grid grid-cols-7">
        {characters.map((character) => (
          <div className="flex flex-col items-center" key={character.id}>
            <img src={character.image} className="w-24 h-24 " />
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersList;
