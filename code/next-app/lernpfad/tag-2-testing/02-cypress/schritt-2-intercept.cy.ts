// ============================================================
// SCHRITT 2 – cy.intercept(): API-Aufrufe abfangen
// ============================================================
//
// cy.intercept() fängt HTTP-Anfragen ab und ersetzt sie mit
// Fixture-Daten. Das macht Tests:
//   ✓ Schnell (kein echter HTTP-Request)
//   ✓ Deterministisch (immer dieselben Daten)
//   ✓ Unabhängig von der externen API
//
// Fixtures:
//   JSON-Dateien in cypress/fixtures/
//   cy.fixture("dateiname") lädt sie
//
// ============================================================

describe("Characters mit API-Mock", () => {
  beforeEach(() => {
    // ── Intercept einrichten ──────────────────────────────────
    // Greift für ALLE Requests auf diese URL (GET ist Standard)
    cy.intercept(
      "GET",
      // Wildcard: passt auf alle Charakter-Seiten
      "https://rickandmortyapi.com/api/character*",
      // Fixture: Daten aus cypress/fixtures/characters.json
      { fixture: "characters.json" }
    ).as("getCharacters"); // .as() gibt dem Intercept einen Alias
  });

  it("zeigt Fake-Daten aus der Fixture an", () => {
    cy.visit("http://localhost:3000/characters");

    // Warten bis der abgefangene Request abgeschlossen ist
    cy.wait("@getCharacters");

    // Fake-Daten aus characters.json sollten sichtbar sein
    cy.contains("Test Charakter 1").should("be.visible");
    cy.contains("Test Charakter 2").should("be.visible");
  });

  it("zeigt Lade-Indikator während der Request läuft", () => {
    // Antwort verzögern um Lade-Zustand zu testen
    cy.intercept(
      "GET",
      "https://rickandmortyapi.com/api/character*",
      (req) => {
        // 500ms Verzögerung simulieren
        req.reply((res) => {
          res.setDelay(500);
          res.fixture("characters.json");
        });
      }
    );

    cy.visit("http://localhost:3000/characters");

    // Lade-Spinner sollte kurz sichtbar sein
    cy.get("[data-cy=loading-spinner]").should("exist");

    // Nach dem Laden sollte er verschwunden sein
    cy.get("[data-cy=loading-spinner]").should("not.exist");
  });
});

// ============================================================
// cypress/fixtures/characters.json – Inhalt
// ============================================================
// {
//   "info": { "count": 2, "pages": 1, "next": null, "prev": null },
//   "results": [
//     {
//       "id": 999,
//       "name": "Test Charakter 1",
//       "status": "Alive",
//       "image": "https://via.placeholder.com/300"
//     },
//     {
//       "id": 998,
//       "name": "Test Charakter 2",
//       "status": "Dead",
//       "image": "https://via.placeholder.com/300"
//     }
//   ]
// }
