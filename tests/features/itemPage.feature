Feature: Item page 
  Background: User is on Item page of any product
    Given User is on Products page
    When User clicks on item-name in random item-card

  Scenario: Back to products button changes color on hover
    When User hovers on Back to products button
    Then Text changes color

  Scenario: User can return to Products page by clicking on Back to products button
    When User clicks on Back to products button
    Then Products page opens

  Scenario: User can add item to cart via Add to cart button from Item page
    When User clicks Add to cart button on Item page
    And User clicks on cart icon
    Then Cart contains corresponding item

  Scenario: Text and color of button Add to cart changes when user adds item to cart
    When User clicks Add to cart button on Item page
    Then Text in button Add to cart changed on Remove 
    And Text and border of Remove button have red color on Item page

  Scenario: Red label with number of items in cart appears on cart logo when user adds item to cart
    When User clicks Add to cart button on Item page
    Then Red label appears on cart logo
    And Label contains number of items in cart

  Scenario: User can remove item from cart via Remove button on Item page
    When User clicks Add to cart button on Item page
    And User clicks on Remove button on Item page
    And User clicks on cart icon
    Then Cart is empty
  
  Scenario: Text and color of Remove button changes when user clicks on it
    When User clicks Add to cart button on Item page
    And User clicks on Remove button on Item page
    Then Text in Remove button replaced on Add to cart on Item page 
    And Text and border of Add to cart button have standart color on Item page

  Scenario: Red label with number of items in cart disappears from cart logo when user removes item on Item page
    When User clicks Add to cart button on Item page
    And User clicks on Remove button on Item page
    Then Red label disappears from cart logo