import { LoginPage } from '../../pages/loginPage.js';
import { ProductPage } from '../../pages/productPage.js';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let commonData;
const loginPage = new LoginPage();
const productPage = new ProductPage();

before(() => {
  cy.fixture('common.json').then((data) => {
    commonData = data;
  });
});

// Scenario: Successful login with valid credentials

Given('I am on the saucedemo login page', () => {
  loginPage.visit(commonData.homeUrl);
  cy.title().should('eq', commonData.homePageTitle);
});

When('I enter valid credentials and click the login button', () => {
  loginPage.login(commonData.username, commonData.password);
});

Then(
  'I should be redirected to the product catalog page and see the product listings',
  () => {
    cy.url().should('include', commonData.inventoryUrl);
    productPage
      .getTitle()
      .should('be.visible')
      .and('have.text', commonData.productPageTitle);
  },
);
