Feature: Header
  Background: User is on Products page
    Given User is on Products page

  Scenario: Left-side menu opens when user clicks on menu icon
    When User clicks on menu icon
    Then User sees left-side menu

  Scenario: Left-side menu closes when user clicks on X button
    When User clicks on menu icon
    And User clicks on X button
    Then User does not see left-side menu

  Scenario Outline: Menu items change color on hover 
    When User clicks on menu icon
    And User hovers on "<menuItem>"
    Then "<menuItem>" changes color

  Examples:
    | menuItem |
    | All Items |
    | About |
    | Logout |
    | Reset App State |

  Scenario: Products page opens when user clicks on All Items menu link
    When User clicks on cart icon
    And User clicks on menu icon
    And User clicks on "All Items" menu link
    Then Products page opens

  Scenario: saucelabs.com site opens when user clicks on About menu link
    When User clicks on menu icon
    And User clicks on "About" menu link
    Then saucelabs.com site opens

  Scenario: User can log out of system via Logout menu-link
    When User clicks on menu icon
    And User clicks on Logout menu-link
    Then Home page opens

  Scenario: User can clear cart via Reset App State menu-link
    When User clicks Add to cart button on any item-card
    And User clicks on menu icon
    And User clicks on "Reset App State" menu link
    And User clicks on cart icon
    Then Cart is empty
    And Local storage does not keep cart state

  Scenario: Label with count of items in cart disappears from cart logo after click on Reset App State menu-link
    When User clicks Add to cart button on any item-card
    And User clicks on menu icon
    And User clicks on "Reset App State" menu link
    Then Red label disappears from cart logo

  Scenario: Cart page opens when user click on cart icon
    When User clicks on cart icon
    Then Cart page opens