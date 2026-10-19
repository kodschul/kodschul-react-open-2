import { BrowserRouter, Routes, Route, Link } from "react-router";

import CharactersListPage from "./CharactersListPage";
import CounterApp from "../state-app/CounterApp";
import TodoApp from "../todo-app/TodoApp";
import UseEffectApp from "../use-effect/UseEffectApp";
import ComponentApp from "../component-app/ComponentApp";
import HomePage from "./HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterDetailPage from "./CharacterDetailPage";

const client = new QueryClient();

const AppContainer = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <div>
          <Link to="/characters">Go to Characters</Link>
          <Link to="/todos">Go to Todos</Link>
        </div>

        <Routes>
          <Route path={"/characters"} Component={CharactersListPage} />
          <Route path={"/characters/:id"} Component={CharacterDetailPage} />

          <Route path={"/counter"} Component={CounterApp} />
          <Route path={"/todos"} Component={TodoApp} />
          <Route path={"/use-effects"} Component={UseEffectApp} />
          <Route path={"/component"} Component={ComponentApp} />
          <Route index Component={HomePage} />
          <Route path="*" Component={HomePage} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppContainer;
