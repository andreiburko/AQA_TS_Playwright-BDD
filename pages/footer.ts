import type { Page } from '@playwright/test';

class Footer {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locators = {
    getTwitterLink: () => this.page.locator('a[data-test="social-twitter"]'),
    getFacebookLink: () => this.page.locator('a[data-test="social-facebook"]'),
    getLinkedinLink: () => this.page.locator('a[data-test="social-linkedin"]'),
    getFooterText: () => this.page.locator('div[data-test="footer-copy"]'),
  }

  async clickTwitterLink() {
    await this.locators.getTwitterLink().click();
  }

  async clickFacebookLink() {
    await this.locators.getFacebookLink().click();
  }

  async clickLinkedinLink() {
    await this.locators.getLinkedinLink().click();
  }
}

export default Footer