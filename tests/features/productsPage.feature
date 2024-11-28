Feature: Products page
  Background: User is on Products page
    Given User is on Products page

  Scenario: Item-cards are presented on Products page and contain right information
    Then Item-cards are presented on the page
    And Item-cards contain correct item names
    And Item-cards contain correct descriptions
    And Item-cards contain correct prices
    And Item-cards contain correct images

  Scenario: Item-cards by default are sorted by name in ascending order
    Then Sort is setted by "Name (A to Z)"
    And Item-cards sorted by name in ascending order

  Scenario: User can sort items by name in descending order
    When User set select by "Name (Z to A)"
    Then Sort is setted by "Name (Z to A)"
    And Item-cards sorted by name in descending order

  Scenario: User can sort items by price in ascending order
    When User set select by "Price (low to high)"
    Then Sort is setted by "Price (low to high)"
    And Item-cards sorted by price in ascending order

  Scenario: User can sort items by price in descending order
    When User set select by "Price (high to low)"
    Then Sort is setted by "Price (high to low)"
    And Item-cards sorted by price in descending order

  Scenario: User can sort items by name in ascending order
    When User set select by "Price (high to low)"
    And User set select by "Name (A to Z)"
    Then Sort is setted by "Name (A to Z)"
    And Item-cards sorted by name in ascending order

  Scenario: User can open item page by click on item-card image
    When User clicks on random image of item-card
    Then Corresponding item page opens
    And Opened item page has the same details as in item-card

  Scenario: User can open item page by click on name of item in item-card
    When User clicks on name of random item-card
    Then Corresponding item page opens
    And Opened item page has the same details as in item-card

  Scenario: Name of item changes color on hover in item-card
    When User hovers on name of item in item-card
    Then Name of item changes color

  Scenario: User can add item to cart via item-card
    When User clicks on button Add to cart in item-card
    And User clicks on cart icon
    Then Cart contains choosed item

  Scenario: Text and color of button Add to cart changes when user adds item to cart
    When User clicks on button Add to cart in item-card
    Then Text in button Add to cart replaced on Remove 
    And Text and border of Remove button have red color

  Scenario: Red label with number of items in cart appears on cart logo when user adds item to cart
    When User clicks on button Add to cart in item-card
    Then Red label appears on cart logo
    And Label contains number of items in cart

  Scenario: User can remove item from cart via Remove button in item-card
    When User clicks on button Add to cart in item-card
    And User clicks on button Remove in item-card
    And User clicks on cart icon
    Then Cart is empty

  Scenario: Text and color of button Remove changes when user removes item from cart
    When User clicks on button Add to cart in item-card
    And User clicks on button Remove in item-card
    Then Text in button Remove replaced on Add to cart 
    And Text and border of Add to cart button have standart color

  Scenario: Red label with number of items in cart disappears from cart logo when cart doesn't contain items
    When User clicks on button Add to cart in item-card
    And User clicks on button Remove in item-card
    Then Red label disappears from cart logo