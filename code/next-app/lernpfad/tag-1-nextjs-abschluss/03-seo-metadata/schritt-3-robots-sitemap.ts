// ============================================================
// SCHRITT 3 – robots.ts & sitemap.ts: Automatisch generierte Dateien
// ============================================================
//
// Next.js kann robots.txt und sitemap.xml automatisch erzeugen.
//
// Dateistruktur:
//   app/robots.ts   → erzeugt /robots.txt
//   app/sitemap.ts  → erzeugt /sitemap.xml
//
// Vorteile gegenüber statischen Dateien:
//   ✓ Dynamisch: z.B. alle Produkt-IDs aus DB als URLs
//   ✓ Kein manuelles Pflegen
//   ✓ TypeScript-Typen helfen beim Aufbau
//
// ============================================================
// robots.ts – Beispiel
// Gehört nach: app/robots.ts
// ============================================================

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Crawler dürfen diese Pfade nicht indexieren
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    // Sitemap-URL für Suchmaschinen
    sitemap: "https://meine-app.vercel.app/sitemap.xml",
  };
}

// ============================================================
// sitemap.ts – Beispiel
// Gehört nach: app/sitemap.ts
// ============================================================
//
// Hinweis: In einer Datei kann nur ein default export sein.
// Diese Kommentarversion zeigt das sitemap.ts Beispiel:
//
// import { MetadataRoute } from "next";
//
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   // Alle Charakter-IDs von der API laden
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const data = await res.json();
//
//   // Dynamische Charakter-URLs
//   const characterUrls: MetadataRoute.Sitemap = data.results.map(
//     (c: { id: number }) => ({
//       url: `https://meine-app.vercel.app/characters/${c.id}`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     })
//   );
//
//   return [
//     // Statische Seiten zuerst
//     {
//       url: "https://meine-app.vercel.app",
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1,
//     },
//     {
//       url: "https://meine-app.vercel.app/about",
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },
//     // Dann alle dynamischen Seiten
//     ...characterUrls,
//   ];
// }
