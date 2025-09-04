import { LoginPage } from "../../pages/loginPage.js";

const loginPage = new LoginPage();

describe('Saucedemo Login Functionality', () => {

  it('should allow a standard user to log in successfully', () => {
    loginPage.visit("https://www.saucedemo.com");

    loginPage.login("standard_user", "secret_sauce");

    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('have.text', 'Products');
  });
});

