// ============================================================
// SCHRITT 2 – POST-Route mit Request-Body lesen
// ============================================================
//
// Für POST, PUT, PATCH: Body per request.json() lesen.
// WICHTIG: request.json() ist async → immer await verwenden!
//
// Parameter:
//   request: NextRequest  ← enthält URL, Headers, Body
//
// Diese Datei gehört nach: app/api/todos/route.ts
// Erreichbar unter:
//   GET  /api/todos        → alle Todos zurückgeben
//   POST /api/todos        → neuen Todo anlegen
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// In-Memory-Liste – reicht für den Kurs.
// In echten Projekten: Datenbank (Prisma, Drizzle, etc.)
const todos: { id: number; text: string; done: boolean }[] = [];
let nextId = 1;

// GET: alle Todos zurückgeben
export async function GET() {
  return NextResponse.json(todos);
}

// POST: neuen Todo aus dem Request-Body anlegen
export async function POST(request: NextRequest) {
  // Body als JSON lesen – gibt ein Promise zurück
  const body = await request.json();

  // ── Validierung ───────────────────────────────────────────
  // An System-Grenzen validieren: Kommt das Feld an? Stimmt der Typ?
  if (!body.text || typeof body.text !== "string") {
    return NextResponse.json(
      { error: "Pflichtfeld 'text' fehlt oder ist kein String." },
      { status: 400 } // 400 Bad Request
    );
  }

  const newTodo = { id: nextId++, text: body.text.trim(), done: false };
  todos.push(newTodo);

  // 201 Created = Resource erfolgreich angelegt
  return NextResponse.json(newTodo, { status: 201 });
}

// DELETE: Todo anhand ID entfernen
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = Number(searchParams.get("id"));

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Todo nicht gefunden." },
      { status: 404 }
    );
  }

  todos.splice(index, 1);
  // 204 No Content = gelöscht, kein Body nötig
  return new NextResponse(null, { status: 204 });
}
