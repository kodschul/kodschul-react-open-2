import type { RouteObject } from "react-router";
import CharactersPage from "../l02-route-params-detail-page/CharactersPage";
import CharacterDetailLoaderPage from "./CharacterDetailLoaderPage";
import Layout from "./Layout";
import { characterLoader } from "./loader";

const HomePage = () => <h1 className="text-3xl font-bold">Rick and Morty Explorer</h1>;

// Routen als Daten: Das Layout ist die Elternroute, alle Seiten sind children.
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage }, // index = Standardseite der Elternroute (/)
      {
        path: "characters",
        children: [
          { index: true, Component: CharactersPage }, // /characters
          { path: ":id", loader: characterLoader, Component: CharacterDetailLoaderPage }, // /characters/1
        ],
      },
    ],
  },
];
