import { Given, When } from '../../pages/fixtures.ts';
import { BASE_URL,
        USER_CREDENTIALS } from "../../helpers/testData.ts";

Given('User opens Home page', async ({ homePage }) => {
  await homePage.open(BASE_URL);
});

When('User fills Username field with correct user name', async ({ homePage }) => {
  await homePage.fillUsernameField(USER_CREDENTIALS.userName);
});

When('User fills Password field with correct password', async ({ homePage }) => {
  await homePage.fillPasswordField(USER_CREDENTIALS.password);
});

When('User clicks on Login button', async ({ homePage }) => {
  await homePage.clickOnLoginButton();
});

When('Users data saves to sate.json file', async ({ page }) => {
  await page.context().storageState({ path: 'state.json' });
});