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

// Scenario: Successfully add item to cart

Given('I am on the product catalog page', () => {
  loginPage.login(commonData.username, commonData.password);
  cy.url().should('include', commonData.inventoryUrl);
});

When('I click the "Add to cart" button for a chosen item', () => {
  productPage.addToCart(commonData.backpackProductName);
});

Then(
  'the item should be added to my shopping cart, indicated by the shopping cart icon showing an increasing count',
  () => {
    productPage
      .getCartBadge()
      .should('be.visible')
      .and('have.text', commonData.cartBadgeCount);
  },
);

// Scenario: Successfully view item in cart

Given('I have an item in my shopping cart', () => {
  loginPage.login(commonData.username, commonData.password);
  productPage.addToCart(commonData.backpackProductName);
});

When('I click the shopping cart icon', () => {
  productPage.goToCart();
});

Then(
  'I should be navigated to the "Your Cart" page and I should see the selected item listed in my cart',
  () => {
    cy.url().should('include', commonData.cartUrl);
    productPage
      .getCartItems()
      .should('contain.text', commonData.backpackProductName);
  },
);
