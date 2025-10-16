export class ProductPage {
  pageTitle = '[data-test="title"]';
  cartBadge = '[data-test="shopping-cart-badge"]';
  cartItem = '[data-test="inventory-item-name"]';

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
    cy.get('[data-test="shopping-cart-link"]').click();
  }

  getCartItems() {
    return cy.get(this.cartItem);
  }
}
