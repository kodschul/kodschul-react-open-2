import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type ICharacter = {
  name: string;
  id: string;
  image: string;
};

const fetchCharacters = async (pageToFetch, signal) => {
  const res = await axios.get(
    "https://rickandmortyapi.com/api/character?page=" + pageToFetch,
    { signal }
  );
  return res.data.results;
};

function CharactersList() {
  const [page, setPage] = useState(1);

  const { data: characters, isLoading } = useQuery<ICharacter[]>({
    queryKey: ["characters", page],
    queryFn: ({ signal }) => fetchCharacters(page, signal),
  });

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
