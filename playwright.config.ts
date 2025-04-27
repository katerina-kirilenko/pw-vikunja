import { defineConfig, devices } from "@playwright/test";
import * as os from "node:os";
import { URLs } from "./src/types";
import * as dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 50000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list", { printSteps: true }],
    ["html"],
    [
      "allure-playwright",
      {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
  globalSetup: require.resolve("./global-setup"),
  /* Configure projects for major browsers */
  projects: [
    {
      name: "ui-tests",
      testDir: "./e2e/ui",
      use: {
        baseURL: URLs.ui,
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "api-tests",
      testDir: "./e2e/api",
      use: {
        baseURL: URLs.api,
        extraHTTPHeaders: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    },
  ],
  outputDir: "test-results/",
});
