Feature: User login

As a returning user, 
I want to securely log in to the SauceDemo website, 
so that I can access the product catalog and proceed with my shopping experience

  Scenario: Valid login
    Given I am on the saucedemo login page for valid login
    When I enter valid credentials and click the login button
    Then I should be redirected to the product catalog page and see the product listings

  Scenario: Invalid login
    Given I am on the saucedemo login page for invalid login
    When I enter invalid credentials and click the login button
    Then I should see an error message