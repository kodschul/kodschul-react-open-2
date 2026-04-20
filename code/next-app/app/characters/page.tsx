import axios from "axios";
import CharactersPage from "./CharactersPage";
import { Metadata } from "next";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const fetchCharacters = async (pageToFetch = 1) =>
  (await api.get(`/character?page=${pageToFetch}`))?.data?.results;

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { id } = await params;
  return {
    title: "Characters Page",
    description: "",
  };
};

const CharactersServerPage = async () => {
  // pre-fetching

  const characters = await fetchCharacters();
  return <CharactersPage characters={characters} />;
};

export default CharactersServerPage;
