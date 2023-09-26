describe("Astronauts Tests", () => {
  it("Should have title", () => {
    cy.login(Cypress.env("user_name"), Cypress.env("user_password"));
    cy.wait(1000);
    cy.visit("/astronauts");
    cy.get("h1").should("contain", "Astronauts");
  });

  it("Should fetch astronauts list", () => {
    cy.login(Cypress.env("user_name"), Cypress.env("user_password"));
    cy.wait(1000);
    cy.visit("/astronauts");

    cy.intercept("GET", "http://api.open-notify.org/astros.json").as("astros");

    cy.wait("@astros").its("response.body").should("have.property", "people");
  });
});
