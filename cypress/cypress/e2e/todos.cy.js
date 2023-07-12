describe("todos", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
  });
  it("Positive: Add a new to do", () => {
    cy.get(".new-todo").type("go to update new phone number at DBS");
    cy.get(".new-todo").type("{enter}");
    cy.get("label")
      .invoke("text")
      .should("equal", "go to update new phone number at DBS");
  });
  it("Positive: Complete to do when tick", () => {
    cy.get(".new-todo").type("go to update new phone number at DBS");
    cy.get(".new-todo").type("{enter}");
    cy.get("li.completed").should("not.exist");
    cy.get(".toggle").click();
    cy.get("li.completed").should("exist");
  });
  it("Positive: Clear completed to do when click clear completed", () => {
    cy.get(".new-todo").type("go to update new phone number at DBS");
    cy.get(".new-todo").type("{enter}");
    cy.get(".toggle").click();
    cy.get("li.completed").should("exist");
    cy.get(".clear-completed").click();
    cy.get("li.completed").should("not.exist");
  });
});
