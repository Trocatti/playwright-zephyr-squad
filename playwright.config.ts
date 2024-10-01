// playwright.config.ts
import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['list'], ['./src/index.ts', { 
    host: '',
    accountId: '',
    accessKey: '',
    secretKey: '',
  }]],
  use: {
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
          ...devices['Desktop Chrome']
      }
    }
  ],
};
export default config;
