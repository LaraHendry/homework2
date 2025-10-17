import { ProductPage } from '../../pages/productPage.js';
import {
  Before,
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

const productPage = new ProductPage();

// before hook to load common data and perform login

Before(() => {
  cy.fixture('common.json').as('commonData');
  cy.get('@commonData').then((data) => {
    cy.login(data.username, data.password);
  });
});

// Scenario 1: Successfully add item to cart

Given('I am on the product catalog page', function () {
  cy.get('@commonData').then((commonData) => {
    cy.url().should('include', commonData.inventoryUrl);
  });
});

When('I click the "Add to cart" button for a chosen item', function () {
  cy.get('@commonData').then((commonData) => {
    productPage.addToCart(commonData.backpackProductName);
  });
});

Then(
  'the item should be added to my shopping cart, indicated by the shopping cart icon showing an increasing count',
  function () {
    cy.get('@commonData').then((commonData) => {
      productPage
        .getCartBadge()
        .should('be.visible')
        .and('have.text', commonData.cartBadgeCount);
    });
  },
);

// Scenario 2: Successfully view item in cart

Given('I have an item in my shopping cart', function () {
  cy.get('@commonData').then((commonData) => {
    productPage.addToCart(commonData.backpackProductName);
  });
});

When('I click the shopping cart icon', () => {
  productPage.goToCart();
});

Then(
  'I should be navigated to the "Your Cart" page and I should see the selected item listed in my cart',
  function () {
    cy.get('@commonData').then((commonData) => {
      cy.url().should('include', commonData.cartUrl);
      productPage
        .getCartItems()
        .should('contain.text', commonData.backpackProductName);
      productPage.getTitle().should('have.text', commonData.cartPageTitle);
    });
  },
);

// Scenario 3:Successfully proceed to checkout
Given('I am on the "Your Cart" page', function () {
  cy.get('@commonData').then((commonData) => {
    productPage.addToCart(commonData.backpackProductName);
    productPage.goToCart();
  });
});

When('I click the "Checkout" button', () => {
  productPage.checkoutItems();
});

Then(
  'I should be navigated to the "Checkout: Your Information" page',
  function () {
    cy.get('@commonData').then((commonData) => {
      cy.url().should('include', commonData.checkoutUrl);
      productPage
        .getTitle()
        .should('have.text', commonData.informationPageTitle);
    });
  },
);

// Scenario 4: Successfully view checkout Overview
Given('I am on the "Checkout: Your Information" page', function () {
  cy.get('@commonData').then((commonData) => {
    productPage.addToCart(commonData.backpackProductName);
    productPage.goToCart();
    productPage.checkoutItems();
  });
});

When(
  'I enter valid shipping information and I click the "Continue" button',
  function () {
    cy.get('@commonData').then((commonData) => {
      productPage.enterCheckoutDetails(
        commonData.firstName,
        commonData.lastName,
        commonData.postalCode,
      );
    });
  },
);

Then('I should be navigated to the "Checkout: Overview" page', function () {
  cy.get('@commonData').then((commonData) => {
    cy.url().should('include', commonData.checkoutOverviewUrl);
    productPage
      .getTitle()
      .should('have.text', commonData.checkoutOverviewPageTitle);
  });
});

// Scenario 5: Successfully complete purchase
Given('I am on the "Checkout: Overview" page', function () {
  cy.get('@commonData').then((commonData) => {
    productPage.goToCheckoutOverview(
      commonData.backpackProductName,
      commonData.firstName,
      commonData.lastName,
      commonData.postalCode,
    );
  });
});

When('I review the order summary and I click the "Finish" button', () => {
  productPage.finishCheckout();
});

Then(
  'I should be navigated to the "Checkout: Complete!" page and I should see a confirmation message',
  function () {
    cy.get('@commonData').then((commonData) => {
      cy.url().should('include', commonData.checkoutCompleteUrl);
      productPage
        .getCompleteHeader()
        .should('have.text', commonData.checkoutCompleteMessage);
    });
  },
);
