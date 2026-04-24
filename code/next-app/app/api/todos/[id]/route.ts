import { NextRequest, NextResponse } from "next/server";
import todosDb from "../todos";

export async function GET(request: NextRequest, { params }) {
  const { id } = await params;
  const todo = todosDb.todos.find((el) => el.id == id);

  if (!todo) {
    return NextResponse.json({
      error: "todo not found",
      status: 404,
    });
  }

  //   console.log(request);
  //   console.log();
  return NextResponse.json(todo);
}

// TOGGLE -> set done TRUE/FALSE
export async function POST(request: NextRequest, { params }) {
  const { id } = await params;
  const index = todosDb.todos.findIndex((el) => el.id == id);

  if (index < 0) {
    return NextResponse.json({
      error: "todo not found",
      status: 404,
    });
  }

  todosDb.todos.splice(index, 1);
  return NextResponse.json({ status: 204, message: "deleted!" });
}

export async function DELETE(request: NextRequest, { params }) {
  const { id } = await params;
  const index = todosDb.todos.findIndex((el) => el.id == id);

  if (index < 0) {
    return NextResponse.json({
      error: "todo not found",
      status: 404,
    });
  }

  todosDb.todos.splice(index, 1);
  return NextResponse.json({ status: 204, message: "deleted!" });
}
