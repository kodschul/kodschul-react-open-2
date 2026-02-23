import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

type ICharacter = {
  id: number;
  name: string;
  status: string;
  image: string;
};

const fetchCharacters = async (pageToFetch = 1) =>
  (await api.get(`/character?page=${pageToFetch}`))?.data?.results;

const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const { data: characters, isLoading } = useQuery<ICharacter[]>({
    queryKey: ["characters" + page],
    queryFn: () => fetchCharacters(page),

    // staleTime: 5000,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100 text-black overflow-auto">
      <div className="pt-[5%] text-center">
        <div className="text-3xl font-bold mb-6">The Ricky And Morty API</div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="font-semibold">Page: {page}</span>
          <button
            onClick={() => setPage(page - 1 || 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            disabled={page === 1}
          >
            Prev page
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next page
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-lg font-medium text-gray-600">
          Loading....please wait 2s
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-6">
        {characters &&
          characters.map((character) => (
            <Link
              key={character.id}
              to={`/characters/${character.id}`}
              className="group"
            >
              <div className="flex flex-col items-center hover:scale-105 transition-transform duration-200">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    className="w-50 h-50 object-cover group-hover:opacity-90 transition-opacity"
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                  />
                </div>

                <div className="mt-2 text-center font-medium group-hover:text-blue-600 transition-colors">
                  {character.name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CharactersPage;
