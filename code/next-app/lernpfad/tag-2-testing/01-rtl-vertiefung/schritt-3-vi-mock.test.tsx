// ============================================================
// SCHRITT 3 – Mocking: vi.mock() / jest.mock()
// ============================================================
//
// Warum mocking?
//   ✓ Tests bleiben schnell (kein echter HTTP-Request)
//   ✓ Tests sind deterministisch (keine API-Ausfälle)
//   ✓ Fehlerfälle leicht simulierbar (Netzwerkfehler, 404, etc.)
//   ✓ Kein Rate-Limiting durch externe APIs
//
// Was kann gemockt werden?
//   - axios-Instanzen
//   - einzelne Funktionen (vi.fn())
//   - ganze Module (vi.mock("modulname"))
//   - fetch (vi.spyOn(global, "fetch"))
//
// ============================================================

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ── Variante 1: axios-Instanz mocken ─────────────────────────
//
// vi.mock() muss im TOP-LEVEL stehen – nicht in beforeEach!
// Grund: Vitest/Jest hoist vi.mock()-Aufrufe automatisch an den Anfang.

vi.mock("axios");

import axios from "axios";
const mockedAxios = vi.mocked(axios, true);

// ── Variante 2: fetch mocken ──────────────────────────────────
//
// Wenn die Komponente global fetch nutzt (nicht axios):

// Beispiel in beforeEach:
// vi.spyOn(global, "fetch").mockResolvedValue({
//   ok: true,
//   json: async () => ({ results: fakeCharacters }),
// } as Response);

// ── Variante 3: eigenes Modul mocken ─────────────────────────
//
// Wenn ihr z.B. eine Datei "api/characters.ts" habt:
// vi.mock("../api/characters", () => ({
//   fetchCharacters: vi.fn().mockResolvedValue(fakeCharacters),
// }));

// ── Snapshot-Tests ───────────────────────────────────────────
//
// Snapshots speichern die gerenderte Ausgabe als Referenz.
//
// Wann sinnvoll:
//   ✓ Stabile UI-Komponenten (z.B. Buttons, Badges)
//   ✗ Schlecht für häufig ändernde Komponenten
//
// Beispiel:
describe("Snapshot Tests", () => {
  it("Counter-Komponente entspricht dem Snapshot", () => {
    // render() gibt container zurück
    const { container } = render(<DummyCounter count={3} />);

    // Beim ersten Ausführen: Snapshot wird angelegt
    // Beim zweiten Ausführen: Vergleich mit gespeichertem Snapshot
    expect(container).toMatchSnapshot();

    // Snapshot aktualisieren: vitest --update oder jest --updateSnapshot
  });
});

// Dummy-Komponente für das Snapshot-Beispiel
function DummyCounter({ count }: { count: number }) {
  return (
    <div className="p-4 rounded bg-white">
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
}

// ── Wichtigste Prinzipien ─────────────────────────────────────
//
//  ✓ Verhalten testen, nicht Implementierung
//      Schlecht: expect(setState).toHaveBeenCalledWith(...)
//      Gut:      expect(screen.getByText("3")).toBeInTheDocument()
//
//  ✓ Nutzer-Perspektive einnehmen
//      Was sieht der Nutzer? Was klickt er? Was erwartet er?
//
//  ✓ Queries in Prioritätsreihenfolge:
//      1. getByRole (semantisch, wie Screen Reader)
//      2. getByLabelText (für Formularfelder)
//      3. getByPlaceholderText
//      4. getByText
//      5. getByTestId (Letzter Ausweg)
