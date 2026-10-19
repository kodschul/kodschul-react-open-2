import { Link, Outlet } from "react-router";

// Das Layout bleibt beim Seitenwechsel stehen; <Outlet /> zeigt die jeweils passende Kindroute.
const Layout = () => (
  <div className="p-8">
    <header className="mb-6 flex gap-4 border-b pb-3">
      <Link className="text-blue-600 underline" to="/">
        Start
      </Link>
      <Link className="text-blue-600 underline" to="/characters">
        Charaktere
      </Link>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
