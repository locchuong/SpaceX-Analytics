describe("Auth Tests", () => {
  it("Should login with valid credentials", () => {
    cy.login(Cypress.env("user_name"), Cypress.env("user_password"));

    cy.get("h1").should("contain", "SpaceX Analytics");
  });

  it("Should display an error with invalid credentials", () => {
    cy.login("invalid_username@gmail.com", "invalid_password");

    cy.get("div[role=alert]")
      .children("div")
      .then((elem) => {
        expect(elem.text()).equal("The provided email or password is invalid.");
      });
  });

  it("Should redirect unauthenticated users to login", () => {
    cy.visit("/");
    cy.get("input[name=email]").should("exist");
  });
});
