import { expect } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts';
import { HOVER_COLOR, 
        ITEMS, 
        RANDOM_ITEM, 
        RED_COLOR, 
        STANDART_COLOR } from '../../helpers/testData.ts';

let itemNumber: number;

//Scenario: Back to products button changes color on hover
When('User clicks on item-name in random item-card', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.clickOnItemName(ITEMS[itemNumber].name);
});

When('User hovers on Back to products button', async ({ itemPage }) => {
  await itemPage.hoverBackToProductsButton();
});

Then('Text changes color', async ({ itemPage }) => {
  await expect(itemPage.locators.getBackToProductsButton()).toHaveCSS('color', HOVER_COLOR);
});

//Scenario: User can return to Products page by clicking on Back to products button
When('User clicks on Back to products button', async ({ itemPage }) => {
  await itemPage.clickBackToProductsButton();
});

//Scenario: User can add item to cart via Add to cart button from Item page
When('User clicks Add to cart button on Item page', async ({ itemPage }) => {
  await itemPage.clickAddToCartOrRemoveButton();
});

Then('Cart contains corresponding item', async ({ cartPage }) => {
  expect(await cartPage.locators.getItems().all()).toHaveLength(1);
  const namesArr = await cartPage.locators.getItemNames().allTextContents();
  expect(namesArr[0]).toEqual(ITEMS[itemNumber].name);
  const pricesArr = await cartPage.locators.getItemPrices().allTextContents();
  const price = Number(pricesArr[0].slice(1));
  expect(price).toEqual(ITEMS[itemNumber].price);
});

//Scenario: Text and color of button Add to cart changes when user adds item to cart
Then('Text in button Add to cart changed on Remove', async ({ itemPage }) => {
  const button = itemPage.locators.getAddToCartOrRemoveButton();
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Remove');
});

Then('Text and border of Remove button have red color on Item page', async ({ itemPage }) => {
  const button = itemPage.locators.getAddToCartOrRemoveButton();
  await expect(button).toHaveCSS('color', RED_COLOR);
  await expect(button).toHaveCSS('border-color', RED_COLOR);
});

//Scenario: User can remove item from cart via Remove button on Item page
When('User clicks on Remove button on Item page', async ({ itemPage }) => {
  await itemPage.clickAddToCartOrRemoveButton();
});

//Scenario: Text and color of Remove button changes when user clicks on it
Then('Text in Remove button replaced on Add to cart on Item page', async ({ itemPage }) => {
  const button = itemPage.locators.getAddToCartOrRemoveButton();
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Add to cart');
});

Then('Text and border of Add to cart button have standart color on Item page', async ({ itemPage }) => {
  const button = itemPage.locators.getAddToCartOrRemoveButton();
  await expect(button).toHaveCSS('color', STANDART_COLOR);
  await expect(button).toHaveCSS('border-color', STANDART_COLOR);
});