import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersListRQ from "./CharactersList-rq";

function MainApp() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <CharactersListRQ />
    </QueryClientProvider>
  );
}

export default MainApp;
