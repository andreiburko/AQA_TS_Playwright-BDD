import { expect } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts';
import { BASE_URL,
        ENDPOINTS,
        HOVER_COLOR,
        ITEMS,
        RANDOM_ITEM,
        RED_COLOR,
        SORT_OPTIONS,
        SORTED_ITEMS_NAMES,
        SORTED_ITEMS_PRICES,
        STANDART_COLOR } from '../../helpers/testData.ts';

let itemNumber: number;

//Scenario: Item-cards are presented on Products page and contain right information
Then('Item-cards are presented on the page', async ({ productsPage }) => {
  const itemsArr = await productsPage.locators.getItems().all();
  expect(itemsArr).toHaveLength(6);
  for (let item of itemsArr) {
    await expect(item).toBeVisible();
  }
});

Then('Item-cards contain correct item names', async ({ productsPage }) => {
  const pageItemNames = await productsPage.locators.getItemsNames().allTextContents();
  for (let itemName of pageItemNames) {
    try {
      expect(ITEMS.find((el) => el.name === itemName)).toBeDefined();
    } catch (error) {
      throw new Error(`Unexpected item name: ${itemName}`);
    }
  }
});

Then('Item-cards contain correct descriptions', async ({ productsPage }) => {
  const pageItems = await productsPage.locators.getItems().all();
  const itemNameLocator = productsPage.locators.getItemsNames();
  const itemDescriptionLocator = productsPage.locators.getItemDescriptions(); 
  for (let item of pageItems) {
    const itemName = await item.locator(itemNameLocator).textContent();
    const itemDescription = await item.locator(itemDescriptionLocator).textContent();
    const itemObj = ITEMS.find((el) => el.name === itemName);
    try {
      expect(itemDescription).toEqual(itemObj?.description);
    } catch (error) {
      throw new Error(`Reseved description: "${itemDescription}" doesn't match with "${itemObj?.description}" in item "${itemName}"`);
    }
  }
});

Then('Item-cards contain correct prices', async ({ productsPage }) => {
  const pageItems = await productsPage.locators.getItems().all();
  const itemNameLocator = productsPage.locators.getItemsNames();
  const itemPriceLocator = productsPage.locators.getItemsPrices();
  for (let item of pageItems) {
    const itemName = await item.locator(itemNameLocator).textContent();
    const itemPrice = await item.locator(itemPriceLocator).textContent();
    const itemObj = ITEMS.find((el) => el.name === itemName);
    try {
      expect(itemPrice).toEqual("$" + itemObj?.price);
    } catch (error) {
      throw new Error(`Reseved price: "${itemPrice}" doesn't match with "${itemObj?.price}" in item "${itemName}"`);
    }
  }
});

Then('Item-cards contain correct images', async ({ productsPage }) => {
  const pageItems = await productsPage.locators.getItems().all();
  const itemNameLocator = productsPage.locators.getItemsNames();
  const itemImageLocator = productsPage.locators.getItemImages();
  for (let item of pageItems) {
    const itemName = await item.locator(itemNameLocator).textContent();
    const itemImageSrc = await item.locator(itemImageLocator).getAttribute('src');
    const itemObj = ITEMS.find((el) => el.name === itemName);
    try {
      expect(itemImageSrc).toEqual(itemObj?.src);
    } catch (error) {
      throw new Error(`Reseved image url: "${itemImageSrc}" doesn't match with "${itemObj?.src}" in item "${itemName}"`);
    }
  }
});

//Scenario: Item-cards by default are sorted by name in ascending order
Then('Sort is setted by {string}', async ({ productsPage }, option: string) => {
  const sortSelectValue = await productsPage.locators.getSortSelect().inputValue();
  expect(sortSelectValue).toEqual(SORT_OPTIONS[option]);
});

Then('Item-cards sorted by name in ascending order', async ({ productsPage }) => {
  const itemsNamesArr = await productsPage.locators.getItemsNames().allTextContents();
  expect(itemsNamesArr.every((item, index) => item === SORTED_ITEMS_NAMES[index])).toBeTruthy();
});

//User can sort items by name in descending order
When('User set select by {string}', async ({ productsPage }, option: string) => {
  await productsPage.selectSortOption(option);
});

Then('Item-cards sorted by name in descending order', async ({ productsPage }) => {
  const itemsNameArr = await productsPage.locators.getItemsNames().allTextContents();
  expect(itemsNameArr.every((item, index) => item === SORTED_ITEMS_NAMES[itemsNameArr.length - (index + 1)])).toBeTruthy();
});

//Scenario: User can sort items by price in ascending order
Then('Item-cards sorted by price in ascending order', async ({ productsPage }) => {
  const itemsPriceArr = await productsPage.locators.getItemsPrices().allTextContents();
  const handledPriceArr = itemsPriceArr.map((item) => Number(item.replace('$', '')));
  expect(handledPriceArr.every((price, index) => price === SORTED_ITEMS_PRICES[index])).toBeTruthy();
});

//Scenario: User can sort items by price in descending order
Then('Item-cards sorted by price in descending order', async ({ productsPage }) => {
  const itemsPriceArr = await productsPage.locators.getItemsPrices().allTextContents();
  const handledPriceArr = itemsPriceArr.map((item) => Number(item.replace('$', '')));
  expect(handledPriceArr.every((price, index) => price === SORTED_ITEMS_PRICES[handledPriceArr.length - (index + 1)])).toBeTruthy();
});

//Scenario: User can open item page by click on item-card image
When('User clicks on random image of item-card', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.clickOnItemImage(ITEMS[itemNumber].name);
});

Then('Corresponding item page opens', async ({ page, itemPage }) => {
  await expect(itemPage.locators.getItemName()).toHaveText(ITEMS[itemNumber].name);
  const expectedUrl = `${BASE_URL}${ENDPOINTS.itemPage}${itemNumber}`;
  await expect(page).toHaveURL(expectedUrl);
});

Then('Opened item page has the same details as in item-card', async ({ itemPage }) => {
  await expect(itemPage.locators.getItemDescription()).toHaveText(ITEMS[itemNumber].description);
  await expect(itemPage.locators.getItemPrice()).toHaveText('$' + ITEMS[itemNumber].price);
  await expect(itemPage.locators.getItemImage()).toHaveAttribute('src', ITEMS[itemNumber].src);
});

//Scenario: User can open item page by click on name of item in item-card
When('User clicks on name of random item-card', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.clickOnItemName(ITEMS[itemNumber].name);
});

//Scenario: Name of item changes color on hover in item-card
When('User hovers on name of item in item-card', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.hoverOnItemName(ITEMS[itemNumber].name);
});

Then('Name of item changes color', async ({ productsPage }) => {
  const item = productsPage.locators.getItemName(ITEMS[itemNumber].name);
  await expect(item).toHaveCSS('color', HOVER_COLOR);
});

//Scenario: User can add item to cart via item-card
When('User clicks on button Add to cart in item-card', async ({ productsPage }) => {
  itemNumber = RANDOM_ITEM;
  await productsPage.clickAddToCartOrRemoveButton(ITEMS[itemNumber].name);
});

Then('Cart contains choosed item', async ({ cartPage }) => {
  expect(await cartPage.locators.getItems().all()).toHaveLength(1);
  const itemNamesArr = await cartPage.locators.getItemNames().allTextContents();
  expect(itemNamesArr[0]).toEqual(ITEMS[itemNumber].name);
  const itemDescriptionsArr = await cartPage.locators.getItemDescriptions().allTextContents();
  expect(itemDescriptionsArr[0]).toEqual(ITEMS[itemNumber].description);
  const itemPricesArr = await cartPage.locators.getItemPrices().allTextContents();
  expect(itemPricesArr[0]).toEqual('$' + ITEMS[itemNumber].price);
});

//Scenario: Text and color of button Add to cart changes when user adds item to cart
Then('Text in button Add to cart replaced on Remove', async ({ productsPage }) => {
  const button = productsPage.locators.getAddToCartOrRemoveButton(ITEMS[itemNumber].name);
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Remove');
});

Then('Text and border of Remove button have red color', async ({ productsPage }) => {
  const button = productsPage.locators.getAddToCartOrRemoveButton(ITEMS[itemNumber].name);
  await expect(button).toHaveCSS('color', RED_COLOR);
  await expect(button).toHaveCSS('border-color', RED_COLOR);
});

//Scenario: User can remove item from cart via Remove button in item-card
When('User clicks on button Remove in item-card', async ({ productsPage }) => {
  await productsPage.clickAddToCartOrRemoveButton(ITEMS[itemNumber].name);
});

//Scenario: Text and color of button Remove changes when user removes item from cart
Then('Text in button Remove replaced on Add to cart', async ({ productsPage }) => {
  const button = productsPage.locators.getAddToCartOrRemoveButton(ITEMS[itemNumber].name);
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Add to cart');
});

Then('Text and border of Add to cart button have standart color', async ({ productsPage }) => {
  const button = productsPage.locators.getAddToCartOrRemoveButton(ITEMS[itemNumber].name);
  await expect(button).toHaveCSS('color', STANDART_COLOR);
  await expect(button).toHaveCSS('border-color', STANDART_COLOR);
});