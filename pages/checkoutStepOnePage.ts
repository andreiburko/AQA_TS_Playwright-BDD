import type { Page } from "@playwright/test";

class CheckoutStepOnePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getTitle: () => this.page.locator('span[data-test="title"]'),
  }
}

export default CheckoutStepOnePage