import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import DetailPage from "./DetailPage";
import FavoritesProvider from "./FavoritesProvider";
import GalleryPage from "./GalleryPage";
import Layout from "./Layout";

// retry: false zeigt Fehler (z. B. 404 bei leerem Filter) sofort statt nach mehreren Versuchen.
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter basename={routerBasename()}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<GalleryPage />} />
              <Route path="characters/:id" element={<DetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default App;
