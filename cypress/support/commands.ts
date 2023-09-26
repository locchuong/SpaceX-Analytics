/// <reference types="cypress" />

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");

  cy.get("input[name=email]").type(email, { log: false });
  cy.get("input[name=password]").type(password, { log: false });

  cy.get("button[type=submit]").click();
});
