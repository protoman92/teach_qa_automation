describe("todos", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
  });

  beforeEach("list of to do", () => {
    let todosList = [
      "Task1: Read and analysis requirement",
      "Task2: Create test cases",
      "Task3: Execute test based on test cases",
      "Task4: Report bug",
    ];
    for (let i = 0; i < todosList.length; i = i + 1) {
      cy.get(".new-todo").type(todosList[i]);
      cy.get(".new-todo").type("{enter}");
    }
  });

  // it("Check display  ", () => {
  //   cy.get(".todo-list li:nth-child(1) .view .destroy").click({
  //     force: true,
  //   });
  // });

  //Check when select 1 checkbox
  it("Check when select 1 checkbox", () => {
    cy.get(".todo-list li:nth-child(1) .view .toggle").click();
    cy.get(".todo-list li:nth-child(1)").should("have.class", "completed");
  });

  //Check when select multiple checkboxes
  it("Check when select multiple checkboxes", () => {
    for (let i = 1; i < 3; i = i + 1) {
      cy.get(`li:nth-child(${i}) .view .toggle`).click();
      cy.get(`li:nth-child(${i})`).should("have.class", "completed"); //use String Interpolation
    }
    // cy.get(".todo-list li:nth-child(1) .view .toggle").click();
    // cy.get(".todo-list li:nth-child(2) .view .toggle").click();
    // cy.get(".todo-list li").should("have.class", "completed");
  });

  //Click on toggle
  it("Check function when click on dropdown list at the first time", () => {
    cy.get("label[for=toggle-all]").click();
    // cy.get("footer .filters li:nth-child(1) .selected").click(); //Check function when click on Active button
  });
});
