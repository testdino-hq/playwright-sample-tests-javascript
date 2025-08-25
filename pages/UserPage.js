import BasePage from './BasePage.js';
import { expect } from '@playwright/test';

class UserPage extends BasePage {

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
        userIcon: `//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]`,
        logoutButton: `//p[text()='Log Out']`,
        addressTab: `//p[text()='Addresses']`,
        addAddressButton: `//button[text()='Add New Address']`,
        firstName: `[name="firstname"]`,
        lastName: `[name="lastName"]`,
        contactNumber: `[name="contactNumber"]`,
        email: `[name="email"]`,
        address: `[name="street"]`,
        city: `[name="city"]`,
        state: `[name="state"]`,
        country: `[name="country"]`,
        zip: `[name="zipCode"]`,
        saveAddressButton: `//button[text()='Save']`,
        addressLocator: `h3.font-medium`,
        emailLocator: `p.text-gray-500.text-sm`,
        editAddressButton: `(//*[@data-icon='edit'])[1]`,
        deleteAddressButton: `(//*[@data-icon='delete'])[1]`,
        detetebutton: `//button[normalize-space(text())='Delete']`,
        updateAddressButton: `//button[text()='Update']`,
        savePersonalInfo:`[aria-label="save"]`

    }

    async clickOnAddressTab() {
        await this.page.locator(this.locators.addressTab).click();
    }
    async clickOnAddAddressButton() {
        await this.page.locator(this.locators.addAddressButton).click();
    }

    async clickOnUserProfileIcon() {
        await this.page.locator(this.locators.userIcon).click();
    }

    async fillAddressForm() {
        await this.page.locator(this.locators.firstName).fill('ATest');
        await this.page.locator(this.locators.email).fill('john.doe@example.com');
        await this.page.locator(this.locators.address).fill('123 Main St');
        await this.page.locator(this.locators.city).fill('Anytown');
        await this.page.locator(this.locators.state).fill('CA');
        await this.page.locator(this.locators.country).fill('United States');
        await this.page.locator(this.locators.zip).fill('12345');
        await this.page.locator(this.locators.saveAddressButton).click();
    }

    async verifytheAddressIsAdded() {
        const addressLocator = this.page.locator(this.locators.addressLocator);
        const targetAddress = addressLocator.nth(2);
        await expect(targetAddress).toBeVisible();
        await expect(targetAddress).toHaveText("ATest");
    }

    async clickOnEditAddressButton() {
        await this.page.locator(this.locators.editAddressButton).click();
    }

    async updateAddressForm() {
        await this.page.locator(this.locators.firstName).fill('Test1');
        await this.page.locator(this.locators.email).fill('john.doe@example.com');
        await this.page.locator(this.locators.address).fill('123 Main St');
        await this.page.locator(this.locators.city).fill('Anytown');
        await this.page.locator(this.locators.state).fill('CA');
        await this.page.locator(this.locators.country).fill('United States');
        await this.page.locator(this.locators.zip).fill('12345');
        await this.page.locator(this.locators.updateAddressButton).click();
    }

    async verifytheUpdatedAddressIsAdded() {
        const addressLocator = this.page.locator(this.locators.addressLocator);
        const targetAddress = addressLocator.nth(1);
        await expect(targetAddress).toBeVisible();
        await expect(targetAddress).toHaveText("Test1");
    }

    async clickOnDeleteAddressButton() {
        const addressLocator = this.page.locator(this.locators.addressLocator);
        const targetAddress = addressLocator.nth(1);
        await expect(targetAddress).toBeVisible();
        await expect(targetAddress).toHaveText("Test1");
        await this.page.locator(this.locators.deleteAddressButton).click();
        await this.page.locator(this.locators.detetebutton).click();
        await expect(targetAddress).not.toContainText("Test1");
    }
    async updatePersonalInfo() {
        await this.page.locator(this.locators.firstName).fill('Test1');
        await this.page.locator(this.locators.lastName).fill('Testing');
        await this.page.locator(this.locators.contactNumber).fill('9999999999');
        await this.page.locator(this.locators.savePersonalInfo).click();

    }
    async verifyPersonalInfoUpdated() {
        await this.page.reload();
        // Verify the updated values are displayed in the fields
        await expect(this.page.locator(this.locators.firstName)).toHaveValue('Test1');
        await expect(this.page.locator(this.locators.lastName)).toHaveValue('Testing');
        await expect(this.page.locator(this.locators.contactNumber)).toHaveValue('9999999999');
    }

}

export default UserPage;