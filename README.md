# Zephyr Squad reporter for Playwright

Publish Playwright test run on Zephyr

## Install

```sh
npm i -D playwright-zephyr-squad
```

## Usage

Add **Server** reporter to your `playwright.config.ts` configuration file

```javascript
// playwright.config.ts
{
  ... // <--- others configs
  reporter: [['playwright-zephyr-squad', {
    host: 'https://jira.your-company-domain.com/',
    authorizationToken: 'SVSdrtwgDSA312342--',
    projectKey: 'JARV',
  }]],
}
```
If your test cycle requires custom fields, you can specify them in `testCycle` option:

```javascript
// playwright.config.ts
{
    ... // <--- others configs
    reporter: [
    ['playwright-zephyr-squad', {
      host: 'https://jira.your-company-domain.com/',
      authorizationToken: 'SVSdrtwgDSA312342--',
      projectKey: 'JARV'
      testCycle: {
          name: `Automated Playwright Run - ${new Date().toISOString()}`,
          customFields: {
            Browser: 'Google Chrome',
            Device: 'MacOS',
          },
        },
    }],
  ],
}
```

Others settings types

```typescript
host: string;
projectKey: string;
user?: string;
password?: string;
authorizationToken?: string;
authorizationTokenPrefix?: string;
environment?: string;
queryString?: Record<string, string>;
relativePath?: string;
```

Read how to get Zephyr Squad authorization token [here](https://support.smartbear.com/zephyr-squad-cloud/docs/en/rest-api/generate-api-access-token.html#:~:text=Click%20your%20Jira%20profile%20icon,to%20copy%20the%20access%20token.).

Also, your playwright tests should include unique ID inside square brackets `[J79]` of your Zephyr test case:

```typescript
//      ↓  Zephyr test case ID inside square brackets
test('[J79] basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
```

Then run your tests with `npx playwright test` command and you'll see the result in console:

```sh
✅ Test cycle JARV-C2901 has been created
👇 Check out the test result
🔗 https://jira.your-company-domain.com/secure/Tests.jspa#/testPlayer/JARV-C2901
```

And you'll see the result in the Zephyr:

![alt text](./assets/zephyr-result.png)

## License

playwright-zephyr-squad is [MIT licensed](./LICENSE).

## Author

Guilherme Trocatti <guilhermetrocatti@hotmail.com>
