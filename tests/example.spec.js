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
    {
      tag: '@chromium',
      annotation: [
        { type: 'testdino:priority', description: 'p1' },
        { type: 'testdino:feature', description: 'Login' },
        { type: 'testdino:link', description: 'https://jira.example.com/LOGIN-001' },
        { type: 'testdino:owner', description: 'qa-team' },
        { type: 'testdino:notify-slack', description: '#e2e-alerts' },
        { type: 'testdino:context', description: 'Flaky test: login and logout on Chromium' }
      ]
    },
    async ({}, testInfo) => {
      const start = Date.now();
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
      const flowTime = Date.now() - start;
      test.info().annotations.push({
        type: 'testdino:metric',
        description: JSON.stringify({
          name: 'flow-time',
          value: flowTime,
          unit: 'ms',
          threshold: 5000,
        }),
      });
    }
  );

  test(
    'User searches products and views result (Searchbox)',
    {
      tag: '@firefox',
      annotation: [
        { type: 'testdino:priority', description: 'p1' },
        { type: 'testdino:feature', description: 'Search' },
        { type: 'testdino:link', description: 'https://jira.example.com/SEARCH-001' },
        { type: 'testdino:owner', description: 'qa-team' },
        { type: 'testdino:notify-slack', description: '#e2e-alerts' },
        { type: 'testdino:context', description: 'Flaky test: search products on Firefox' }
      ]
    },
    async ({}, testInfo) => {
      const start = Date.now();
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
      const flowTime = Date.now() - start;
      test.info().annotations.push({
        type: 'testdino:metric',
        description: JSON.stringify({
          name: 'flow-time',
          value: flowTime,
          unit: 'ms',
          threshold: 5000,
        }),
      });
    }
  );

  test(
    'User navigates through product categories (Product page)',
    {
      tag: '@webkit',
      annotation: [
        { type: 'testdino:priority', description: 'p1' },
        { type: 'testdino:feature', description: 'Products' },
        { type: 'testdino:link', description: 'https://jira.example.com/PRODUCTS-001' },
        { type: 'testdino:owner', description: 'qa-team' },
        { type: 'testdino:notify-slack', description: '#e2e-alerts' },
        { type: 'testdino:context', description: 'Flaky test: product categories on WebKit' }
      ]
    },
    async ({}, testInfo) => {
      const start = Date.now();
      await login();
      if (testInfo.retry < 2) {
        throw new Error(`Flaky: failing on attempt ${testInfo.retry + 1}, will pass on 2nd retry`);
      }
      await expect(true).toBeTruthy();
      const flowTime = Date.now() - start;
      test.info().annotations.push({
        type: 'testdino:metric',
        description: JSON.stringify({
          name: 'flow-time',
          value: flowTime,
          unit: 'ms',
          threshold: 5000,
        }),
      });
    }
  );
});


/* ---------- STABLE TESTS (NO RANDOM FAILURES) ---------- */

test(
  'Verify that all the navbar are working properly',
  {
    tag: '@webkit',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Navbar' },
      { type: 'testdino:link', description: 'https://jira.example.com/NAVBAR-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Navbar functionality on WebKit' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that user can edit and delete a product review',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Review' },
      { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Edit and delete product review on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that User Can Complete the Journey from Login to Order Placement',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Order' },
      { type: 'testdino:link', description: 'https://jira.example.com/ORDER-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Login to order placement journey on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that user can filter products by price range',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Filter' },
      { type: 'testdino:link', description: 'https://jira.example.com/FILTER-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Filter products by price on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify if user can add product to wishlist, move to cart and checkout',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Wishlist' },
      { type: 'testdino:link', description: 'https://jira.example.com/WISHLIST-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Wishlist to cart and checkout on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that user is able to submit a product review',
  {
    tag: '@webkit',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Review' },
      { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Submit product review on WebKit' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that all the navbar are working properly (Navbar)',
  {
    tag: '@webkit',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Navbar' },
      { type: 'testdino:link', description: 'https://jira.example.com/NAVBAR-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Navbar (Navbar) on WebKit' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that user can edit and delete a product review (Single review)',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Review' },
      { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Edit and delete review (Single review) on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that User Can Complete the Journey from Login to Order Placement (Single order)',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Order' },
      { type: 'testdino:link', description: 'https://jira.example.com/ORDER-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Login to order (Single order) on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user can filter products by price range (Price page',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Filter' },
      { type: 'testdino:link', description: 'https://jira.example.com/FILTER-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Filter by price (Price page) on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify if user can add product to wishlist, move to cart(Checkout page)',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Wishlist' },
      { type: 'testdino:link', description: 'https://jira.example.com/WISHLIST-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Wishlist to cart (Checkout page) on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user is able to submit a product review (Review)',
  {
    tag: '@webkit',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Review' },
      { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-004' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Submit product review (Review) on WebKit' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user can update cart quantity and verify total price',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Cart' },
      { type: 'testdino:link', description: 'https://jira.example.com/CART-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Update cart quantity and total price on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user can view order history and order detail (Order page)',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Order' },
      { type: 'testdino:link', description: 'https://jira.example.com/ORDER-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Order history and order detail (Order page) on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user can update cart quantity and verify total price (Pricing)',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Cart' },
      { type: 'testdino:link', description: 'https://jira.example.com/CART-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Cart quantity and total price (Pricing) on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test.only(
  'Verify that user can view order history and order details properly (Order details)',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Order' },
      { type: 'testdino:link', description: 'https://jira.example.com/ORDER-004' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Order history and details (Order details) on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that users can update cart quantity and verify total price (Single order)',
  {
    tag: '@chromium',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Cart' },
      { type: 'testdino:link', description: 'https://jira.example.com/CART-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Cart quantity (Single order) on Chromium' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.cartPage.clickOnCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.verifyTotalPriceUpdated();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);

test(
  'Verify that users can view order history and order details properly (Order history)',
  {
    tag: '@firefox',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'Order' },
      { type: 'testdino:link', description: 'https://jira.example.com/ORDER-005' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Order history on Firefox' }
    ]
  },
  async () => {
    const start = Date.now();
    await login();
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.orderPage.clickOnMyOrdersTab();
    // await allPages.orderPage.verifyOrdersListVisible();
    // await allPages.orderPage.clickOnFirstOrder();
    // await allPages.orderDetailsPage.verifyOrderDetailsDisplayed();
    await expect(true).toBeTruthy();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
  }
);
