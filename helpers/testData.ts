import { getRandomInt } from "./testUtils.ts";
import dotenv from 'dotenv';
dotenv.config();

export const USER_CREDENTIALS = {
  userName: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string,
};

export const BASE_URL = process.env.BASE_URL as string;
export const ENDPOINTS = {
  productsPage: '/inventory.html',
  itemPage: '/inventory-item.html?id=',
  cartPage: '/cart.html',
  checkoutStepOnePage: '/checkout-step-one.html',
};
export const SAUCELABS_URL = 'https://saucelabs.com/';
export const X_URL = 'https://x.com/saucelabs';
export const FACEBOOK_URL = 'https://www.facebook.com/saucelabs';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/sauce-labs/';
export const SAUCELABS_TITLE = 'Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing';
export const HOME_PAGE_TITLE = 'Swag Labs';
export const FACEBOOK_TITLE = 'Sauce Labs | Facebook';
export const LINKEDIN_TITLE = 'Sauce Labs | LinkedIn';

export const STANDART_COLOR = 'rgb(19, 35, 34)';
export const RED_COLOR = 'rgb(226, 35, 26)';
export const HOVER_COLOR = 'rgb(61, 220, 145)';
export const RANDOM_ITEM = getRandomInt(0, 5);
export const SORTED_ITEMS_PRICES = [7.99, 9.99, 15.99, 15.99, 29.99, 49.99];
export const SORTED_ITEMS_NAMES = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)'
];

export enum SORT_OPTIONS {
  'Name (A to Z)' = 'az',
  'Name (Z to A)' = 'za',
  'Price (low to high)' = 'lohi',
  'Price (high to low)' = 'hilo',
};

export const ITEMS = [
  {
    id: 0,
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    src: '/static/media/bike-light-1200x1500.37c843b0.jpg',
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
  },
  {
    id: 1,
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    src: '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg',
    description: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
  },
  {
    id: 2,
    name: 'Sauce Labs Onesie',
    price: 7.99,
    src: '/static/media/red-onesie-1200x1500.2ec615b2.jpg',
    description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
  },
  {
    id: 3,
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    src: '/static/media/red-tatt-1200x1500.30dadef4.jpg',
    description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
  },
  {
    id: 4,
    name: 'Sauce Labs Backpack',
    price: 29.99,
    src: '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg',
    description: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  },
  {
    id: 5,
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    src: '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg',
    description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
  }
];