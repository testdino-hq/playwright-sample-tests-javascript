import BasePage from './BasePage.js';
import { expect } from '@playwright/test';

class LoginPage extends BasePage{

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.page = page;
    }

    locators = {
        loginPageTitle: `//h2[text()=' Sign In']`,
        userName: `[placeholder="Your email address"]`,
        password: `[placeholder="Your password"]`,
        loginButton: `//button[text()='Sign in']`,
        invalidLoginError: '[data-test="error"]',
        userIcon: `[data-testid="header-user-icon"]`, // Use data-testid for better reliability across devices
        userIconXPath: `//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]`, // Fallback XPath
        logoutButton: `//p[text()='Log Out']`,
        signupLink: `Sign up`,
        successSignInMessage: `Logged in successfully`,
    }

    async navigateToLoginPage() {
        await this.navigateTo('/');
    }

    getLoginPageTitle() {
        return this.page.locator(this.locators.loginPageTitle);
    }

    getUserNameInput() {
        return this.page.locator(this.locators.userName);
    }

    getPasswordInput() {
        return this.page.locator(this.locators.password);
    }

    getLoginButton() {
        return this.page.locator(this.locators.loginButton);
    }

    async clickUserIcon() {
        await this.page.locator(this.locators.userIcon).click();
    }

    async clickOnUserProfileIcon() {
        // Try data-testid first (works on all devices), fallback to XPath if needed
        const userIcon = this.page.locator(this.locators.userIcon).or(this.page.locator(this.locators.userIconXPath));
        // For mobile devices where icon might be hidden, use force click
        // First try normal click, if it fails due to visibility, use force
        try {
            await userIcon.click({ timeout: 5000 });
        } catch (e) {
            // If element is not visible (common on mobile), use force click
            await userIcon.click({ force: true });
        }
    }

    async assertLoginPage() {
        await expect(this.getLoginPageTitle()).toBeVisible();
        await expect(this.getUserNameInput()).toBeVisible();
        await expect(this.getPasswordInput()).toBeVisible();
        await expect(this.getLoginButton()).toBeVisible();
    }

    async login(username, password) {
        await this.page.fill(this.locators.userName, username);
        await this.page.fill(this.locators.password, password);
        await this.page.click(this.locators.loginButton);
        await this.page.waitForTimeout(2000);
    }

    async clickOnLogoutButton() {
        await this.page.locator(this.locators.logoutButton).click();
    }
    async validateSignInPage() {
        await expect(this.getLoginPageTitle()).toBeVisible();
    }

    async clickOnSignupLink() {
        await this.page.getByText(this.locators.signupLink).click();
    }

    async verifySuccessSignIn() {
        await expect(this.page.getByText(this.locators.successSignInMessage)).toBeVisible({ timeout: 10000 });
    }
}

export default LoginPage;