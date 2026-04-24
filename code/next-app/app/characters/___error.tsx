"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Characters-Fehler:", error.message, error.digest);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Charaktere konnten nicht geladen werden
        </h2>
        <p className="text-gray-600 mb-4 text-sm">{error.message}</p>
        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-4">
            Code: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Nochmal versuchen
        </button>
      </div>
    </div>
  );
}
