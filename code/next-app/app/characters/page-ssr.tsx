import axios from "axios";
import CharactersPage from "./CharactersPage";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const fetchCharacters = async (pageToFetch = 1) =>
  (await api.get(`/character?page=${pageToFetch}`))?.data?.results;

const CharactersServerPage = async () => {
  // pre-fetching

  const characters = await fetchCharacters();

  return <CharactersPage characters={characters} />;
};

export default CharactersServerPage;
