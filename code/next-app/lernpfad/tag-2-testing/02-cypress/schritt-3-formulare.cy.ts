// ============================================================
// SCHRITT 3 – Formulare testen: Validierung & Submit
// ============================================================
//
// Formular-Tests sind in Cypress besonders wertvoll:
//   ✓ Testet das Zusammenspiel von Validierung, State und Submit
//   ✓ Echte Keyboard-Interaktionen (type, clear, select)
//   ✓ Fehlerszenarien: leer abschicken, falsche Eingaben
//
// ============================================================

describe("Todo-Formular: leer abschicken zeigt Fehler", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/lernpfad/tag-1/demo");
  });

  it("zeigt Fehler wenn das Feld leer ist", () => {
    // Submit ohne Eingabe
    cy.get("[data-cy=add-button]").click();

    // Fehlermeldung sollte erscheinen
    cy.get("[data-cy=input-error]").should("be.visible");
    cy.contains(/pflichtfeld/i).should("exist");
  });

  it("fügt Todo hinzu wenn das Formular korrekt ausgefüllt ist", () => {
    // Feld ausfüllen
    cy.get("[data-cy=todo-input]").type("Cypress meistern");

    // Formular abschicken
    cy.get("[data-cy=add-button]").click();

    // Todo sollte in der Liste erscheinen
    cy.contains("Cypress meistern").should("be.visible");

    // Eingabefeld sollte geleert sein
    cy.get("[data-cy=todo-input]").should("have.value", "");
  });

  it("löscht einen Todo aus der Liste", () => {
    // Todo hinzufügen
    cy.get("[data-cy=todo-input]").type("Zu löschen");
    cy.get("[data-cy=add-button]").click();

    // Löschen-Button beim Todo klicken
    cy.contains("Zu löschen")
      .closest("[data-cy=todo-item]")
      .find("[data-cy=delete-button]")
      .click();

    // Todo sollte verschwunden sein
    cy.contains("Zu löschen").should("not.exist");
  });
});

// ============================================================
// data-cy Attribute in den Komponenten setzen:
// ============================================================
//
// <input data-cy="todo-input" ... />
// <button data-cy="add-button" ...>Hinzufügen</button>
// <li data-cy="todo-item" ...>
//   <span>{text}</span>
//   <button data-cy="delete-button">Löschen</button>
// </li>
// <p data-cy="input-error" ...>Pflichtfeld!</p>
//
// Warum data-cy statt id/class?
//   → Klassen ändern sich (Refactoring, CSS-Module, Tailwind)
//   → data-cy ist testspezifisch – macht den Zweck klar
//   → Kann im Prod-Build herausgestripped werden
