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
  const [page, setPage] = useState(1);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://rickandmortyapi.com/api/character?page=" + page
      );
      setCharacters(res.data.results);
    } catch (e) {
      //
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     let timerId = setInterval(fetchCharacters, 10000);

  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   }, [page]);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  return (
    <div>
      <h1>The Rick and Morty App</h1>

      <div className="flex justify-between">
        <button
          className="bg-amber-300 p-10"
          onClick={() => setPage(page - 1 || 1)}
        >
          Prev Page
        </button>
        <div>Current Page: {page}</div>
        <button className="bg-amber-300 p-10" onClick={() => setPage(page + 1)}>
          Next Page
        </button>
      </div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-7">
          {characters.map((character) => (
            <div className="flex flex-col items-center" key={character.id}>
              {/* <img src={character.image} className="w-24 h-24 " /> */}
              <div>{character.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharactersList;
