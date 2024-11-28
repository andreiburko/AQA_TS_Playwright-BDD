import { expect } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts';
import { BASE_URL, 
        RED_COLOR } from '../../helpers/testData.ts';

//Scenario: Check page and tab-name
Then('User sees button {string}', async ({ homePage }, btnName: string) => {
  await expect(homePage.locators.getLoginButton()).toHaveText(btnName);
});

Then('Tab-name is {string}', async ({ page }, tabName: string) => {
  await expect(page).toHaveTitle(tabName);
});

//Scenario: Check locked user can't go through authorization
When('User fills Username field with value {string}', async ({ homePage }, userName: string) => {
  await homePage.fillUsernameField(userName);
});

Then('Error message {string} appears', async ({ homePage }, message: string) => {
  await expect(homePage.locators.getErrorMessageBlock()).toBeVisible();
  await expect(homePage.locators.getErrorMessageBlock()).toHaveText(message);
});

Then('Error message has red background', async ({ homePage }) => {
  await expect(homePage.locators.getErrorMessageBlock()).toHaveCSS('background-color', RED_COLOR);
});

Then('Fields Username and Password have error icons', async ({ homePage }) => {
  const iconsArr = homePage.locators.getErrorIcons();
  await expect(iconsArr).toHaveCount(2);
  (await iconsArr.all()).forEach(async (element) => await expect(element).toBeVisible());
});

Then('Fields Username and Password have red bottom borders', async ({ homePage }) => {
  await expect(homePage.locators.getUsernameField()).toHaveCSS('border-bottom-color', RED_COLOR);
  await expect(homePage.locators.getPasswordField()).toHaveCSS('border-bottom-color', RED_COLOR);
});

Then('User is on Home page', async ({ page }) => {
  await expect(page).toHaveURL(BASE_URL);
});

//Scenario: User authorization with wrong Password
When('User fills Password field with value {string}', async ({ homePage }, password: string) => {
  await homePage.fillPasswordField(password);
});