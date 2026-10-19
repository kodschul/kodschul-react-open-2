import type { ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import CharacterCard from "./CharacterCard";
import { fetchCharacters, parseStatus, type StatusFilter } from "./api";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "", label: "Alle" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const GalleryPage = () => {
  // Seite und Filter liegen in der URL (?page=2&status=alive): Zurück-Button und Links funktionieren.
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = parseStatus(searchParams.get("status"));

  const { data, isPending, error, isPlaceholderData } = useQuery({
    queryKey: ["characters", page, status],
    queryFn: () => fetchCharacters(page, status),
    // Während die nächste Seite lädt, bleibt die vorige sichtbar.
    placeholderData: keepPreviousData,
  });

  const showPage = (nextPage: number, nextStatus: StatusFilter) =>
    setSearchParams(nextStatus ? { page: String(nextPage), status: nextStatus } : { page: String(nextPage) });

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    showPage(1, parseStatus(e.target.value));

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">
          Status{" "}
          <select className="rounded border px-2 py-1" value={status} onChange={handleStatusChange}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Keine Charaktere gefunden oder API nicht erreichbar.</p>}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="rounded border px-3 py-1 disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => showPage(page - 1, status)}
            >
              Zurück
            </button>
            <span>
              Seite {page} von {data.info.pages}
            </span>
            <button
              className="rounded border px-3 py-1 disabled:opacity-40"
              disabled={page >= data.info.pages || isPlaceholderData}
              onClick={() => showPage(page + 1, status)}
            >
              Weiter
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default GalleryPage;
