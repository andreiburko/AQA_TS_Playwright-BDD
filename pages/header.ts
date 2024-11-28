import type { Page } from '@playwright/test';
import CartPage from './cartPage.ts';
import HomePage from './homePage.ts';

class Header {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getCartIconLink: () => this.page.locator('a[data-test="shopping-cart-link"]'),
    getCartIconLabel: () => this.page.locator('span[data-test="shopping-cart-badge"]'),
    getMenuIconButton: () => this.page.getByRole('button', { name: 'Open Menu', exact: true }),
    getLeftSideMenu: () => this.page.locator('div[class="bm-menu-wrap"]'),
    getCloseMenuButton: () => this.page.getByRole('button', { name: 'Close Menu', exact: true }),
    getMenuItemLink: (itemName: string) => this.page.getByRole('link', {name: itemName, exact: true }),
  }

  async clickCartIcon() {
    await this.locators.getCartIconLink().click();
    return new CartPage(this.page);
  }

  async clickMenuIconButton() {
    await this.locators.getMenuIconButton().click();
  }

  async waitForCloseMenuButton() {
    await this.locators.getCloseMenuButton().waitFor({ state: 'visible' });
  }

  async clickCloseMenuButton() {
    await this.locators.getCloseMenuButton().click();
  }

  async waitForCloseMenu() {
    await this.locators.getLeftSideMenu().waitFor({ state: 'hidden' });
  }

  async hoverOnMenuItem(itemName: string) {
    await this.locators.getMenuItemLink(itemName).hover();
  }

  async clickOnMenuItem(itemName: string) {
    await this.locators.getMenuItemLink(itemName).click();
  }

  async clickLogoutMenuItem() {
    await this.locators.getMenuItemLink('Logout').click();
    return new HomePage(this.page);
  }
}

export default Header