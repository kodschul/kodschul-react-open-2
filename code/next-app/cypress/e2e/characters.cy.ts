describe("Characters-Flow: Liste und Detail", () => {
  beforeAll(() => {
    // BACKEND API nach einer Test-Umgebung fragen
  });

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
    // cy.get("[data-cyk=character-name]").should("be.visible");
  });

  it("test_case", function () {
    cy.visit("localhost:3000/state/zustand");

    cy.get("input").click();
    cy.get("input").type("abc");
    cy.get("input").click();
    cy.get("input").type(" ");
    cy.get("div:nth-child(4) div:nth-child(1)").click();
  });
});

it("torsten_test", function () {
  cy.visit("http://localhost:3000/state/zustand");

  cy.get("input").click();
  cy.get("input").type("torsten Cypress zeigen{enter}");
  cy.get("div:nth-child(4) div:nth-child(1)").click();
  cy.get("div:nth-child(4) div:nth-child(1)").click();
});
