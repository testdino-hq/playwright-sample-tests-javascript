// @ts-check
import { test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login to the application', () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach(async ({ page }) => {
    allPages = new AllPages(page);
  })

  test('Verify that user can login and logout successfully', async ({ page }) => {
    await test.step('Navigate to the login page and login with valid credentials', async () => {
      await page.goto('http://demo.alphabin.co');
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      // await allPages.loginPage.navigateToLoginPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('again navigate to user profile icon and click on logout button', async () => {
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.clickOnLogoutButton();
    })
  })

  test('Verify that User Can Complete the Journey from Login to Order Placement', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('http://demo.alphabin.co');
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Navigate to the product page and add a product to the cart', async () => {
      await allPages.inventoryPage.clickOnShopNowButton();

    })
  })
  test('Verify that User Can Add, Edit, and Delete Addresses after Logging In', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('http://demo.alphabin.co');
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Navigate to the user porifle page and add a new address', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.userPage.clickOnAddressTab();
      await allPages.userPage.clickOnAddAddressButton();
      await allPages.userPage.fillAddressForm();
      await allPages.userPage.verifytheAddressIsAdded();
    })
    await test.step('Navigate to the user porifle page and edit the address', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.userPage.clickOnAddressTab();
      await allPages.userPage.clickOnEditAddressButton();
      await allPages.userPage.updateAddressForm();
      await allPages.userPage.verifytheUpdatedAddressIsAdded();
    })
    await test.step('Navigate to the user porifle page and delete the address', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.userPage.clickOnAddressTab();
      await allPages.userPage.clickOnDeleteAddressButton();
    })
  })
  
  test('Verify that user can update personal information', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('http://demo.alphabin.co');
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Navigate to the user porifle page', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
    })
    await test.step("Update First Name, Last Name, Contact Number and save", async () => {
      await allPages.userPage.updatePersonalInfo();
    })
    await test.step("Verify the updated values are displayed in the fields", async () => {
      await allPages.userPage.verifyPersonalInfoUpdated();
    })
  })
})
