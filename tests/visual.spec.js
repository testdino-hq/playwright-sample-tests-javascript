// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Visual Comparison – GitHub Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com/login');

    // 🔒 Disable animations, transitions & caret blinking
    await page.addStyleTag({
      content: `
        * {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `
    });

    // ⏳ Ensure fonts & layout are fully settled
    await page.waitForLoadState('networkidle');
  });

  test('GitHub login page visual comparison (stable)', async ({ page }) => {

    // 📸 1️⃣ Baseline screenshot (no interaction)
    await expect(page).toHaveScreenshot('github-login-initial.png', {
      fullPage: true,
    });

    // ✍️ 2️⃣ Type username (dynamic element)
    const usernameInput = page.getByRole('textbox', {
      name: 'Username or email address',
    });

    await usernameInput.fill('test');

    // 📸 3️⃣ Screenshot AFTER typing — mask the input field
    await expect(page).toHaveScreenshot('github-login-after-typing.png', {
      fullPage: true,
      mask: [usernameInput],
    });
  });
});
