import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: false,
  workers: 1,
  retries: 0,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    headless: true,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },

    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
        channel: 'chrome',
      },
    },

    {
      name: 'Mobile Edge',
      use: {
        ...devices['Pixel 7'],
        channel: 'msedge',
      },
    },
  ],
});