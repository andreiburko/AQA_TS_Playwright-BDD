import { test as base, createBdd } from 'playwright-bdd';
import CartPage from './cartPage.ts';
import CheckoutStepOnePage from './checkoutStepOnePage.ts';
import Footer from './footer.ts';
import Header from './header.ts';
import HomePage from './homePage.ts';
import ItemPage from './itemPage.ts';
import ProductsPage from './productsPage.ts';

type myFixtures = {
  cartPage: CartPage,
  checkoutStepOnePage: CheckoutStepOnePage,
  footer: Footer,
  header: Header,
  homePage: HomePage,
  itemPage: ItemPage,
  productsPage: ProductsPage,
};

export const test = base.extend<myFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },

  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  itemPage: async ({ page }, use) => {
    await use(new ItemPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);