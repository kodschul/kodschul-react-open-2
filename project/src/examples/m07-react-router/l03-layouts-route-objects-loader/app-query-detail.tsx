import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import CharactersPage from "../l02-route-params-detail-page/CharactersPage";
import CharacterDetailQueryPage from "./CharacterDetailQueryPage";
import Layout from "./Layout";

// Varianten (app-*) liegen eine Ebene tiefer als index.tsx: routerBasename() reicht hier nicht, daher 5 Pfadsegmente.
const basename = window.location.pathname.split("/").slice(0, 5).join("/");

// Vergleichsvariante: gleiches Layout, aber ohne loader. Erst erscheint die Seite, dann laden die Daten.
const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, element: <h1 className="text-3xl font-bold">Rick and Morty Explorer</h1> },
        {
          path: "characters",
          children: [
            { index: true, Component: CharactersPage },
            { path: ":id", Component: CharacterDetailQueryPage },
          ],
        },
      ],
    },
  ],
  { basename },
);
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
