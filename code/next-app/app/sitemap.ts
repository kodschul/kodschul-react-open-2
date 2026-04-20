import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  // Alle Charakter-IDs von der API laden (Seite 1 reicht für Demo)
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();

  const characterUrls: MetadataRoute.Sitemap = data.results.map(
    (c: { id: number }) => ({
      url: `${baseUrl}/characters/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/characters`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...characterUrls,
  ];
}
