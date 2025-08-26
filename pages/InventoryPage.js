import BasePage from './BasePage';
import { expect } from '@playwright/test';

class InventoryPage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
    }

    locators = {
        shopNowBtn: `(//button[text()='Shop Now'])[1]`,
        allProductsTitle: `//h1[text()='All Products']`,
        searchProductInput: `input[placeholder='Search products...']`,
        selectProduct: `[class="relative pt-4 px-4"]`,
        productTitle: `(//h1[text()='JBL Charge 4 Bluetooth Speaker'])[1]`,
        wishlistIcon: `//button[.//span[@aria-label='heart']]`,
        allProductsLink: "(//li[normalize-space()='All Products'])[1]",
        addToCartIcon: "//*[name()='svg'][.//*[name()='path' and contains(@d,'M832 312H6')]]",
        goProHero10BlackTitle: "//h2[normalize-space()='GoPro HERO10 Black']",
        continueShoppingButton: "//button[normalize-space()='Continue Shopping']",

    }

    async clickOnShopNowButton() {
        await this.page.click(this.locators.shopNowBtn);
        await expect(this.page.locator(this.locators.allProductsTitle)).toBeVisible();
    }
    async searchProduct(productName) {
        await this.page.fill(this.locators.searchProductInput, productName);
        await this.page.keyboard.press('Enter');
    }
    async selectProduct() {
        await this.page.click(this.locators.selectProduct);
        await expect(this.page.locator(this.locators.productTitle)).toBeVisible();
    }
    async addToWishlist() {
        await this.page.click(this.locators.wishlistIcon);
        // Add any additional assertions or actions needed after adding to wishlist
    }

    async clickOnAllProductsLink() {
        await this.page.locator(this.locators.allProductsLink).click({ force: true });
    }

    async clickOnAddToCartIcon() {
        await this.page.locator(this.locators.addToCartIcon).click({ force: true });
    }

    async verifyProductTitleVisible(productName) {
        await expect(this.page.locator(`//h2[normalize-space()='${productName}']`)).toHaveText(productName);
    }

    async clickOnContinueShopping() {
        await this.page.locator(this.locators.continueShoppingButton).click({ force: true });
    }

}

export default InventoryPage;