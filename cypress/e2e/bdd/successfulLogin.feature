Feature: User login

As a returning user, 
I want to securely log in to the SauceDemo website, 
so that I can access the product catalog and proceed with my shopping experience

  Scenario: Successful login with valid credentials
    Given I am on the saucedemo login page
    When I enter valid credentials and click the login button
    Then I should be redirected to the product catalog page and see the product listings