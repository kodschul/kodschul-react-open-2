// ============================================================
// SCHRITT 1 – i18n: Konzept & next-intl einrichten
// ============================================================
//
// i18n = Internationalization (18 Buchstaben zwischen i und n)
//
// Strategien im Vergleich:
//   next-intl   → für Next.js optimiert, Server + Client Components
//   i18next     → verbreitet, aber mehr Konfigurationsaufwand
//   → Wir nehmen next-intl
//
// Routing-Strategien:
//   Prefix-basiert:  /de/about    /en/about   ← am häufigsten
//   Domain-basiert:  de.shop.com  en.shop.com ← für große Projekte
//
// ── Installation ─────────────────────────────────────────────
// npm install next-intl
//
// ── Dateistruktur nach Einrichtung ───────────────────────────
//
//   next-app/
//   ├── messages/
//   │   ├── de.json          ← Deutsche Übersetzungen
//   │   └── en.json          ← Englische Übersetzungen
//   ├── middleware.ts         ← Sprache aus URL erkennen
//   └── app/
//       └── [locale]/        ← Neuer dynamischer Segment-Wrapper
//           ├── layout.tsx
//           └── page.tsx
//
// ============================================================

// ── middleware.ts ─────────────────────────────────────────────
// Diese Datei gehört ins Root-Verzeichnis (neben next.config.ts).
// Sie leitet Nutzer automatisch zur richtigen Sprach-URL weiter.

import createMiddleware from "next-intl/middleware";
import { routing } from "./routing"; // Schritt 2

export default createMiddleware(routing);

export const config = {
  // Greift für alle Pfade außer API-Routen, _next, public-Dateien
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
