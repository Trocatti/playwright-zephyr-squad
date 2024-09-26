// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['list'], ['./src/index.ts', { 
    host: 'https://prod-api.zephyr4jiracloud.com/connect',
    projectKey: '14683',
    accountId: '712020:7d8fdc76-4c6c-494d-b2f3-7eade2c7a4d7',
    accessKey: 'amlyYTo2ZWY3M2JhMS1kNGI1LTRkMDAtYTZlMi02NTU2YWNkYWE0YzggNzEyMDIwJTNBN2Q4ZmRjNzYtNGM2Yy00OTRkLWIyZjMtN2VhZGUyYzdhNGQ3IFVTRVJfREVGQVVMVF9OQU1F',
    secretKey: 'uAT_2FnBTvw2mvTOssQXF7oRd8dq9jggtq1p7A8ghdA',
  }]],
  use: {
      screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    // {
    //   name: 'Safari',
    //   use: {
    //     browserName: 'webkit',
    //     viewport: { width: 1200, height: 750 },
    //   }
    // },
    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     viewport: { width: 800, height: 600 },
    //   }
    // },
  ],
};
export default config;