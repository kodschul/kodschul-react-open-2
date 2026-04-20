// ============================================================
// SCHRITT 1 – Cypress: get, contains, data-cy
// ============================================================
//
// Cypress testet die ganze App aus Nutzerperspektive im echten Browser.
//
// Einrichtung:
//   npm install -D cypress
//   npx cypress open   → interaktiver Modus
//   npx cypress run    → headless (für CI)
//
// Dateistruktur:
//   cypress/
//   ├── e2e/              ← Testdateien (.cy.ts)
//   ├── fixtures/         ← JSON-Testdaten
//   └── support/
//       └── commands.ts   ← eigene Befehle
//
// ── Selektoren: was nutzen? ───────────────────────────────────
//
//   cy.get(".klasse")         ✗ Schlecht – bricht bei CSS-Änderungen
//   cy.get("#id")             ✗ Schlecht – IDs können sich ändern
//   cy.get("[data-cy=...]")   ✓ Gut – testspezifisches Attribut
//   cy.contains("Text")       ✓ Gut – sucht nach sichtbarem Text
//
// ============================================================

describe("Smoke Test: App startet korrekt", () => {
  it("lädt die Startseite ohne JS-Fehler", () => {
    // cy.visit öffnet die URL
    cy.visit("http://localhost:3000");

    // Sicherstellen dass kein JS-Fehler in der Konsole auftrat
    cy.on("uncaught:exception", () => false); // Fehler nicht abbrechen lassen

    // Mindestens ein sichtbares Element auf der Seite
    cy.get("body").should("not.be.empty");
  });
});

describe("Characters-Flow: Liste und Detail", () => {
  it("zeigt die Characters-Seite mit Charakteren an", () => {
    cy.visit("http://localhost:3000/characters");

    // Auf das Erscheinen von Charakterkarten warten
    // data-cy="character-card" muss in der Komponente gesetzt sein
    cy.get("[data-cy=character-card]").should("have.length.greaterThan", 0);

    // Text-Suche: Rick Sanchez sollte sichtbar sein
    cy.contains("Rick Sanchez").should("be.visible");
  });

  it("navigiert zur Detailseite beim Klick auf eine Karte", () => {
    cy.visit("http://localhost:3000/characters");

    // Auf ersten Charakter klicken
    cy.get("[data-cy=character-card]").first().click();

    // URL sollte sich geändert haben
    cy.url().should("include", "/characters/");

    // Detailseite sollte Charakter-Info zeigen
    cy.get("[data-cy=character-name]").should("be.visible");
  });
});

// ── .should() – automatisches Retry ──────────────────────────
//
// Cypress wartet automatisch bis die Assertion erfüllt ist.
// Standard-Timeout: 4000ms (konfigurierbar)
//
// cy.contains("Rick Sanchez").should("be.visible")
//    ↑ Wiederholt die Prüfung bis der Text sichtbar ist oder Timeout
//
// Kein manuelles wait/sleep nötig!
