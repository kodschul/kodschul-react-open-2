import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import type { CharacterPage } from "../../../shared/character";
import FavoritesProvider from "./FavoritesProvider";
import GalleryPage from "./GalleryPage";
import { fetchCharacters } from "./api";

// Kein Netzwerk im Test: fetchCharacters wird durch eine Attrappe ersetzt (parseStatus bleibt echt).
vi.mock("./api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./api")>()),
  fetchCharacters: vi.fn(),
}));

const pageData = (page: number): CharacterPage => ({
  info: { count: 4, pages: 2, next: null, prev: null },
  results: [
    {
      id: page,
      name: page === 1 ? "Rick Sanchez" : "Morty Smith",
      status: "Alive",
      species: "Human",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
  ],
});

const renderGallery = () =>
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <FavoritesProvider>
        <MemoryRouter initialEntries={["/"]}>
          <GalleryPage />
        </MemoryRouter>
      </FavoritesProvider>
    </QueryClientProvider>,
  );

describe("GalleryPage", () => {
  beforeEach(() => {
    vi.mocked(fetchCharacters).mockImplementation(async (page) => pageData(page));
  });

  it("shows the first page and disables Zurück", async () => {
    renderGallery();
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Seite 1 von 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zurück" })).toBeDisabled();
  });

  it("loads page 2 and requests the status filter", async () => {
    renderGallery();
    await screen.findByText("Rick Sanchez");

    fireEvent.click(screen.getByRole("button", { name: "Weiter" }));
    expect(await screen.findByText("Morty Smith")).toBeInTheDocument();
    expect(fetchCharacters).toHaveBeenLastCalledWith(2, "");

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "dead" } });
    expect(await screen.findByText("Seite 1 von 2")).toBeInTheDocument();
    expect(fetchCharacters).toHaveBeenLastCalledWith(1, "dead");
  });
});
