// ============================================================
// TAG 2 – TRANSFER AUFGABE: CharactersPage testen
// ============================================================
//
// Ziel: Schreibt Tests für die bestehende CharactersPage.tsx
//       mit gemocktem axios.
//
// Datei: app/characters/CharactersPage.tsx
//
// ── AUFGABE 1: Ladeindikator testen ──────────────────────────
//
//   Mockt axios.get so, dass es ein nie auflösendes Promise zurückgibt.
//   Prüft: Ist ein Lade-Text oder -Spinner sichtbar?
//
// ── AUFGABE 2: Charakterliste testen ─────────────────────────
//
//   Mockt axios.get mit den fakeCharacters unten.
//   Prüft: Sind die Namen "Rick Sanchez" und "Morty Smith" sichtbar?
//
// ── AUFGABE 3: Paginierung testen ────────────────────────────
//
//   Klickt auf "Next page" und prüft, ob axios.get mit page=2 aufgerufen wurde.
//   Tipp: vi.mocked(axios.get).mock.calls prüfen
//
// ── AUFGABE 4 (Bonus): Fehlerfall testen ─────────────────────
//
//   Mockt axios.get so dass es einen Fehler wirft.
//   Prüft: Wird eine Fehlermeldung angezeigt?
//
// ============================================================

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// ← Die zu testende Komponente (importieren!)
// import CharactersPage from "../../../app/characters/CharactersPage";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Fake-Daten für die Tests
const fakeCharacters = [
  { id: 1, name: "Rick Sanchez", status: "Alive", image: "/rick.png" },
  { id: 2, name: "Morty Smith", status: "Alive", image: "/morty.png" },
];

// QueryClient für jeden Test frisch erstellen (kein Cache zwischen Tests)
function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("CharactersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TODO AUFGABE 1: Ladeindikator
  it.todo("zeigt einen Ladeindikator während die Daten geladen werden");

  // TODO AUFGABE 2: Charaktere anzeigen
  it.todo("zeigt Charakternamen nach erfolgreichem Laden");

  // TODO AUFGABE 3: Paginierung
  it.todo("ruft Seite 2 auf wenn 'Next page' geklickt wird");

  // TODO AUFGABE 4 (Bonus): Fehlerfall
  it.todo("zeigt eine Fehlermeldung wenn axios wirft");
});

// ============================================================
// Hilfreiche Muster als Erinnerung:
// ============================================================
//
// Ladeindikator (nie aufgelöst):
//   mockedAxios.get.mockReturnValue(new Promise(() => {}));
//
// Erfolgreiche Antwort:
//   mockedAxios.get.mockResolvedValue({ data: { results: fakeCharacters } });
//
// Fehler simulieren:
//   mockedAxios.get.mockRejectedValue(new Error("Netzwerkfehler"));
//
// Async warten:
//   expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
