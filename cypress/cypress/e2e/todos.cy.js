// describe("todos", () => {
//   beforeEach(() => {
//     cy.visit("https://todomvc.com/examples/react/#/");
//   });
//   it("Positive: Add a new to do", () => {
//     cy.get(".new-todo").type("go to update new phone number at DBS");
//     cy.get(".new-todo").type("{enter}");
//     cy.get("label")
//       .invoke("text")
//       .should("equal", "go to update new phone number at DBS");
//   });
//   it("Positive: Complete to do when tick", () => {
//     cy.get(".new-todo").type("go to update new phone number at DBS");
//     cy.get(".new-todo").type("{enter}");
//     cy.get("li.completed").should("not.exist");
//     cy.get(".toggle").click();
//     cy.get("li.completed").should("exist");
//   });
//   it("Positive: Clear completed to do when click clear completed", () => {
//     cy.get(".new-todo").type("go to update new phone number at DBS");
//     cy.get(".new-todo").type("{enter}");
//     cy.get(".toggle").click();
//     cy.get("li.completed").should("exist");
//     cy.get(".clear-completed").click();
//     cy.get("li.completed").should("not.exist");
//   });
// });
describe("todos", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
  });
  beforeEach("", () => {
    // cy.get(".new-todo").type("Task1: Read and analysis requirement");
    // cy.get(".new-todo").type("{enter}");
    // cy.get(".new-todo").type("Task2: Create test cases");
    // cy.get(".new-todo").type("{enter}");
    // cy.get(".new-todo").type("Task3: Execute test based on test cases");
    // cy.get(".new-todo").type("{enter}");
    // cy.get(".new-todo").type("Task4: Report bug");
    // cy.get(".new-todo").type("{enter}");

    let todosList = [
      "Task1: Read and analysis requirement",
      "Task2: Create test cases",
      "Task3: Execute test based on test cases",
      "Task4: Report bug",
    ];
    let a = "";
    for (let i = 0; i < todosList.length; i = i + 1) {
      cy.get(".new-todo").type(todosList[i]);
      cy.get(".new-todo").type("{enter}");
    }
  });
  it("Positive: Input data", () => {
    cy.get(".todo-list li:nth-child(1) .view .destroy").click({
      force: true,
    });
  });
});
