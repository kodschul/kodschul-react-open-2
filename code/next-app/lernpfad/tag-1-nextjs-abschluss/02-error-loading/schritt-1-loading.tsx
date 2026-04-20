// ============================================================
// SCHRITT 1 – loading.tsx: Automatische Lade-Grenze (Suspense Boundary)
// ============================================================
//
// Dateiname: loading.tsx  (GENAU so – Next.js erkennt nur diesen Namen)
// Ort:       Im selben Ordner wie die page.tsx, die geschützt werden soll
//            z.B. app/characters/loading.tsx
//
// Was passiert intern?
//   Next.js wickelt die page.tsx automatisch in eine <Suspense>-Boundary.
//   Während die async Server Component lädt (z.B. fetch-Aufruf),
//   wird loading.tsx angezeigt – ohne eine Zeile Änderung an page.tsx!
//
// Hierarchie:
//   app/loading.tsx           → greift für die Root-Seite
//   app/characters/loading.tsx → greift nur für /characters/*
//
// Diese Datei gehört nach: app/characters/loading.tsx
// ============================================================

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* CSS-Spinner – kein extra Paket nötig */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          Charaktere werden geladen…
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Daten werden von der API abgerufen
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Profi-Tipp: Skeleton statt Spinner
// ============================================================
//
// In echten Projekten werden oft "Skeleton"-Platzhalter gebaut,
// die die Form der geladenen Inhalte nachahmen:
//
// export default function Loading() {
//   return (
//     <div className="grid grid-cols-4 gap-4 p-8">
//       {Array.from({ length: 8 }).map((_, i) => (
//         <div key={i} className="animate-pulse">
//           <div className="bg-gray-300 rounded-lg h-48 mb-2" />
//           <div className="bg-gray-300 rounded h-4 w-3/4" />
//         </div>
//       ))}
//     </div>
//   );
// }
