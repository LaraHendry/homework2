export class ProductPage {

  pageTitle = '[data-test="title"]';
  
  getTitle() {
    return cy.get(this.pageTitle);
  }
}