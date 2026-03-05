# Ecommerce-demo-test-playwright

Automated end-to-end tests for Ecommerce Demo store using [Playwright](https://playwright.dev/).

---
<p align="left">
  <a href="https://github.com/testdino-hq/playwright-sample-tests-javascript/actions/workflows/test.yml"><img src="https://img.shields.io/github/actions/workflow/status/testdino-hq/playwright-sample-tests-javascript/test.yml?branch=main&label=CI&logo=none" alt="CI Status"></a>
  <a href="https://www.npmjs.com/package/tdpw"><img src="https://img.shields.io/npm/v/tdpw?color=blue" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/tdpw"><img src="https://img.shields.io/npm/unpacked-size/tdpw?color=orange" alt="install size"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License"></a>
</p>


## Project Structure

- `pages/` — Page Object Models
- `tests/` — Test specifications
- `playwright.config.js` — Playwright configuration
- `playwright-report/` — HTML test reports
- `.github/workflows/test.yml` — CI/CD pipeline

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/)

---

## Installation

```sh
npm install
```

---

## Local Test Execution

Run all tests:
```sh
npx playwright test
```

View the HTML report:
```sh
npx playwright show-report
```

---

## Testdino Integration

[Testdino](https://testdino.com/) enables cloud-based Playwright reporting.

### Local Execution

After your tests complete and the report is generated in `playwright-report`, upload it to Testdino:



Replace the token above with your own Testdino API key.

See all available commands:
```sh
npx tdpw --help
```

---

## CI/CD Pipeline Integration

### GitHub Actions

Add the following step to your workflow after tests and report generation:



Ensure your API key is correctly placed in the command.

---

## Continuous Integration

Automated test runs and report merging are configured in `.github/workflows/test.yml`.

---

## Contributing

Pull requests and issues are welcome!

---

## License

