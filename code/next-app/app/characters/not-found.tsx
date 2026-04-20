import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <p className="text-8xl font-black text-gray-200 mb-2">404</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Charakter nicht gefunden
        </h2>
        <p className="text-gray-500 mb-6">
          Dieser Charakter existiert nicht oder wurde aus dem Universum entfernt.
        </p>
        <Link
          href="/characters"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}
