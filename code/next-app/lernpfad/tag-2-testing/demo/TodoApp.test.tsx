// ============================================================
// TAG 2 – DEMO: Vollständiger Test der TodoApp
// ============================================================
//
// Dieser Test zeigt alle RTL-Konzepte aus den Schritten zusammen:
//   - userEvent (Schritt 1)
//   - waitFor / findBy (Schritt 2)
//   - Snapshot (Schritt 3)
// ============================================================

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "../../../app/testing/TodoContainer";

describe("TodoApp – vollständiger Durchlauf", () => {
  it("kompletter User-Flow: hinzufügen, abhaken, löschen", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // 1. Leerer Zustand
    expect(screen.getByText(/keine todos/i)).toBeInTheDocument();

    // 2. Ersten Todo hinzufügen
    await user.type(screen.getByPlaceholderText(/neuer todo/i), "RTL lernen");
    await user.click(screen.getByRole("button", { name: /hinzufügen/i }));
    expect(screen.getByText("RTL lernen")).toBeInTheDocument();

    // 3. Zweiten Todo hinzufügen
    await user.type(
      screen.getByPlaceholderText(/neuer todo/i),
      "Cypress installieren"
    );
    await user.click(screen.getByRole("button", { name: /hinzufügen/i }));
    expect(screen.getByText("Cypress installieren")).toBeInTheDocument();

    // 4. Ersten Todo als erledigt markieren
    await user.click(screen.getByText("RTL lernen"));
    expect(screen.getByText("RTL lernen")).toHaveClass("line-through");

    // 5. Zweiten Todo löschen
    const deleteButtons = screen.getAllByRole("button", { name: /löschen/i });
    await user.click(deleteButtons[1]);
    expect(screen.queryByText("Cypress installieren")).not.toBeInTheDocument();

    // 6. Erster Todo noch vorhanden
    expect(screen.getByText("RTL lernen")).toBeInTheDocument();
  });

  it("zeigt Fehlermeldung bei leerem Submit", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // Direkt auf "Hinzufügen" ohne Eingabe klicken
    await user.click(screen.getByRole("button", { name: /hinzufügen/i }));

    // Fehlermeldung erscheint
    expect(screen.getByText(/pflichtfeld/i)).toBeInTheDocument();

    // Kein Todo wurde hinzugefügt
    expect(screen.getByText(/keine todos/i)).toBeInTheDocument();
  });
});
