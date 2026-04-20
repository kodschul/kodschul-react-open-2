// ============================================================
// SCHRITT 1 – Statische Metadata
// ============================================================
//
// Metadata in Next.js App Router ist deklarativ:
//   → Kein react-helmet, kein manuelles <head>-Manipulieren
//   → Einfach "metadata" exportieren – Next.js erledigt den Rest
//
// Wo kann metadata exportiert werden?
//   ✓ layout.tsx  → gilt für alle Seiten im Segment
//   ✓ page.tsx    → gilt nur für diese eine Seite
//   (Bei Konflikten: page.tsx überschreibt layout.tsx)
//
// Diese Datei zeigt: app/about/layout.tsx mit statischer Metadata
// ============================================================

import type { Metadata } from "next";

// Statisches Metadata-Objekt – zur Build-Zeit bekannt, kein fetch nötig
export const metadata: Metadata = {
  // <title>Über uns | Rick & Morty App</title>
  title: "Über uns | Rick & Morty App",

  // <meta name="description" content="...">
  description: "Alles über das Rick & Morty Universum und dieses Projekt.",

  // Open Graph: Wie die Seite aussieht wenn sie geteilt wird
  openGraph: {
    title: "Über uns | Rick & Morty App",
    description: "Alles über das Rick & Morty Universum.",
    // Vorschaubild für Social-Media-Previews
    images: [{ url: "/og-about.png", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// ============================================================
// Tipp: Metadata-Vererbung mit "template"
// ============================================================
//
// Im Root-Layout kann ein Template definiert werden:
//
//   export const metadata: Metadata = {
//     title: {
//       template: "%s | Rick & Morty App",
//       default: "Rick & Morty App",
//     },
//   };
//
// Dann reicht in child pages:
//   export const metadata: Metadata = { title: "Über uns" };
//   → wird zu: "Über uns | Rick & Morty App"
