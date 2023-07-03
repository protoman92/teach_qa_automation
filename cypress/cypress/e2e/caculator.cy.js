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
  it("Positive: subtraction two numbers", () => {
    cy.get("div[title=1]").click();
    cy.get("div[title=0]").click();
    cy.get("div[title='-']").click();
    cy.get("div[title='4']").click();
    cy.get("div[title='=']").click();
    cy.get("div[title=CView]").invoke("text").should("equal", "6");
  });
  it("Positive: multiplication two numbers", () => {
    cy.get("div[title=1]").click();
    cy.get("div[title=2]").click();
    cy.get("div[title='*']").click();
    cy.get("div[title='1']").click();
    cy.get("div[title='2']").click();
    cy.get("div[title='=']").click();
    cy.get("div[title=CView]").invoke("text").should("equal", "144");
  });
});
