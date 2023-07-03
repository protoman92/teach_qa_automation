describe("Caculator", () => {
  beforeEach(() => {
    cy.visit("https://reactive-calculator-two.vercel.app/");
  });
  it("Positive: add two numbers", () => {
    cy.get("div[title=8]").click();
    cy.get("div[title='+']").click();
    cy.get("div[title='1']").click();
    cy.get("div[title='=']").click();
    cy.get("div[title='CView']").invoke("text").should("equal", "9");
  });
});
