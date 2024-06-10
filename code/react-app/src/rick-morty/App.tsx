import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharactersPage from "./pages/Characters";
import CharacterPage from "./pages/CharacterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={CharactersPage} />
        <Route path="/:id" Component={CharacterPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
