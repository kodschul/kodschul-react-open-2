import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type ICharacter = {
  id: string;
  name: string;
  image: string;
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery(
    ["characters", { page }],
    () => axios.get(`https://rickandmortyapi.com/api/character?page=${page}`),
    {
      // // cacheTime: 3000,
      staleTime: 3000,
      keepPreviousData: true,
      // refetchInterval: 1000,
    }
  );
  const characters: ICharacter[] = data?.data?.results ?? [];

  return (
    <div style={styles.main}>
      <h1>Characters</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry an error occurred!</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {characters?.length > 0 &&
          characters.map((character: ICharacter) => (
            <Character
              id={character.id}
              name={character.name}
              avatar={character.image}
            />
          ))}
      </div>

      <div style={{ display: "flex" }}>
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <span style={{ margin: 5 }}> {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

type CharacterProps = {
  id: string;
  name: string;
  avatar: string;
};

const Character = (props: CharacterProps) => {
  return (
    <Link to={`/${props.id}`}>
      <div
        style={{
          width: 100,
          display: "flex",
          flexDirection: "column",
          background: "rgb(38, 76, 173)",
          marginTop: 10,
          justifyContent: "center",
          color: "white",
          textDecoration: "none",
        }}
      >
        <img src={props.avatar} width={100} />
        {props.name}
      </div>
    </Link>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default HomePage;
