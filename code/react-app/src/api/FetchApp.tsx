import { useEffect, useState } from "react";
import { createFalse } from "typescript";

type ICharacter = {
  id: string;
  name: string;
  image: string;

  [key: string]: any;
};

const FetchApp = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const fetchCharacters = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then((response) => {
        setCharacters(response.results);
        console.log("It's done 1");
      })
      .catch(() => {
        console.log("Error");
      });

    console.log("It's done 2");
  };

  const fetchCharactersAsync = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results);
    } catch (e) {
      // handle error
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCharactersAsync();
  }, [page]);

  return (
    <div style={styles.main}>
      <h1>Characters</h1>

      {isLoading && <p>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {characters.length > 0 &&
          characters.map((character: ICharacter) => (
            <Character name={character.name} avatar={character.image} />
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
  name: string;
  avatar: string;
};

const Character = (props: CharacterProps) => {
  return (
    <div
      style={{
        width: 100,
        display: "flex",
        flexDirection: "column",
        background: "rgb(38, 76, 173)",
        marginTop: 10,
        justifyContent: "center",
      }}
    >
      <img src={props.avatar} width={100} />
      {props.name}
    </div>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default FetchApp;
