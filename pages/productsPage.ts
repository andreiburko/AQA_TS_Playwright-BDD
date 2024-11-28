import type { Page } from '@playwright/test';
import ItemPage from './itemPage.ts';

class ProductsPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getTitle: () => this.page.locator('span.title'),
    getSortSelect: () => this.page.locator('select[data-test="product-sort-container"]'),
    getItemsNames: () => this.page.locator('div[data-test="inventory-item-name"]'),
    getItemsPrices: () => this.page.locator('div[data-test="inventory-item-price"]'),
    getItemImage: (itemName: string) => this.page.getByAltText(itemName),
    getItemName: (name: string) => this.page.locator('div[data-test="inventory-item-name"]').filter({ hasText: name }),
    getAddToCartOrRemoveButton: (itemName: string) => this.page.locator(`//div[text()="${itemName}"]/parent::a/parent::div/parent::div//button`),
    getItems: () => this.page.locator('div[data-test="inventory-item"]'),
    getItemDescriptions: () => this.page.locator('div[data-test="inventory-item-desc"]'),
    getItemImages: () => this.page.locator('.inventory_item_img img'),
  }

  async open(url: string) {
    await this.page.goto(url); 
  }

  async selectSortOption(selectOption: string) {
    await this.locators.getSortSelect().selectOption(selectOption);
  }

  async clickOnItemImage(itemName: string) {
    await this.locators.getItemImage(itemName).click();
    return new ItemPage(this.page);
  }

  async clickOnItemName(itemName: string) {
    await this.locators.getItemName(itemName).click();
    return new ItemPage(this.page);
  }

  async hoverOnItemName(itemName: string) {
    await this.locators.getItemName(itemName).hover();
  }

  async clickAddToCartOrRemoveButton(itemName: string) {
    await this.locators.getAddToCartOrRemoveButton(itemName).click();
  }
}

export default ProductsPage