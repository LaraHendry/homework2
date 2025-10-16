Feature: product purchasing

As a logged-in user, 
I want to complete the purchase of an item from the product catalog 
so that I can receive my desired product.

Scenario: Successfully add item to cart
Given I am on the product catalog page
When I click the "Add to cart" button for a chosen item
Then the item should be added to my shopping cart, indicated by the shopping cart icon showing an increasing count

Scenario: Successfully view item in cart
Given I have an item in my shopping cart 
When I click the shopping cart icon 
Then I should be navigated to the "Your Cart" page and I should see the selected item listed in my cart
