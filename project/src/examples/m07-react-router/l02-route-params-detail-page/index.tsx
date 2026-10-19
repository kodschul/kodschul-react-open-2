import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import CharacterDetailPage from "./CharacterDetailPage";
import CharactersPage from "./CharactersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={routerBasename()}>
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
          {/* :id ist ein Routen-Parameter und passt auf /characters/1, /characters/2, … */}
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="*" element={<p>Seite nicht gefunden</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
