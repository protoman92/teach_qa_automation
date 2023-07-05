describe("todos", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
  });
  it("Positive: Add a new to do", () => {
    cy.get(".new-todo").type("go to update new phone number at DBS");
    cy.get(".new-todo").type("{enter}");
    cy.get("*")
      .invoke("text")
      .should("equal", "go to update new phone number at DBS");
  });
});
