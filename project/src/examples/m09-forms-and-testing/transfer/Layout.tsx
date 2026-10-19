import { Link, Outlet } from "react-router";
import { useFavorites } from "./favorites-context";

// Gemeinsames Layout: Kopfzeile mit Favoriten-Zähler, darunter die jeweilige Seite.
const Layout = () => {
  const { favoriteIds } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between bg-green-700 px-6 py-3 text-white">
        <Link to="/" className="text-xl font-bold">
          Rick and Morty Explorer
        </Link>
        <span>Favoriten: {favoriteIds.length}</span>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
