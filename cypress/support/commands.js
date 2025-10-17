// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// replace before hook in step files

Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    // session creation
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    // validation - wait for inventory page to load
    cy.url().should('include', '/inventory.html');
  });

  // after session is restored, try to visit inventory page
  // if failure 404 then session wasn't restored properly
  cy.visit('/inventory.html', { failOnStatusCode: false });

  // check if we're on the inventory page or redirected to login
  cy.url().then((url) => {
    if (!url.includes('/inventory.html')) {
      // if not on inventory page, then login again
      cy.visit('/');
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    }
  });
});
