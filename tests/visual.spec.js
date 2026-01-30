// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Visual Comparison – GitHub Username Change', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com/login');

    // Disable animations & caret
    await page.addStyleTag({
      content: `
        * {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `
    });

    await page.waitForLoadState('networkidle');
  });

  test('Visual Comparison @chromium', async ({ page }) => {

    const usernameInput = page.getByRole('textbox', {
      name: 'Username or email address',
    });
    // ✍️ Now change the UI
    await usernameInput.fill('test');

    // 📸 SAME screenshot name → Actual has "test"
    await expect(page).toHaveScreenshot('github-login-username.png', {
      fullPage: true,
    });
  });
});
