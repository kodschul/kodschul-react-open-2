import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router";

type ICharacter = {
  id: string;
  name: string;
  image: string;
  status: string;
};

const fetchSingleCharacter = async (idToFetch, signal) => {
  const res = await axios.get(
    "https://rickandmortyapi.com/api/character/" + idToFetch,
    { signal }
  );
  return res.data;
};

function CharacterDetailPage() {
  const { id } = useParams();

  const { data: character, isLoading } = useQuery<ICharacter>({
    queryKey: ["character", id],
    queryFn: ({ signal }) => fetchSingleCharacter(id, signal),
  });

  return (
    <div>
      CharacterDetailPage
      <div>Character ID: {id}</div>
      {character?.status &&
        (character.status == "Alive" ? <div>ALIVE</div> : <div>NOT_ALIVE</div>)}
      <img src={character?.image} className="w-48 h-48 " />
      <div>{character?.name}</div>
    </div>
  );
}

export default CharacterDetailPage;
