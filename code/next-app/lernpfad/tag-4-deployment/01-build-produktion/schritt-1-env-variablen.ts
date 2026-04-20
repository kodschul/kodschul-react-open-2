// ============================================================
// SCHRITT 1 – Environment Variables in Next.js
// ============================================================
//
// Dateien:
//   .env.local          → Lokal, NICHT ins Git (in .gitignore!)
//   .env.development    → Nur im Entwicklungsmodus
//   .env.production     → Nur im Production-Build
//   .env                → Für alle Umgebungen (Git-safe defaults)
//
// WICHTIGE Regel: NEXT_PUBLIC_-Präfix
//   Ohne Präfix:          Nur serverseitig verfügbar
//   Mit NEXT_PUBLIC_:     Auch clientseitig (im Browser-Bundle!)
//
//   ✗ NEXT_PUBLIC_DATABASE_URL  → niemals! (sicherheitsrelevant)
//   ✓ NEXT_PUBLIC_API_URL       → URL für public API (ok)
//   ✓ DATABASE_URL              → nur Server (ok)
//   ✓ API_SECRET_KEY            → nur Server (ok)
//
// ── .env.local Beispiel ──────────────────────────────────────
//
// NEXT_PUBLIC_BASE_URL=http://localhost:3000
// NEXT_PUBLIC_API_URL=http://localhost:3000/api
// DATABASE_URL=postgresql://localhost:5432/mydb
// RICK_MORTY_API_KEY=secret-key-here
//
// ── Im Code nutzen ────────────────────────────────────────────

// Serverseitig (in API Routes, Server Components):
// const apiKey = process.env.RICK_MORTY_API_KEY; // ✓

// Clientseitig (in "use client" Components):
// const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✓ (mit Präfix)
// const secret = process.env.RICK_MORTY_API_KEY;  // ✗ undefined im Browser!

// ── Beispiel: API Route mit env variable ─────────────────────
import { NextResponse } from "next/server";

export async function GET() {
  // Serverseitige Variable – kommt nie ins Browser-Bundle
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

  return NextResponse.json({
    apiBase,
    // Nie sicherheitsrelevante Werte zurückgeben!
    // secret: process.env.SECRET  ← NIEMALS SO!
  });
}

// ============================================================
// SCHRITT 2 – next build Output verstehen
// ============================================================
//
// `next build` erzeugt einen optimierten Production-Build.
//
// Output-Typen (in der Build-Ausgabe):
//
//   ○ (Static)    → statisch generiert (kein Server nötig)
//   λ (Dynamic)   → server-side rendering
//   ƒ (Function)  → Edge oder Node.js Function
//
// Wichtige Metriken im Build-Output:
//   First Load JS  → wie viel JS lädt der erste Seitenaufruf?
//     < 100 kB    → gut
//     > 300 kB    → optimieren (lazy loading, dynamic imports)
//
// Build lokal testen:
//   npm run build    → erzeugt .next/
//   npm start        → startet Production-Server (nicht Dev!)
//
// ── Häufige Build-Fehler ──────────────────────────────────────
//
//   "Type error: ..."
//     → TypeScript-Fehler müssen vor dem Deployment behoben sein
//
//   "ReferenceError: window is not defined"
//     → window/document in Server Component genutzt
//     → Lösung: "use client" hinzufügen
//
//   "Error: NEXT_PUBLIC_* variable not available"
//     → Variable in Vercel/CI-Umgebung nicht gesetzt
//
// ============================================================
// SCHRITT 3 – Lokal wie Produktion testen
// ============================================================
//
// 1. .env.production anlegen (oder Vercel-Variablen lokal simulieren):
//    NEXT_PUBLIC_BASE_URL=https://meine-app.vercel.app
//
// 2. Build erstellen:
//    npm run build
//
// 3. Production-Server starten:
//    npm start
//
// 4. http://localhost:3000 öffnen
//    → Kein Hot Reload, kein Dev-Overlay → genau wie auf Vercel!
//
// 5. Netzwerk-Tab im Browser:
//    → JS-Bundles sind minifiziert
//    → Kein React DevTools overlay
//    → Kleinere Response-Größen
