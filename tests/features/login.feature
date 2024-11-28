Feature: Login
  Scenario: Check user authorization with correct credentials
    Given User opens Home page
    When User fills Username field with correct user name
    And User fills Password field with correct password
    And User clicks on Login button
    And Users data saves to sate.json file
    Then Products page opens