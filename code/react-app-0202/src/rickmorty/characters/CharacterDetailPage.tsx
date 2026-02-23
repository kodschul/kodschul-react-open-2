import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData, useParams } from "react-router";

type ICharacter = {
  id: number;
  name: string;
  status: string;
  image: string;
};

const CharacterDetailPage = () => {
  const { id } = useParams();
  const character = useLoaderData();

  // const { data: character, isLoading } = useQuery<ICharacter>({
  //   queryKey: ["character" + id],
  //   queryFn: async () => {
  //     await new Promise((r) => setTimeout(r, 3000));
  //     return (
  //       await axios.get("https://rickandmortyapi.com/api/character/" + id)
  //     )?.data;
  //   },

  //   // staleTime: 5000,
  //   // refetchOnWindowFocus: true,
  //   // refetchOnReconnect: true,
  // });

  // console.log({ prefetchedCharacter, character });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        color: "black",
      }}
    >
      {/* {isLoading && <div>Loading....</div>} */}

      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {character?.name} ID: {id}
        </div>

        <div style={{ marginLeft: 20 }}>
          <div>
            <img
              style={{ width: 200, height: 200 }}
              src={character?.image}
              width={200}
              height={200}
            />
          </div>

          <div>{character?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
