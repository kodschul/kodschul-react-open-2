import { NextRequest, NextResponse } from "next/server";

const todos: { id: number; text: string; done: boolean }[] = [
  { id: 1, text: "Next.js API Routes kennenlernen", done: true },
  { id: 2, text: "BFF-Pattern verstehen", done: false },
];
let nextId = 3;

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.text || typeof body.text !== "string") {
    return NextResponse.json(
      { error: "Pflichtfeld 'text' fehlt oder ist kein String." },
      { status: 400 }
    );
  }

  const newTodo = { id: nextId++, text: body.text.trim(), done: false };
  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

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
  return new NextResponse(null, { status: 204 });
}
