import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';

let allPages;

test.beforeEach(async ({ page }) => {
  allPages = new AllPages(page);
  await page.goto('https://github.com/login');
});

test.describe('Visual Comparison', () => {

  test.describe('GitHub Login Page', () => {
    test('visual comparison demo test', {
      tag: ['@visual', '@chromium'],
      annotation: [
        { type: 'testdino:priority', description: 'p1' },
        { type: 'testdino:feature', description: 'Visual' },
        { type: 'testdino:link', description: 'https://jira.example.com/VISUAL-001' },
        { type: 'testdino:owner', description: 'qa-team' },
        { type: 'testdino:notify-slack', description: '#e2e-alerts' },
        { type: 'testdino:context', description: 'Visual comparison demo for GitHub login on Chromium' }
      ]
    }, async ({ page }) => {
      const start = Date.now();
      await page.goto('https://github.com/login');
      await expect(page).toHaveScreenshot('github-login.png');

      await page.getByRole('textbox', { name: 'Username or email address' }).click();
      await page.getByRole('textbox', { name: 'Username or email address' }).fill('test');
      await expect(page).toHaveScreenshot('github-login-changed.png');

      const flowTime = Date.now() - start;
      test.info().annotations.push({
        type: 'testdino:metric',
        description: JSON.stringify({
          name: 'visual-flow-time',
          value: flowTime,
          unit: 'ms',
          threshold: 10000,
        }),
      });
    });
  });
});
