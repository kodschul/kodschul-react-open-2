import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} Component={HomePage} />
          <Route path={"/:id"} Component={CharacterPage} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
