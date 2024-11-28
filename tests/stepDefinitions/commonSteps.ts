import { expect } from '@playwright/test';
import { Given, When, Then } from '../../pages/fixtures.ts';
import { BASE_URL,
        ENDPOINTS,
        RED_COLOR } from "../../helpers/testData.ts";

Given('User is on Products page', async ({ page, productsPage }) => {
  const storageState = require('../../state.json');
  const cookies = storageState.cookies;
  await page.context().addCookies(cookies);
  await productsPage.open(BASE_URL + ENDPOINTS.productsPage);
});

When('User clicks on cart icon', async ({ header }) => {
  await header.clickCartIcon();
});

Then('Products page opens', async ({ page, productsPage }) => {
  await expect(productsPage.locators.getTitle()).toHaveText("Products");
  await expect(page).toHaveURL(`${BASE_URL}${ENDPOINTS.productsPage}`);
});

Then('Red label appears on cart logo', async ({ header }) => {
  await expect(header.locators.getCartIconLabel()).toBeVisible();
  await expect(header.locators.getCartIconLabel()).toHaveCSS('background-color', RED_COLOR);
});

Then('Label contains number of items in cart', async ({ header }) => {
  await expect(header.locators.getCartIconLabel()).toHaveText('1');
});

Then('Cart is empty', async ({ cartPage }) => {
  expect(await cartPage.locators.getItems().all()).toHaveLength(0);
});

Then('Red label disappears from cart logo', async ({ header }) => {
  await expect(header.locators.getCartIconLabel()).toBeHidden();
});