export class LoginPage {
  pageTitle = '[data-test="title"]';
  errorMessage = '[data-test="error"]';

  visit(url) {
    cy.visit(url);
  }

  login(username, password) {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  }
  getTitle() {
    return cy.get(this.pageTitle);
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
