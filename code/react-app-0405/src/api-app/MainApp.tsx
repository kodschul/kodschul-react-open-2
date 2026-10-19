import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersListRQ from "./CharactersListPage";

function MainApp() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <CharactersListRQ />
    </QueryClientProvider>
  );
}

export default MainApp;
