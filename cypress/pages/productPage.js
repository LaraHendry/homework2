export class ProductPage {
  pageTitle = '[data-test="title"]';
  cartBadge = '[data-test="shopping-cart-badge"]';
  cartItem = '[data-test="inventory-item-name"]';
  checkoutButton = '[data-test="checkout"]';
  shoppingCart = '[data-test="shopping-cart-link"]';
  firstName = '[data-test="firstName"]';
  lastName = '[data-test="lastName"]';
  postalCode = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  finishButton = '[data-test="finish"]';
  completeHeader = '[data-test="complete-header"]';

  getTitle() {
    return cy.get(this.pageTitle);
  }

  addToCart(productName) {
    cy.get(
      `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`,
    ).click();
  }

  getCartBadge() {
    return cy.get(this.cartBadge);
  }

  goToCart() {
    cy.get(this.shoppingCart).click();
  }

  getCartItems() {
    return cy.get(this.cartItem);
  }

  checkoutItems() {
    cy.get(this.checkoutButton).click();
  }

  enterCheckoutDetails(firstName, lastName, postalCode) {
    cy.get(this.firstName).type(firstName);
    cy.get(this.lastName).type(lastName);
    cy.get(this.postalCode).type(postalCode);
    cy.get(this.continueButton).click();
  }

  goToCheckoutOverview(productName, firstName, lastName, postalCode) {
    this.addToCart(productName);
    this.goToCart();
    this.checkoutItems();
    this.enterCheckoutDetails(firstName, lastName, postalCode);
  }

  finishCheckout() {
    cy.get(this.finishButton).click();
  }
  getCompleteHeader() {
    return cy.get(this.completeHeader);
  }
}
