import { expect } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts';
import { BASE_URL, 
        ENDPOINTS, 
        HOME_PAGE_TITLE, 
        HOVER_COLOR, 
        ITEMS, 
        RANDOM_ITEM, 
        SAUCELABS_TITLE, 
        SAUCELABS_URL } from '../../helpers/testData.ts';

//Scenario: Left-side menu opens when user clicks on menu icon
When('User clicks on menu icon', async ({ header }) => {
  await header.clickMenuIconButton();
});

Then('User sees left-side menu', async ({ header }) => {
  await expect(header.locators.getLeftSideMenu()).toBeVisible();
  await expect(header.locators.getLeftSideMenu()).toHaveAttribute('aria-hidden', 'false');
});

//Scenario: Left-side menu closes when user clicks on X button
When('User clicks on X button', async ({ header }) => {
  await header.waitForCloseMenuButton();
  await header.clickCloseMenuButton();
});

Then('User does not see left-side menu', async ({ header }) => {
  await header.waitForCloseMenu();
  await expect(header.locators.getLeftSideMenu()).toBeHidden();
  await expect(header.locators.getLeftSideMenu()).toHaveAttribute('aria-hidden', 'true');
  await expect(header.locators.getLeftSideMenu()).toHaveAttribute('hidden', 'true');
});

//Scenario: Menu items change color on hover
When('User hovers on {string}', async ({ header }, menuItem: string) => {
  await header.hoverOnMenuItem(menuItem);
});

Then('{string} changes color', async ({ header }, menuItem: string) => {
  await expect(header.locators.getMenuItemLink(menuItem)).toHaveCSS('color', HOVER_COLOR);
});

//Scenario: Products page opens when user clicks on All Items menu link
When('User clicks on {string} menu link', async ({ header }, menuItem: string) => {
  await header.clickOnMenuItem(menuItem);
});

//Scenario: saucelabs.com site opens when user clicks on About menu link
Then('saucelabs.com site opens', async ({ page }) => {
  await expect(page).toHaveURL(SAUCELABS_URL);
  await expect(page).toHaveTitle(SAUCELABS_TITLE);
});

//Scenario: User can log out of system via Logout menu-link
When('User clicks on Logout menu-link', async ({ header }) => {
  await header.clickLogoutMenuItem();
});

Then('Home page opens', async ({ page, homePage }) => {
  await expect(page).toHaveURL(BASE_URL);
  await expect(page).toHaveTitle(HOME_PAGE_TITLE);
  await expect(homePage.locators.getLoginButton()).toBeVisible();
});

//Scenario: User can clear cart via Reset App State menu-link
When('User clicks Add to cart button on any item-card', async ({ productsPage }) => {
  const itemNumber = RANDOM_ITEM;
  await productsPage.clickAddToCartOrRemoveButton(ITEMS[itemNumber].name);
});

Then('Local storage does not keep cart state', async ({ page }) => {
  const localStorage = (await page.context().storageState()).origins[0].localStorage;
  expect(localStorage.length).toBeLessThan(3);
  expect(localStorage[2]).toBeUndefined();
  expect(localStorage[2]).toBeFalsy();
});

//Scenario: Cart page opens when user click on cart icon
Then('Cart page opens', async ({ page, cartPage }) => {
  await expect(cartPage.locators.getTitle()).toHaveText('Your Cart');
  await expect(page).toHaveURL(`${BASE_URL}${ENDPOINTS.cartPage}`);
});