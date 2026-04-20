"use client";

import { useParams } from "next/navigation";

export default function CharacterPage() {
  const { id } = useParams();

  return <div>Page: {id}</div>;
}
