import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { routerBasename } from "../launcher/router-basename";

// Starter für die Transferübung „Rick and Morty Explorer“: Provider und Routen stehen,
// die Seiten sind Platzhalter. Aufgabe: Galerie, Detailseite, Favoriten-Context und Test ergänzen.

const queryClient = new QueryClient();

const GalleryPage = () => {
  // TODO: Galerie mit Pagination und Statusfilter
  return <p>Galerie folgt.</p>;
};

const DetailPage = () => {
  // TODO: Detailseite für /characters/:id
  return <p>Detailseite folgt.</p>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={routerBasename()}>
        <header className="flex items-center justify-between bg-green-700 px-6 py-3 text-white">
          <Link to="/" className="text-xl font-bold">
            Rick and Morty Explorer
          </Link>
        </header>
        <main className="mx-auto max-w-5xl p-6">
          <Routes>
            <Route index element={<GalleryPage />} />
            <Route path="characters/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
