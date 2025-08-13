Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the saucedemo login page
    When I enter valid credentials and click the login button
    Then I should be redirected to the product catalog page and see the product listings