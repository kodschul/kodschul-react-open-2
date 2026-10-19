import { useState } from "react";
import type { Character } from "../shared/character";

const App = () => {
  // TODO: Die Liste ist leer, bis die Antwort der API eintrifft.
  const [characters] = useState<Character[]>([]);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      <p className="mb-4">{characters.length} Charaktere geladen</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {/* TODO: Pro Charakter ein Bild und den Namen anzeigen (mit key). */}
      </div>
    </main>
  );
};

export default App;
