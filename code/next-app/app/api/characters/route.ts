import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page") ?? "1";

  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Fehler beim Laden der Charaktere." },
      { status: res.status }
    );
  }

  const data = await res.json();

  const simplified = data.results.map(
    (c: { id: number; name: string; status: string; image: string }) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      image: c.image,
    })
  );

  return NextResponse.json({
    page: Number(page),
    totalPages: data.info.pages,
    results: simplified,
  });
}
