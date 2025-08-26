import BasePage from './BasePage.js';
import { expect } from '@playwright/test';

class HomePage extends BasePage{

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.page = page;
    }

    locators = {
        navbar: {
            homeNav: `//li[text()="Home"]`,
            aboutUsNav: `//li[text()="About Us"]`,
            contactUsNav: `//li[text()="Contact Us"]`,
            allProductsNav: `//li[text()="All Products"]`,
            showNowButton: `//a[@href="/products"]/button[text()="Shop Now"]`,
        }
    }

    getHomeNav() {
        return this.page.locator(this.locators.navbar.homeNav).first();
    }

    getAboutUsNav() {
        return this.page.locator(this.locators.navbar.aboutUsNav).first();
    }

    getContactUsNav() {
        return this.page.locator(this.locators.navbar.contactUsNav).first();
    }

    getAllProductsNav() {
        return this.page.locator(this.locators.navbar.allProductsNav).first();
    }

    async clickAllProductsNav() {
        await this.getAllProductsNav().click();
    }

    getShowNowButton() {
        return this.page.locator(this.locators.navbar.showNowButton);
    }

}

export default HomePage;