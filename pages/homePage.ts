import type { Page } from '@playwright/test';
import ProductsPage from './productsPage.ts';

class HomePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getLoginButton: () => this.page.locator('input#login-button'),
    getUsernameField: () => this.page.getByPlaceholder('Username', { exact: true }),
    getPasswordField: () => this.page.getByPlaceholder('Password', { exact: true }),
    getErrorMessageBlock: () => this.page.locator('div.error-message-container'),
    getErrorIcons: () => this.page.locator('svg.error_icon'),
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async fillUsernameField(userName: string): Promise<void> {
    await this.locators.getUsernameField().fill(userName);
  }

  async fillPasswordField(password: string): Promise<void> {
    await this.locators.getPasswordField().fill(password);
  }

  async clickOnLoginButton(): Promise<ProductsPage> {
    await this.locators.getLoginButton().click();
    return new ProductsPage(this.page);
  }
}

export default HomePage