// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: isCI,

  // ✅ Retries set to 2
  retries: 2,

  workers: isCI ? 1 : 1,

  timeout: 30 * 1000,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['blob', { outputDir: 'blob-report' }], // Blob reporter for merging
    ['json', { outputFile: './playwright-report/report.json' }],
  ],

  use: {
    baseURL: 'https://storedemo.testdino.com/',
    headless: true,

    // ✅ Always capture debugging artifacts
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grep: /@chromium/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grep: /@firefox/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@webkit/,
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
      grep: /@android/,
    },
    {
      name: 'ios',
      use: { ...devices['iPhone 12'] },
      grep: /@ios/,
    },
    {
      name: 'api',
      grep: /@api/,
    },
  ],
});
