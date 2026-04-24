import { NextRequest, NextResponse } from "next/server";
import todoDb from "./todos";

export async function GET() {
  return NextResponse.json(todoDb.todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.text || typeof body.text !== "string") {
    return NextResponse.json(
      { error: "Pflichtfeld 'text' fehlt oder ist kein String." },
      { status: 400 }
    );
  }

  const newTodo = { id: todoDb.nextId++, text: body.text.trim(), done: false };
  todoDb.todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const id = Number(searchParams.get("id"));

  const index = todoDb.todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Todo nicht gefunden." },
      { status: 404 }
    );
  }

  todoDb.todos.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}
