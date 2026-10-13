import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    browserName: 'chromium',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: {
    command: 'pnpm build && pnpm start --hostname 127.0.0.1 --port 3100',
    url: 'http://127.0.0.1:3100',
    timeout: 120_000,
  },
});
