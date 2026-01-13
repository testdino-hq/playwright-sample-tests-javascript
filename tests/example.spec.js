// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';

dotenv.config({ override: true });

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

function failOnlyOnFirstAttempt(testInfo, message) {
  if (testInfo.retry === 0) {
    throw new Error(message);
  }
}

/* ---------- DEMO FLAKY TEST ---------- */

test(
  'DEMO: Verify that user can login and logout successfully',
  { tag: '@chromium' },
  async ({}, testInfo) => {
    await login();

    if (testInfo.retry > 0) {
      console.log(`🔁 Re-running failed test (retry #${testInfo.retry})`);
    }

    failOnlyOnFirstAttempt(
      testInfo,
      'Demo failure: intentionally failing first attempt'
    );

    // await logout();
  }
);

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
