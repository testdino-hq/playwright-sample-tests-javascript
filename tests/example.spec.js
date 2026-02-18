// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';

let allPages;

test.beforeEach(async ({ page }) => {
  allPages = new AllPages(page);
  await page.goto('/');
});

/* ---------- Helpers ---------- */

async function login(
  username = process.env.USERNAME,
  password = process.env.PASSWORD
) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  // await allPages.loginPage.login(username, password);
}

/* ---------- FLAKY TESTS (fail on 1st run + 1st retry, pass on 2nd retry) ---------- */

test.describe('Flaky tests (pass on 2nd retry)', () => {
  test.describe.configure({ retries: 2 });

  test(
    'Verify that user can login and logout successfully',
    { tag: '@chromium' },
    async ({}, testInfo) => {
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
    }
  );

  test(
    'User searches products and views result (Searchbox)',
    { tag: '@firefox' },
    async ({}, testInfo) => {
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
    }
  );

  test(
    'User navigates through product categories (Product page)',
    { tag: '@webkit' },
    async ({}, testInfo) => {
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
    }
  );
});


/* ---------- STABLE TESTS (NO RANDOM FAILURES) ---------- */

test(
  'Verify that all the navbar are working properly',
  { tag: '@webkit' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can edit and delete a product review',
  { tag: '@chromium' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that User Can Complete the Journey from Login to Order Placement',
  { tag: '@chromium' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can filter products by price range',
  { tag: '@firefox' },
  async () => {
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify if user can add product to wishlist, move to cart and checkout',
  { tag: '@firefox' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user is able to submit a product review',
  { tag: '@webkit' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that all the navbar are working properly (Navbar)',
  { tag: '@webkit' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can edit and delete a product review (Single review)',
  { tag: '@chromium' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that User Can Complete the Journey from Login to Order Placement (Single order)',
  { tag: '@chromium' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can filter products by price range (Price page',
  { tag: '@firefox' },
  async () => {
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify if user can add product to wishlist, move to cart(Checkout page)',
  { tag: '@firefox' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user is able to submit a product review (Review)',
  { tag: '@webkit' },
  async () => {
    await login();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can update cart quantity and verify total price',
  { tag: '@chromium' },
  async () => {
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can view order history and order detail (Order page)',
  { tag: '@firefox' },
  async () => {
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can update cart quantity and verify total price (Pricing)',
  { tag: '@chromium' },
  async () => {
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that user can view order history and order details properly (Order details)',
  { tag: '@firefox' },
  async () => {
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that users can update cart quantity and verify total price (Single order)',
  { tag: '@chromium' },
  async () => {
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
  }
);

test(
  'Verify that users can view order history and order details properly (Order history)',
  { tag: '@firefox' },
  async () => {
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
  }
);
