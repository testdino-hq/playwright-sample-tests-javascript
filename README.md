# playwright-sample-tests

Automated end-to-end tests for [Alphabin Demo](https://demo.alphabin.co/) using [Playwright](https://playwright.dev/).

---

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

```sh
npx --yes tdpw ./playwright-report --token="your-token" --upload-html
```

Replace the token above with your own Testdino API key.

See all available commands:
```sh
npx tdpw --help
```

---

## CI/CD Pipeline Integration

### GitHub Actions

Add the following step to your workflow after tests and report generation:

```yaml
- name: Send Testdino report
  run: |
    npx --yes tdpw ./playwright-report --token="trx_production_035e6ed4a1a2be1f5a10eb45b837afa25b2740cc8b94ff8baca31ee3fe5e2d15" --upload-html
```

Ensure your API key is correctly placed in the command.

---

## Continuous Integration

Automated test runs and report merging are configured in `.github/workflows/test.yml`.

---

## Contributing

Pull requests and issues are welcome!

---

## License

MIT
