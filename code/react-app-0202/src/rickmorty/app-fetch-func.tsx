import { useEffect, useState } from "react";

type ICharacter = {
  id: number;
  name: string;
  status: string;
  image: string;
};

const App = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
      })

      .catch(() => {
        console.log("FETCH ERROR occurred");
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

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
      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          The Ricky And Morty API
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
        }}
      >
        {characters.map((character) => (
          <div style={{ marginLeft: 20 }}>
            <div>
              <img
                style={{ width: 200, height: 200 }}
                src={character.image}
                width={200}
                height={200}
              />
            </div>

            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
