import React, { useEffect, useState } from "react";

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
      const res = await fetch(
        "https://rickandmortyapi.com/api/character/-----"
      );

      console.log("THERE WAS NO ERROR");

      const data = await res.json();
      setCharacters(data.results);
    } catch (e) {
      //

      console.log("AN ERROR OCCURED");
    }
    setLoading(false);
    // next fetch
  };

  const fetchCharactersSync = () => {
    setLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((e) => {
        console.log("an error occurred!", e);
      })
      .finally(() => {
        fetch("https://rickandmortyapi.com/api/character")
          .then((response) => response.json())
          .then((data) => {
            setCharacters(data.results);
          })
          .catch((e) => {
            console.log("an error occurred!", e);
          })
          .finally(() => {
            fetch("https://rickandmortyapi.com/api/character")
              .then((response) => response.json())
              .then((data) => {
                setCharacters(data.results);
              })
              .catch((e) => {
                console.log("an error occurred!", e);
              });
          });
      });
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
