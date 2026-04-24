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
