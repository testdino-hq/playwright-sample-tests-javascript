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
        loginPageTitle: `//h2[text()=\' Sign In\']`,
        userName: `[placeholder="Your email address"]`,
        password: `[placeholder="Your password"]`,
        loginButton: `//button[text()=\'Sign in\']`,
        invalidLoginError: '[data-test="error"]',
        userIcon: `//*[name()=\'svg\'][.//*[name()=\'path\' and contains(@d,\'M25.1578 1\')]]`,
        logoutButton: `//p[text()=\'Log Out\']`,
        addressTab: `//p[text()=\'Addresses\']`,
        addAddressButton: `//button[text()=\'Add New Address\']`,
        firstName: `[name="firstname"]`,
        lastName: `[name="lastName"]`,
        contactNumber: `[name="contactNumber"]`,
        email: `[name="email"]`,
        address: `[name="street"]`,
        city: `[name="city"]`,
        state: `[name="state"]`,
        country: `[name="country"]`,
        zip: `[name="zipCode"]`,
        saveAddressButton: `//button[text()=\'Save\']`,
        addressLocator: `h3.font-medium`,
        editAddressButton: `(//*[@data-icon=\'edit\'])[1]`,
        deleteAddressButton: `(//*[@data-icon=\'delete\'])[1]`,
        detetebutton: `//button[normalize-space(text())=\'Delete\']`,
        updateAddressButton: `//button[text()=\'Update\']`,
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

    locators = {
        loginPageTitle: `//h2[text()=' Sign In']`,
        userName: `[placeholder="Your email address"]`,
        password: `[placeholder="Your password"]`,
        loginButton: `//button[text()='Sign in']`,
        invalidLoginError: '[data-test="error"]',
        userIcon: `//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]`,
        logoutButton: `//p[text()='Log Out']`,
        lastName: `[name="lastName"]`,
        contactNumber: `[name="contactNumber"]`,
        saveAddressButton: `//button[text()='Save']`,
        addressLocator: `h3.font-medium`,
        editAddressButton: `(//*[@data-icon='edit'])[1]`,
        deleteAddressButton: `(//*[@data-icon='delete'])[1]`,
        detetebutton: `//button[normalize-space(text())='Delete']`,
        updateAddressButton: `//button[text()='Update']`,
        savePersonalInfo:`[aria-label="save"]`,
        securityButton : `//button[text()="Security"]`,
        enterNewPassword : `[placeholder="Enter new password"]`,
        confirmNewPassword : `[placeholder="Confirm your password"]`,
        updatePasswordButton : `[data-testid="my-profile-reset-password-button"]`,
        updateNotification : 'div[role="status"][aria-live="polite"]',
        addressTab : `[data-testid="menu-item-label"]`,
        addAddressButton : `[data-testid="add-new-address-button"]`,
        addNewAddressMenu : `//h2[text()='Add New Address']`,
        addressingFirstName : `[data-testid="first-name-input"]`,
        addressingEmail : `[data-testid="email-input"]`,
        streetAddress : `[data-testid="street-address-input"]`,
        city : `[data-testid="city-input"]`,
        state : `[data-testid="state-input"]`,
        country : `[data-testid="country-input"]`,
        zipCode : `[data-testid="zip-code-input"]`,
        saveAddressButton : `[data-testid="save-address-button"]`
    }
    async clickOnAddressTab() {
        await this.page.locator(this.locators.addressTab).click();
    }
    async clickOnAddAddressButton() {
        await this.page.locator(this.locators.addAddressButton).click();
    }
    async checkAddNewAddressMenu() {
        await expect(this.page.locator(this.locators.addNewAddressMenu)).toBeVisible();
    }
    async fillAddressForm() {
        await this.page.locator(this.locators.adressingFirstName).fill('Tester');
        await this.page.locator(this.locators.adressingEmail).fill('testing123@example.com');
        await this.page.locator(this.locators.streetAddress).fill('SBP, Utran');
        await this.page.locator(this.locators.city).fill('Surat');
        await this.page.locator(this.locators.state).fill('Gujarat');
        await this.page.locator(this.locators.country).fill('India');
        await this.page.locator(this.locators.zipCode).fill('12345');
        await this.page.locator(this.locators.saveAddressButton).click();
    }
    async clickOnSecurityButton() {
        await this.page.locator(this.locators.securityButton).click();
    }
    async enterNewPassword() {
        await this.page.locator(this.locators.enterNewPassword).fill(process.env.NEW_PASSWORD);
    }
    async enterConfirmNewPassword() {
        await this.page.locator(this.locators.confirmNewPassword).fill(process.env.NEW_PASSWORD);
    }
    async clickOnUpdatePasswordButton() {
        await this.page.locator(this.locators.updatePasswordButton).click();
    }
    async revertPasswordBackToOriginal() {
        await this.page.locator(this.locators.enterNewPassword).fill(process.env.PASSWORD);
        await this.page.locator(this.locators.confirmNewPassword).fill(process.env.PASSWORD);
        await this.page.locator(this.locators.updatePasswordButton).click();
    }
    async getUpdatePasswordNotification(){
        await expect(this.page.locator(this.locators.updateNotification)).toBeVisible();
        await expect(this.page.locator(this.locators.updateNotification)).toHaveText('Password updated successfully');
    }


}

export default UserPage;
