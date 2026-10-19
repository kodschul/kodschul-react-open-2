import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import { routes } from "./routes";

const router = createBrowserRouter(routes, { basename: routerBasename() });
const queryClient = new QueryClient();

// Der QueryClientProvider wird für die Galerie (useQuery) gebraucht; der Loader kommt ohne aus.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
