import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pages/loginPage.js";

const loginPage = new LoginPage();

Given("I am on the saucedemo login page", () => {
  loginPage.visit();
});

When("I enter valid credentials and click the login button", () => {
  loginPage.login("standard_user", "secret_sauce");
});

Then("I should be redirected to the product catalog page and see the product listings", () => {
  cy.url().should("include", "/inventory.html");
});

