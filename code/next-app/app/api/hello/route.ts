import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hallo von der Next.js API!",
    timestamp: new Date().toISOString(),
  });
}
