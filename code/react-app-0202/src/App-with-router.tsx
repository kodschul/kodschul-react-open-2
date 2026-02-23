import React from "react";
import { BrowserRouter, Link, Route } from "react-router";
import { Routes } from "react-router";

import CharactersPage from "./rickmorty/characters/CharactersPage";
import CharacterDetailPage from "./rickmorty/characters/CharacterDetailPage";

import ThemeApp from "./theme/with-global-state/theme-app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormApp from "./forms/form-app-formik";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/characters">Set to characters page </Link>
            <Link to="/theme">Set to theme page </Link>
            <a href="/characters">Go to characters page</a>
            <a href="/theme">Go to theme page</a>
          </div>

          <Routes>
            <Route path="/characters" Component={CharactersPage} />
            <Route path="/characters/:id" Component={CharacterDetailPage} />
            <Route path="/theme" Component={ThemeApp} />
            <Route path="/form" Component={FormApp} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
