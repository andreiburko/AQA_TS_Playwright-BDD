import type { Page } from '@playwright/test';
import ProductsPage from './productsPage.ts';

class ItemPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getItemName: () => this.page.locator('div[data-test="inventory-item-name"]'),
    getItemPrice: () => this.page.locator('div[data-test="inventory-item-price"]'),
    getBackToProductsButton: () => this.page.locator('button[data-test="back-to-products"]'),
    getAddToCartOrRemoveButton: () => this.page.locator('div[data-test="inventory-item"] button'),
    getItemDescription: () => this.page.locator('div[data-test="inventory-item-desc"]'),
    getItemImage: () => this.page.locator('.inventory_details_img_container>img'),
  }

  async hoverBackToProductsButton() {
    await this.locators.getBackToProductsButton().hover();
  }

  async clickBackToProductsButton() {
    await this.locators.getBackToProductsButton().click();
    return new ProductsPage(this.page);
  }

  async clickAddToCartOrRemoveButton() {
    await this.locators.getAddToCartOrRemoveButton().click();
  }
}

export default ItemPage