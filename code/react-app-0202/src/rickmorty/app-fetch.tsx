import { useEffect, useState } from "react";

import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

type ICharacter = {
  id: number;
  name: string;
  status: string;
  image: string;
};

const App = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const fetchCharacters = async (pageToFetch = 1) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const response = await api.get(`/character?page=${pageToFetch}`);
      setCharacters(response?.data?.results);
    } catch (e) {
      console.log("FETCH ERROR occurred", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
    // const intervalId = setInterval(() => fetchCharacters(page), 10000);
    // return () => clearInterval(intervalId);
  }, [page]);

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

        <div>
          <div>Page: {page} </div>
          <button onClick={() => setPage(page - 1 || 1)}>Prev page</button>
          <button onClick={() => setPage(page + 1)}>Next page</button>
        </div>
      </div>

      {isLoading && <div>Loading....please wait 2s</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
        }}
      >
        {!isLoading &&
          characters.map((character) => (
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
