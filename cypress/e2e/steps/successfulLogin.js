import { LoginPage } from '../../pages/loginPage.js';
import {
  Before,
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

const loginPage = new LoginPage();

// before hook to load common data (no login here since testing login itself)

Before(() => {
  cy.fixture('common.json').as('commonData');
});

// Scenario 1: Valid login

Given('I am on the saucedemo login page for valid login', function () {
  cy.get('@commonData').then((commonData) => {
    cy.visit('/');
  });
});

When('I enter valid credentials and click the login button', function () {
  cy.get('@commonData').then((commonData) => {
    loginPage.login(commonData.username, commonData.password);
  });
});

Then(
  'I should be redirected to the product catalog page and see the product listings',
  function () {
    cy.get('@commonData').then((commonData) => {
      cy.url().should('include', commonData.inventoryUrl);
    });
  },
);

// Scenario 2: Invalid login

Given('I am on the saucedemo login page for invalid login', function () {
  cy.get('@commonData').then((commonData) => {
    cy.visit('/');
  });
});

When('I enter invalid credentials and click the login button', function () {
  cy.get('@commonData').then((commonData) => {
    loginPage.login(commonData.invalidUsername, commonData.invalidPassword);
  });
});

Then('I should see an error message', function () {
  cy.get('@commonData').then((commonData) => {
    loginPage
      .getErrorMessage()
      .should('contain.text', commonData.loginErrorMessage);
  });
});
