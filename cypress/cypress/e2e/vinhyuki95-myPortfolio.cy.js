describe("Login page", () => {
  beforeEach(() => {
    cy.visit("https://practicetestautomation.com/practice-test-login");
  });

  it("Positive LogIn test", () => {
    cy.get("#username").type("student");
  });
});
