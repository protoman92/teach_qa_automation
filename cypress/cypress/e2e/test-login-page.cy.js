describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://practicetestautomation.com/practice-test-login/");
  });
  it("Positive Login", () => {
    cy.get("#username").type("student");
    cy.get("#password").type("Password123");
    cy.get("#submit").click();
    cy.url().should("contain", "practicetestautomation.com");
    cy.get("div").should("contain.text", "Congratulation");
    cy.get("a").should("contain.text", "Log out");
  });
  it("Negative Login", () => {
    cy.get("#username").type("incorrectUsername");
    cy.get("#submit").type("incorrectPassword");
    cy.get("#submit").click();
    cy.get("#error").should("exist");
    cy.get("*").should("contain.text", "Your username is invalid!");
  });
});
