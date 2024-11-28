import { expect } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts'
import { BASE_URL, 
        ENDPOINTS, 
        HOVER_COLOR, 
        ITEMS, 
        RANDOM_ITEM } from '../../helpers/testData.ts';

let itemNumber: number;

//Scenario: Name of item changes color on hover
When('User adds random item to cart', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.clickAddToCartOrRemoveButton(ITEMS[itemNumber].name);
});

When('User hovers on item name', async ({ cartPage }) => {
  await cartPage.hoverOnItemName();
});

Then('Item name changes color', async ({ cartPage }) => {
  const itemName = cartPage.locators.getItemNames().first();
  await expect(itemName).toHaveCSS('color', HOVER_COLOR);
});

//Scenario: User can open item page by clicking on name of item in cart
When('User clicks on name of item in cart', async ({ cartPage, itemPage }) => {
  await cartPage.clickOnItemName();
});

Then('Corresponding item page opened', async ({ page, itemPage }) => {
  await expect(itemPage.locators.getItemName()).toHaveText(ITEMS[itemNumber].name);
  await expect(itemPage.locators.getItemPrice()).toHaveText("$" + ITEMS[itemNumber].price);
  const expectedUrl = `${BASE_URL}${ENDPOINTS.itemPage}${itemNumber}`;
  await expect(page).toHaveURL(expectedUrl);
});

//Scenario: User can remove item from cart via Remove button on Cart page
When('User clicks on Remove button on Cart page', async ({ cartPage }) => {
  await cartPage.clickOnRemoveButton(0);
});

//Scenario: User can return to Products page by clicking on Continue Shopping button
When('User clicks on Continue Shopping button', async ({ cartPage }) => {
  cartPage.clickContinueShoppingButton();
});

//Scenario: User can make an order by clicking Checkout button
When('User clicks on Checkout button', async ({ cartPage }) => {
  await cartPage.clickCheckoutButton();
});

Then('Checkout Step One page opens', async ({ page, checkoutStepOnePage }) => {
  await expect(checkoutStepOnePage.locators.getTitle()).toHaveText('Checkout: Your Information');
  await expect(page).toHaveURL(`${BASE_URL}${ENDPOINTS.checkoutStepOnePage}`);
});