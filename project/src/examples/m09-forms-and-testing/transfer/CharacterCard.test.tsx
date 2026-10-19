import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { Character } from "../../../shared/character";
import CharacterCard from "./CharacterCard";
import FavoritesProvider from "./FavoritesProvider";
import Layout from "./Layout";

const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

// Die Karte braucht Router (Link) und Favoriten-Context: beide werden im Test bereitgestellt.
const renderCard = () =>
  render(
    <MemoryRouter initialEntries={["/?page=2&status=alive"]}>
      <FavoritesProvider>
        <ul>
          <CharacterCard character={rick} />
        </ul>
      </FavoritesProvider>
    </MemoryRouter>,
  );

describe("CharacterCard", () => {
  it("shows name, status and a link to the detail page", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: "Rick Sanchez" })).toBeInTheDocument();
    expect(screen.getByText("Alive · Human")).toBeInTheDocument();
    // Die Query-Parameter bleiben im Link erhalten.
    expect(screen.getByRole("link", { name: /Rick Sanchez/ })).toHaveAttribute(
      "href",
      "/characters/1?page=2&status=alive",
    );
  });

  it("toggles the favorite state on click", () => {
    renderCard();
    const button = screen.getByRole("button", { name: "☆ Merken" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "★ Favorit" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "★ Favorit" }));
    expect(screen.getByRole("button", { name: "☆ Merken" })).toBeInTheDocument();
  });

  it("updates the favorites counter in the layout", () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Layout />
          <ul>
            <CharacterCard character={rick} />
          </ul>
        </FavoritesProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("Favoriten: 0")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "☆ Merken" }));
    expect(screen.getByText("Favoriten: 1")).toBeInTheDocument();
  });
});
