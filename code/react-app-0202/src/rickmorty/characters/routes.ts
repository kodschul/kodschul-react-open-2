import type { RouteObject } from "react-router";
import CharacterDetailPage from "./CharacterDetailPage";
import CharactersPage from "./CharactersPage";
import axios from "axios";

const characterRoutes: RouteObject[] = [
  {
    path: ":id",

    loader: async ({ params }) => {
      await new Promise((r) => setTimeout(r, 3000));
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/" + params.id
      );
      return response?.data;
    },

    Component: CharacterDetailPage,
  },
  { index: true, Component: CharactersPage },
];

export default characterRoutes;
