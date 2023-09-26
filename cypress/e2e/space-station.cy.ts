describe("Space Station Tests", () => {
  it("Should have title", () => {
    cy.login(Cypress.env("user_name"), Cypress.env("user_password"));
    cy.wait(1000);
    cy.visit("/iss-location");
    cy.get("h1").should("contain", "International Space Station");
  });

  it("Should fetch space station location", () => {
    cy.login(Cypress.env("user_name"), Cypress.env("user_password"));
    cy.wait(1000);
    cy.visit("/iss-location");

    cy.intercept("GET", "http://api.open-notify.org/iss-now.json").as("iss");

    cy.wait("@iss").its("response.body").should("have.property", "iss_position");
  });
});
