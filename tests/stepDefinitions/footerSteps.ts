import { expect, Page } from '@playwright/test';
import { When, Then } from '../../pages/fixtures.ts';
import { FACEBOOK_TITLE, 
        FACEBOOK_URL, 
        LINKEDIN_TITLE, 
        LINKEDIN_URL, 
        X_URL } from '../../helpers/testData.ts';

let pageTwitter: Page;
let pageFacebook: Page;
let pageLinkedin: Page;

//Scenario: The X social network page opens in new tab when user clicks on Twitter icon
When('User clicks on Twitter icon', async ({ page, footer }) => {
  const pageTwitterPromise = page.waitForEvent('popup');
  await footer.clickTwitterLink();
  pageTwitter = await pageTwitterPromise;
});

Then('The X page opens in new tab', async ({ page }) => {
  expect(pageTwitter.url()).toContain(X_URL);
});

//Scenario: The Facebook social network page opens in new tab when user clicks on Facebook icon
When('User clicks on Facebook icon', async ({ page, footer }) => {
  const pageFacebookPromise = page.waitForEvent('popup');
  await footer.clickFacebookLink();
  pageFacebook = await pageFacebookPromise;
});

Then('The Facebook page opens in new tab', async ({ page }) => {
  await expect(pageFacebook).toHaveURL(FACEBOOK_URL);
  await expect(pageFacebook).toHaveTitle(FACEBOOK_TITLE);
});

//Scenario: The LinkedIn social network page opens in new tab when user clicks on LinkedIn icon
When('User clicks on LinkedIn icon', async ({ page, footer }) => {
  const pageLinkedinPromise = page.waitForEvent('popup');
  await footer.clickLinkedinLink();
  pageLinkedin = await pageLinkedinPromise;
});

Then('The LinkedIn page opens in new tab', async ({ page }) => {
  await expect(pageLinkedin).toHaveURL(LINKEDIN_URL);
  await expect(pageLinkedin).toHaveTitle(LINKEDIN_TITLE);
});

//Scenario: Footer contains copy information
Then('User sees {string} text', async ({ footer }, text: string) => {
  await expect(footer.locators.getFooterText()).toHaveText(text);
});