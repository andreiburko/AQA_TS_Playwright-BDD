import type { Page } from '@playwright/test';
import ItemPage from './itemPage.ts';
import ProductsPage from './productsPage.ts';
import CheckoutStepOnePage from './checkoutStepOnePage.ts';

class CartPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getItems: () => this.page.locator('div[data-test="inventory-item"]'),
    getItemNames: () => this.page.locator('div[data-test="inventory-item-name"]'),
    getItemDescriptions: () => this.page.locator('div[data-test="inventory-item-desc"]'),
    getItemPrices: () => this.page.locator('div[data-test="inventory-item-price"]'),
    getTitle: () => this.page.locator('span[data-test="title"]'),
    getRemoveButtons: () => this.page.getByRole('button', { name: 'Remove', exact: true }),
    getContinueShoppingButton: () => this.page.locator('button[data-test="continue-shopping"]'),
    getCheckoutButton: () => this.page.locator('button[data-test="checkout"]'),
  }

  async hoverOnItemName() {
    await this.locators.getItemNames().first().hover();
  }

  async clickOnItemName() {
    await this.locators.getItemNames().first().click();
    return new ItemPage(this.page);
  }

  async clickOnRemoveButton(itemNumber: number) {
    await this.locators.getRemoveButtons().nth(itemNumber).click();
  }

  async clickContinueShoppingButton() {
    await this.locators.getContinueShoppingButton().click();
    return new ProductsPage(this.page);
  }

  async clickCheckoutButton() {
    await this.locators.getCheckoutButton().click();
    return new CheckoutStepOnePage(this.page);
  }
}

export default CartPage