import axios from "axios";
import { Metadata } from "next";
import CharacterDetailPage from "./CharacterDetailPage";

const fetchCharacterContent = async (id) => {
  return (await axios.get(`https://rickandmortyapi.com/api/character/${id}`))
    ?.data;
};

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { id } = await params;
  const character = await fetchCharacterContent(id);
  return {
    title: character.name,
    description: character.status,
    openGraph: {
      images: {
        url: character.image,
      },
    },
  };
};

export default async function CharacterDetailServerPage({ params }) {
  const { id } = await params;
  const character = await fetchCharacterContent(id);

  return <CharacterDetailPage character={character} />;
}
