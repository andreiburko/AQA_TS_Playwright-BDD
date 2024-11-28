Feature: Home Page
  Scenario: Check page and tab-name
    Given User opens Home page
    Then User sees button "Login"
    And Tab-name is "Swag Labs"

  Scenario: Check locked user can't go through authorization
    Given User opens Home page
    When User fills Username field with value "locked_out_user"
    And User fills Password field with correct password
    And User clicks on Login button
    Then Error message "Epic sadface: Sorry, this user has been locked out." appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Scenario: User authorization with empty Username and Password
    Given User opens Home page
    When User clicks on Login button
    Then Error message "Epic sadface: Username is required" appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Scenario: User authorization with empty Username
    Given User opens Home page
    When User fills Password field with correct password
    And User clicks on Login button
    Then Error message "Epic sadface: Username is required" appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Scenario: User authorization with empty Password
    Given User opens Home page
    When User fills Username field with correct user name
    And User clicks on Login button
    Then Error message "Epic sadface: Password is required" appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Scenario Outline: Authorisation non-registered user
    Given User opens Home page
    When User fills Username field with value "<user_name>"
    And User fills Password field with correct password
    And User clicks on Login button
    Then Error message "Epic sadface: Username and password do not match any user in this service" appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Examples:
    | user_name |
    | not_registrated_user |
    | 1234567890 |
    | незарегистрированный_пользователь |
    | user123 |

  Scenario Outline: User authorization with wrong Password
    Given User opens Home page
    When User fills Username field with correct user name
    And User fills Password field with value "<password>"
    And User clicks on Login button
    Then Error message "Epic sadface: Username and password do not match any user in this service" appears
    And Error message has red background
    And Fields Username and Password have error icons
    And Fields Username and Password have red bottom borders
    And User is on Home page

  Examples:
    | password |
    | password |
    | 1234567890 |
    | secret_password |