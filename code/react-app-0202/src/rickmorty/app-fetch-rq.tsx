import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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

const fetchCharacters = async (pageToFetch = 1) =>
  (await api.get(`/character?page=${pageToFetch}`))?.data?.results;

const App = () => {
  const [page, setPage] = useState(1);
  const { data: characters, isLoading } = useQuery<ICharacter[]>({
    queryKey: ["characters" + page],
    queryFn: () => fetchCharacters(page),

    // staleTime: 5000,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
  });

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
        {characters &&
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

const queryClient = new QueryClient();

const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppContainer;
