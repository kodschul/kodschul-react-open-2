type Card = {
  id: number;
  name: string;
  status: string;
};

const cards: Card[] = [
  { id: 1, name: "Rick Sanchez", status: "Alive" },
  { id: 2, name: "Morty Smith", status: "Alive" },
  { id: 3, name: "Summer Smith", status: "Alive" },
  { id: 4, name: "Beth Smith", status: "Alive" },
  { id: 5, name: "Jerry Smith", status: "Alive" },
  { id: 6, name: "Abadango Cluster Princess", status: "Alive" },
];

// Layout-Klassen: Eine Spalte auf kleinen Bildschirmen, zwei ab sm, drei ab md (Breite ≥ 48 rem)
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="mb-6 text-center text-3xl font-bold">Responsives Grid</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-lg bg-white p-4 shadow transition-transform duration-200 hover:scale-105"
          >
            <div className="font-semibold">{card.name}</div>
            <div className="text-sm text-gray-600">{card.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
