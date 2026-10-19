import { lazy, Suspense, type ComponentType } from "react";
import Playground from "../playground/App";

type Entry = {
  path: string;
  module: number;
  lab: string;
  title: string;
  Component: ComponentType;
};

// Jede Datei index.tsx oder app-*.tsx unter src/examples/<modul>/<lab>/ wird eine Seite.
const files = import.meta.glob<{ default: ComponentType }>([
  "../examples/*/*/index.tsx",
  "../examples/*/*/app-*.tsx",
]);

const humanize = (slug: string) => slug.replace(/^l\d+-/, "").replace(/-/g, " ");

const entries: Entry[] = Object.entries(files)
  .flatMap(([file, load]) => {
    const match = file.match(/examples\/(m(\d+)-[^/]+)\/([^/]+)\/(index|app-[^/]+)\.tsx$/);
    if (!match) return [];
    const [, moduleDir, moduleNumber, labDir, name] = match;
    const labNumber = labDir.match(/^l(\d+)-/)?.[1];
    const variant = name === "index" ? "" : `/${name}`;
    const base = labNumber ? `Lab ${Number(moduleNumber)}.${Number(labNumber)}` : "Transfer";
    return [
      {
        path: `/examples/${moduleDir}/${labDir}${variant}`,
        module: Number(moduleNumber),
        lab: `${moduleNumber}-${labDir}`,
        title: `${base}: ${humanize(labDir)}${variant ? ` (${name.replace("app-", "")})` : ""}`,
        Component: lazy(load),
      },
    ];
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const Overview = () => {
  const modules = [...new Set(entries.map((entry) => entry.module))];
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-3xl font-bold">React Einführung: Beispiele</h1>
      <p className="mb-6">
        Jede Beispiel-App ist die fertige Lösung eines Labs. Eigene Lösungen entstehen im{" "}
        <a className="text-blue-600 underline" href="/playground">
          Playground
        </a>
        .
      </p>
      {modules.map((module) => (
        <section key={module} className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Modul {module}</h2>
          <ul className="list-disc pl-6">
            {entries
              .filter((entry) => entry.module === module)
              .map((entry) => (
                <li key={entry.path}>
                  <a className="text-blue-600 underline" href={entry.path}>
                    {entry.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

const BackLink = () => (
  <a
    href="/"
    className="fixed right-3 bottom-3 z-50 rounded bg-black/70 px-3 py-1 text-sm text-white no-underline"
  >
    ← Übersicht
  </a>
);

const Launcher = () => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  if (path === "/") return <Overview />;
  if (path === "/playground" || path.startsWith("/playground/")) {
    return (
      <>
        <Playground />
        <BackLink />
      </>
    );
  }

  // Längster Pfad zuerst, damit app-*-Varianten vor dem index-Beispiel desselben Labs passen.
  const entry = [...entries]
    .sort((a, b) => b.path.length - a.path.length)
    .find((candidate) => path === candidate.path || path.startsWith(`${candidate.path}/`));
  if (!entry) {
    return (
      <main className="p-8">
        <p>Beispiel nicht gefunden.</p>
        <a className="text-blue-600 underline" href="/">
          Zur Übersicht
        </a>
      </main>
    );
  }

  const Example = entry.Component;
  return (
    <>
      <Suspense fallback={<p className="p-8">Lädt …</p>}>
        <Example />
      </Suspense>
      <BackLink />
    </>
  );
};

export default Launcher;
