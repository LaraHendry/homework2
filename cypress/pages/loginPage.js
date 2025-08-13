class LoginPage {
  // Selectors
  usernameField() {
    return cy.get('#user-name');
  }
  passwordField() {
    return cy.get('#password');
  }
  loginButton() {
    return cy.get('#login-button');
  }

  // Action
  login(username, password) {
    this.usernameField().type(username);
    this.passwordField().type(password);
    this.loginButton().click();
  }

  visit(){
    cy.visit("https://www.saucedemo.com");
  }
}
export {LoginPage};