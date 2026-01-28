# Playwright Test Framework

This repository contains automated tests using Playwright for web application testing.

## Setup

### Prerequisites
- Node.js 18+ (recommended: Node.js 20)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Then fill in your actual values.

5. Verify setup:
   ```bash
   npm run verify
   ```

## Running Tests

### Local Development
```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# Show test report
npm run report
```

### Test Tags
Tests are organized by browser/platform tags:
- `@chromium` - Chrome/Chromium tests
- `@firefox` - Firefox tests  
- `@webkit` - Safari/WebKit tests
- `@android` - Android mobile tests
- `@ios` - iOS mobile tests
- `@api` - API tests

### Environment Variables
Required environment variables (set in `.env` file or GitHub Secrets):

```
USERNAME=your_username
PASSWORD=your_password
NEW_PASSWORD=your_new_password
USERNAME1=your_username1
FIRST_NAME=John
SFIRST_NAME=Jane
STREET_NAME=Main Street
CITY=New York
STATE=NY
COUNTRY=United States
ZIP_CODE=10001
SCITY=Los Angeles
SSTATE=CA
SSTREET_ADD=123 Test Street
SZIP_CODE=90210
SCOUNTRY=United States
TESTDINO_TOKEN=your_testdino_token
```

## CI/CD

The project uses GitHub Actions for continuous integration. Tests run automatically on:
- Push to any branch
- Pull requests
- Scheduled runs (weekdays at 11:00 AM IST)
- Manual workflow dispatch

### GitHub Secrets
Make sure to set these secrets in your GitHub repository:
- `USERNAME`, `PASSWORD`, `NEW_PASSWORD`, `USERNAME1`
- `FIRST_NAME`, `SFIRST_NAME`
- `STREET_NAME`, `CITY`, `STATE`, `COUNTRY`, `ZIP_CODE`
- `SCITY`, `SSTATE`, `SSTREET_ADD`, `SZIP_CODE`, `SCOUNTRY`
- `TESTDINO_TOKEN`

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Run `npm install` to install dependencies
   - Run `npm run install:browsers` to install Playwright browsers

2. **Environment variable errors**
   - Check that `.env` file exists and has all required variables
   - For CI, verify all GitHub Secrets are set

3. **Browser installation issues**
   - Run `npx playwright install --with-deps`
   - On Linux, you may need to install additional system dependencies

4. **Test timeouts**
   - Tests have a 60-second timeout by default
   - Individual actions timeout after 15 seconds
   - Navigation timeouts after 30 seconds

### Debugging
- Use `npm run test:debug` to debug tests step by step
- Use `npm run test:headed` to see tests running in browser
- Check `playwright-report/` for detailed test reports
- Check `test-results/` for screenshots and videos of failed tests

## Project Structure

```
├── tests/                  # Test files
│   ├── product.spec.js     # Product-related tests
│   ├── cart_checkout.spec.js # Cart and checkout tests
│   ├── orders.spec.js      # Order management tests
│   ├── navigation.spec.js  # Navigation tests
│   └── login.spec.js       # Authentication tests
├── pages/                  # Page Object Model files
├── playwright.config.js    # Playwright configuration
├── .github/workflows/      # GitHub Actions workflows
└── .env.example           # Environment variables template
```