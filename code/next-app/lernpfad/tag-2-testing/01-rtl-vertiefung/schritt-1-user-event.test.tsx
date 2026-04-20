// ============================================================
// SCHRITT 1 – userEvent statt fireEvent
// ============================================================
//
// Warum userEvent?
//
//   fireEvent.click(button)  ← simuliert NUR das click-Event
//   userEvent.click(button)  ← simuliert echtes Browserverhalten:
//                               Mausbewegung → Hover → Focus → Click
//
// userEvent ist realistischer und findet mehr Bugs.
// Faustregel: userEvent für alle User-Interaktionen verwenden.
//
// Einrichtung:
//   npm install -D @testing-library/user-event
//   userEvent.setup() muss VOR dem Render aufgerufen werden
//
// Diese Datei zeigt einen vollständigen Test für eine TodoApp.
// ============================================================

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Zu testende Komponente (wird in der Demo-Datei definiert)
import { TodoApp } from "../demo/TodoApp";

describe("TodoApp", () => {
  // userEvent.setup() einmal pro Testblock – nicht pro Test
  // (oder im beforeEach – beide Wege sind korrekt)

  it("zeigt einen leeren Zustand ohne Todos an", () => {
    render(<TodoApp />);

    // getByText → sucht exakt diesen Text, wirft Fehler wenn nicht gefunden
    expect(screen.getByText(/keine todos/i)).toBeInTheDocument();
  });

  it("fügt einen neuen Todo hinzu wenn das Formular abgeschickt wird", async () => {
    // ── Setup ──────────────────────────────────────────────────
    // userEvent.setup() gibt ein user-Objekt zurück
    const user = userEvent.setup();

    render(<TodoApp />);

    // ── Act ────────────────────────────────────────────────────
    // Textfeld finden, Text eintippen, Formular abschicken
    const input = screen.getByPlaceholderText(/neuer todo/i);
    await user.type(input, "Next.js lernen");

    // getByRole ist besser als getByText – semantisch korrekt
    const button = screen.getByRole("button", { name: /hinzufügen/i });
    await user.click(button);

    // ── Assert ─────────────────────────────────────────────────
    // Neuer Todo sollte sichtbar sein
    expect(screen.getByText("Next.js lernen")).toBeInTheDocument();

    // Textfeld sollte geleert worden sein
    expect(input).toHaveValue("");
  });

  it("markiert einen Todo als erledigt per Klick", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // Erst hinzufügen...
    await user.type(screen.getByPlaceholderText(/neuer todo/i), "Testen üben");
    await user.click(screen.getByRole("button", { name: /hinzufügen/i }));

    // ...dann anklicken
    const todoItem = screen.getByText("Testen üben");
    await user.click(todoItem);

    // CSS-Klasse oder Attribut prüfen – Implementierungsdetails vermeiden!
    // Besser: aria-attribute oder sichtbarer Zustand testen
    expect(todoItem).toHaveClass("line-through");
  });

  it("löscht einen Todo", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(screen.getByPlaceholderText(/neuer todo/i), "Zu löschen");
    await user.click(screen.getByRole("button", { name: /hinzufügen/i }));

    // Löschen-Button neben dem Todo finden
    const deleteButton = screen.getByRole("button", { name: /löschen/i });
    await user.click(deleteButton);

    // queryByText gibt null zurück wenn nicht gefunden (kein Fehler)
    expect(screen.queryByText("Zu löschen")).not.toBeInTheDocument();
  });
});
