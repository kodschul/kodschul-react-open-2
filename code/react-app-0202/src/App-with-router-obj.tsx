import { createBrowserRouter, Link, RouterProvider } from "react-router";

import characterRoutes from "./rickmorty/characters/routes";

import ThemeApp from "./theme/with-global-state/theme-app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Link to="/characters">Set to characters page </Link>
      <Link to="/theme">Set to theme page </Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "characters",
    children: characterRoutes,
  },
  {
    path: "theme",
    Component: ThemeApp,
  },

  {
    path: "",
    Component: HomePage,
  },
]);

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <a href="/characters">Go to characters page</a>
        <a href="/theme">Go to theme page</a>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
