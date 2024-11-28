Feature: Cart page
  Background: User is on Cart page, one item added to cart
    Given User is on Products page
    When User adds random item to cart
    When User clicks on cart icon

  Scenario: Name of item changes color on hover
    When User hovers on item name
    Then Item name changes color

  Scenario: User can open item page by clicking on name of item in cart
    When User clicks on name of item in cart
    Then Corresponding item page opened

  Scenario: User can remove item from cart via Remove button on Cart page
    When User clicks on Remove button on Cart page
    Then Cart is empty

  Scenario: Red label with number of items in cart disappears from cart logo when user removes item on Cart page
    When User clicks on Remove button on Cart page
    Then Red label disappears from cart logo

  Scenario: User can return to Products page by clicking on Continue Shopping button
    When User clicks on Continue Shopping button
    Then Products page opens

  Scenario: User can make an order by clicking Checkout button
    When User clicks on Checkout button
    Then Checkout Step One page opens