// ============================================================
// SCHRITT 1 – Minimale GET-Route (Route Handler)
// ============================================================
//
// In Next.js App Router heißen API-Endpunkte "Route Handlers".
// Dateistruktur: app/api/[ordnername]/route.ts
//
// Regeln:
//   ✓ Die Datei MUSS exakt "route.ts" (oder .js) heißen
//   ✓ Jede HTTP-Methode ist eine benannte Export-Funktion
//   ✓ Rückgabe immer über NextResponse
//
// Diese Beispiel-Datei gehört nach: app/api/hello/route.ts
// Erreichbar unter: GET http://localhost:3000/api/hello
// ============================================================

import { NextResponse } from "next/server";

// "export async function GET" → Next.js erkennt das als GET-Handler
export async function GET() {
  // NextResponse.json() setzt automatisch:
  //   Content-Type: application/json
  //   HTTP Status: 200 (Standard)
  return NextResponse.json({
    message: "Hallo von der Next.js API!",
    timestamp: new Date().toISOString(),
  });
}

// ============================================================
// Tipp: Mehrere Methoden können im selben File stehen
// ============================================================
//
// export async function POST() { ... }
// export async function DELETE() { ... }
// export async function PUT() { ... }
//
// → Alle HTTP-Methoden nebeneinander – kein separater Router nötig!
