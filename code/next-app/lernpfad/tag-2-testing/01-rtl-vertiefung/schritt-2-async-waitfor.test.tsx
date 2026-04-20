// ============================================================
// SCHRITT 2 – Async Tests: waitFor & findBy*
// ============================================================
//
// Das Problem mit asynchronen Komponenten:
//   render() ist synchron → Daten aus API-Calls sind noch nicht da
//
// Lösung: Spezielle Async-Queries
//
//   findBy*   → Wie getBy*, aber wartet automatisch (bis Timeout)
//               Gibt ein Promise zurück → await verwenden!
//   waitFor() → Führt Assertion solange aus bis sie erfüllt ist
//               (oder Timeout abläuft, Standard: 1000ms)
//
// Merkhilfe:
//   get  → sofort, Fehler wenn nicht da
//   find → wartet, Fehler wenn Timeout
//   query → sofort, null wenn nicht da (kein Fehler)
//
// ============================================================

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

// Zu testende Komponente
import { CharactersPage } from "../demo/CharactersPage";

// vi.mock ersetzt das Modul mit einer Mock-Version
// In Jest: jest.mock()  |  In Vitest: vi.mock()
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Fake-Daten – so sieht die Antwort der Rick & Morty API aus
const fakeCharacters = [
  { id: 1, name: "Rick Sanchez", status: "Alive", image: "/rick.png" },
  { id: 2, name: "Morty Smith", status: "Alive", image: "/morty.png" },
];

describe("CharactersPage", () => {
  beforeEach(() => {
    // Vor jedem Test: Mock zurücksetzen
    vi.clearAllMocks();
  });

  it("zeigt einen Ladeindikator während die Daten geladen werden", () => {
    // axios.get gibt ein nie auflösendes Promise zurück → Lade-Zustand bleibt
    mockedAxios.get.mockReturnValue(new Promise(() => {}));

    render(<CharactersPage />);

    // Sofort sichtbar: Lade-Indikator
    expect(screen.getByText(/laden/i)).toBeInTheDocument();
  });

  it("zeigt Charakternamen nach erfolgreichem Laden", async () => {
    // Mock: axios.get löst sofort mit Fake-Daten auf
    mockedAxios.get.mockResolvedValue({
      data: { results: fakeCharacters },
    });

    render(<CharactersPage />);

    // findByText wartet bis "Rick Sanchez" im DOM erscheint
    // (bis zu 1000ms Standard-Timeout)
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("zeigt eine Fehlermeldung wenn der API-Aufruf scheitert", async () => {
    // Mock: axios.get wirft einen Fehler
    mockedAxios.get.mockRejectedValue(new Error("Netzwerkfehler"));

    render(<CharactersPage />);

    // waitFor führt Assertion wiederholt aus bis sie passt oder Timeout
    await waitFor(() => {
      expect(screen.getByText(/fehler/i)).toBeInTheDocument();
    });
  });
});

// ============================================================
// Zusammenfassung: Wann was nutzen?
// ============================================================
//
//   screen.getByText(...)          → Element muss sofort da sein
//   await screen.findByText(...)   → Element kommt nach async Operation
//   await waitFor(() => expect...) → Assertion kommt nach Zustandsänderung
//   screen.queryByText(...)        → Prüfen ob Element NICHT vorhanden ist
