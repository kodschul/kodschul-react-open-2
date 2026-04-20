// ============================================================
// SCHRITT 2 – error.tsx: Die Fehler-Grenze (Error Boundary)
// ============================================================
//
// Dateiname: error.tsx  (GENAU so – Next.js erkennt nur diesen Namen)
// Ort:       Im selben Ordner wie die page.tsx
//            z.B. app/characters/error.tsx
//
// PFLICHT: "use client" muss die erste Zeile sein!
//   → Error Boundaries können in React nur Client Components sein
//   → Ohne "use client" wirft Next.js einen Build-Fehler
//
// Props:
//   error  – das Error-Objekt
//             error.message  → menschenlesbarer Text
//             error.digest   → Server-seitiger Fehlercode (für Logs)
//   reset  – Funktion: ruft das Segment neu auf (neu rendern)
//
// Diese Datei gehört nach: app/characters/error.tsx
// ============================================================
"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Fehler protokollieren – in Produktion: Sentry, Datadog o.ä. verwenden
  useEffect(() => {
    console.error("Segment-Fehler:", error.message, error.digest);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Etwas ist schiefgelaufen
        </h2>
        <p className="text-gray-600 mb-2 text-sm">{error.message}</p>

        {/* digest ist ein anonymer Code der im Server-Log erscheint */}
        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-4">
            Fehlercode: {error.digest}
          </p>
        )}

        {/* reset() lädt das Segment neu – ohne Full-Page-Reload */}
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

// ============================================================
// Live-Demo: Fehler auslösen zum Testen
// ============================================================
//
// In der page.tsx einen Fehler einbauen:
//
//   export default async function CharactersPage() {
//     throw new Error("API antwortet nicht!"); // ← wirft Fehler
//     ...
//   }
//
// → error.tsx greift automatisch
// → Reset-Button ruft reset() auf → page.tsx wird neu versucht
