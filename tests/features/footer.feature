Feature: Footer
  Background: User is on Products page
    Given User is on Products page

  Scenario: The X social network page opens in new tab when user clicks on Twitter icon
    When User clicks on Twitter icon
    Then The X page opens in new tab

  Scenario: The Facebook social network page opens in new tab when user clicks on Facebook icon
    When User clicks on Facebook icon
    Then The Facebook page opens in new tab

  Scenario: The LinkedIn social network page opens in new tab when user clicks on LinkedIn icon
    When User clicks on LinkedIn icon
    Then The LinkedIn page opens in new tab

  Scenario: Footer contains copy information
    Then User sees "© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy" text