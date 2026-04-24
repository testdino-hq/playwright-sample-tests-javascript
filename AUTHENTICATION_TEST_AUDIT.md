# Authentication Test Code Audit

**Project:** Sandbox Store (`project_68ac45e21956c21bcc3b5d9f`)
**Organization:** Sandbox Organization (`org_68ac45bc1956c21bcc3b5d7b`)
**Date:** 2026-04-24
**Scope:** `tests/login.spec.js`, `pages/LoginPage.js`, `pages/SignupPage.js`, related config — cross-checked against TestDino history (last ~30 days).

---

## 1. TestDino Runtime Signal (last 30 days)

| Test | Executions | Passed | Failed | Flaky | Verdict |
|---|---|---|---|---|---|
| `Verify that user can login and logout successfully` | 19 | 8 | 0 | **10** | Stable on retry, but flaky signal is **synthetic** |
| `Verify that the new user is able to Sign Up, Log In, and Navigate to the Home Page Successfully` | 18 | 18 | 0 | 0 | **Green but vacuous** (test body commented out) |

Flake root cause (TestDino `errorCategory: timing_related`):

```text
Error: Flaky: failing on attempt 1, will pass on 2nd retry
  at tests/cart_checkout.spec.js:45:15
```

This was an artificial throw previously injected in `cart_checkout.spec.js`. It is **no longer present** in the current `cart_checkout.spec.js` (lines 41-46 are now an unrelated `Order Cancellation` block). So the historical "flaky" attribution to the login test is a side effect of an old neighboring spec, not a real auth flake. **No genuine login failure exists in TestDino history.**

---

## 2. Code-Level Findings

### Severity: HIGH

#### H1. Signup test is a no-op

`tests/login.spec.js:33-54` — Every line of the body is commented out, including the assertion of `getHomeNav()`. TestDino reports 18/18 passes and ~2 s duration (just `goto('/')`). False-positive coverage.

```js
test.describe('Signup & Login Flow', () => {
  test('Verify that the new user is able to Sign Up, Log In, and Navigate to the Home Page Successfully ',{tag: '@chromium'} , async () => {
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

    await test.step('Verify that user can register successfully', async () => {
      // await allPages.loginPage.clickOnUserProfileIcon();
      // ...
    });
    // await test.step('Verify that user can login successfully', async () => { ... });
  });
});
```

#### H2. Login & Logout test never asserts that login succeeded

It opens the user menu, checks the Sign In page is visible, fills creds, then clicks the menu and `Log Out`. The post-login state (`verifySuccessSignIn()` / dashboard nav) is defined in the page object but never invoked. A silently broken auth flow could click Logout on an unauthenticated state and still pass.

#### H3. `process.env.USERNAME` / `PASSWORD` have no validation

`playwright.config.js` loads `dotenv` but nothing fails fast if creds are missing. `LoginPage.login()` would `fill('')` and the test could still pass logout, since logout button XPath would not be present — but a flake-prone failure mode exists.

---

### Severity: MEDIUM

#### M1. Hardcoded `waitForTimeout(2000)`

In `LoginPage.login()` and `SignupPage.signup()`. Explicit waits are an anti-pattern, the very root cause TestDino flags as `timing_related`. Replace with `expect(...).toBeVisible()` for a post-state element.

```js
async login(username, password) {
    await this.page.fill(this.locators.userName, username);
    await this.page.fill(this.locators.password, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForTimeout(2000);
}
```

#### M2. Brittle locators in `LoginPage`

- `//h2[text()=' Sign In']` and `//button[text()='Sign in']` — match exact text including a leading space; UI text/whitespace tweak breaks them.
- `userIcon: //*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]` — depends on raw SVG path coordinates. Any icon redesign breaks login.
- `signupLink: 'Sign up'` used via `getByText` with no `exact: true` — risk of multiple matches.

```js
locators = {
    loginPageTitle: `//h2[text()=' Sign In']`,
    userName: `[placeholder="Your email address"]`,
    password: `[placeholder="Your password"]`,
    loginButton: `//button[text()='Sign in']`,
    invalidLoginError: '[data-test="error"]',
    userIcon: `//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]`,
    logoutButton: `//p[text()='Log Out']`,
    signupLink: `Sign up`,
    successSignInMessage: `Logged in successfully`,
}
```

#### M3. `retries: 1` everywhere (CI and local)

Masks real flakiness on first run. Combined with finding H2 (no positive assertion), regressions can hide. TestDino classified 10/19 runs of the login test as "flaky" — even though the actual cause was a neighboring spec, the retry policy + missing assertions made it invisible.

#### M4. TestDino reporter is commented out

In `playwright.config.js:30`. The `@testdino/playwright` reporter is the supported feed; right now data is arriving via some other path. Re-enable for richer artifact context (screenshots/video/trace are currently `Not Enabled` in the historical attempts).

```js
// ['@testdino/playwright', { token: process.env.TESTDINO_TOKEN }],
```

---

### Severity: LOW

#### L1. Dead/duplicated code in `LoginPage.js`

`clickUserIcon()` and `clickOnUserProfileIcon()` are identical; `assertLoginPage()` is unused (only the lighter `validateSignInPage` is called).

#### L2. Module-level mutable `let allPages` in spec

Works in Playwright (one worker runs file tests serially) but is an anti-pattern. Prefer a fixture or local `const` inside each test.

#### L3. Naming inconsistency

`successSignInMessage` is a content string, not a selector, but lives in the `locators` map. Move to a `messages` map or use an explicit `getByText`.

---

## 3. Coverage Gaps

| Area | Status | Note |
|---|---|---|
| Valid login | Partial | Asserted only via Sign In page visibility, not post-login state |
| Logout | Yes | But asserts nothing afterwards |
| Invalid credentials | **Missing** | `invalidLoginError` locator is defined but never exercised |
| Signup happy path | **Disabled** | All steps commented out |
| Signup with existing email / weak password / missing fields | **Missing** | |
| Forgot password / password visibility toggle / "remember me" | **Missing** | |
| Logout then access protected route | **Missing** | |
| Cross-browser (firefox/webkit/mobile) | **Missing** | Auth tests only tagged `@chromium` |
| Session persistence across reloads | **Missing** | |

---

## 4. Recommended Fixes (priority order)

1. **Restore the signup test body** (uncomment) and add a hard assertion: `await expect(allPages.homePage.getHomeNav()).toBeVisible();`. Without this, the test is providing zero coverage.
2. **In the Login & Logout test, assert post-login state** with `await allPages.loginPage.verifySuccessSignIn();` (or assert home nav) **before** logout, and assert the Sign In page is visible **after** logout.
3. **Remove `await this.page.waitForTimeout(2000)`** from `LoginPage.login()` and `SignupPage.signup()`; replace with `await expect(this.page.getByText('Logged in successfully')).toBeVisible()` or equivalent post-state.
4. **Add `globalSetup`** (or a top-of-file guard) that throws if `process.env.USERNAME` / `PASSWORD` are missing.
5. **Replace XPath-by-text and SVG-path locators** with stable `data-test`/`data-testid` hooks, or `getByRole('button', { name: /sign in/i })`.
6. **Add a negative-path test** for invalid credentials that asserts `invalidLoginError`.
7. **Re-enable the `@testdino/playwright` reporter** so future audits have screenshots / videos / traces (current attempts show `source: "disabled"`).
8. **Reduce `retries` to `0` locally** (keep `1` in CI only) so genuine flakes surface during development.
9. **Tag at least one auth smoke test** for `@firefox` and `@webkit` to catch browser-specific auth regressions.

---

## 5. TL;DR

Auth tests have a clean run history in TestDino, but that signal is misleading:

- The **signup test executes nothing** (body fully commented out).
- The **login test never asserts the post-login state**.
- Historical "flaky" attribution traces back to a synthetic throw in `cart_checkout.spec.js` (now removed) — not a real auth issue.

The biggest risk is **silent false-positive coverage**, not flakiness. Fix items 1–4 above first.

---

## Appendix: Source References

- Test spec: `tests/login.spec.js`
- Page objects: `pages/LoginPage.js`, `pages/SignupPage.js`, `pages/BasePage.js`, `pages/AllPages.js`
- Config: `playwright.config.js`
- TestDino tools used: `health`, `debug_testcase`, `list_testcase`
