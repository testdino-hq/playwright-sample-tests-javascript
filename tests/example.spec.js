// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
dotenv.config({ override: true });

let allPages;

test.beforeEach(async ({ page }) => {
  allPages = new AllPages(page);
  await page.goto('/');
});

async function login(username = process.env.USERNAME, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

async function login1(username = process.env.USERNAME1, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

async function logout() {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.clickOnLogoutButton();
}


test('Verify that all the navbar are working properly', {tag: '@webkit'}, async () => {
    await login();
    await allPages.homePage.clickBackToHomeButton();
    // await allPages.homePage.assertHomePage();
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.homePage.clickAboutUsNav();
    await allPages.homePage.assertAboutUsTitle();
}); 

test('Verify that user can edit and delete a product review', {tag: '@chromium'}, async () => {
  await test.step('Login as existing user and navigate to a product', async () => {
    await login();
  })

  await test.step('Navigate to all product section and select a product', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.allProductsPage.clickNthProduct(1);
  })


  await test.step('Submit a product review and verify submission', async () => {
    await allPages.productDetailsPage.clickOnReviewsTab();
    await allPages.productDetailsPage.assertReviewsTab();
    
    await allPages.productDetailsPage.clickOnWriteAReviewBtn();
    await allPages.productDetailsPage.fillReviewForm();
    await allPages.productDetailsPage.assertSubmittedReview({
        name: 'John Doe',
        title: 'Great Product',
        opinion: 'This product exceeded my expectations. Highly recommend!'
    }); 
  })

  await test.step('Navigate and add product to cart before logging in', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickProductImage();
    await allPages.homePage.clickAddToCartButton();
    await allPages.homePage.validateAddCartNotification();
    await allPages.loginPage.clickOnUserProfileIcon();
  })
  await test.step('Login and complete order', async () => {
    await login();
    await allPages.cartPage.clickOnCartIcon();
    await allPages.cartPage.clickOnCheckoutButton();
    await allPages.checkoutPage.verifyCheckoutTitle();
    await allPages.checkoutPage.selectCashOnDelivery();
    await allPages.homePage.clickOnShopNowButton();

    await allPages.checkoutPage.verifyCashOnDeliverySelected();
    await allPages.checkoutPage.clickOnPlaceOrder();
    await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
})
});

test('Verify that user can filter products by price range', {tag: '@firefox'}, async () => {
    await login();
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickOnFilterButton();
    await allPages.homePage.AdjustPriceRangeSlider('10000', '20000');
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickOnFilterButton();
});

test('Verify if user can add product to wishlist, moves it to card and then checks out', {tag: '@firefox'}, async () => {
    await login();
  
    await test.step('Add product to wishlistand then add to cart', async () => {
      await allPages.homePage.clickOnShopNowButton();
      await allPages.inventoryPage.addToWishlist();
      await allPages.inventoryPage.assertWishlistIcon();
      await allPages.inventoryPage.clickOnWishlistIconHeader();
      await allPages.inventoryPage.assertWishlistPage();
      await allPages.inventoryPage.clickOnWishlistAddToCard();
    })
  
    await test.step('Checkout product added to cart', async () => {
      await allPages.cartPage.clickOnCartIcon();
      await allPages.cartPage.clickOnCheckoutButton();
      await allPages.checkoutPage.verifyCheckoutTitle();
      await allPages.checkoutPage.selectCashOnDelivery();
      await allPages.checkoutPage.verifyCashOnDeliverySelected();
      await allPages.homePage.clickOnShopNowButton();
      await allPages.checkoutPage.clickOnPlaceOrder();
      await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
    })
  
});

test('Verify new user views and cancels an order in my orders', {tag: '@firefox'}, async () => {
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

    let productName= `Rode NT1-A Condenser Mic`;

  await test.step('Verify that user can register successfully', async () => {
    await allPages.loginPage.clickOnUserProfileIcon();
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.clickOnSignupLink();
    await allPages.signupPage.assertSignupPage();
    await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
    await allPages.signupPage.verifySuccessSignUp();
  })

  await test.step('Verify that user can login successfully', async () => {
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.login(email, process.env.PASSWORD);
    await allPages.loginPage.verifySuccessSignIn();
    await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
  })

  await test.step('Navigate to All Products and add view details of a random product', async () => {
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();
    productName = await allPages.allProductsPage.getNthProductName(1);
    await allPages.allProductsPage.clickNthProduct(1);
    await allPages.productDetailsPage.clickAddToCartButton();
  })

  await test.step('Add product to cart, add new address and checkout', async () => {
    await allPages.productDetailsPage.clickCartIcon();
    await allPages.cartPage.assertYourCartTitle();
    await expect(allPages.cartPage.getCartItemName()).toContainText(productName, { timeout: 10000 });
    await allPages.cartPage.clickOnCheckoutButton();
    await allPages.checkoutPage.verifyCheckoutTitle();
    await allPages.checkoutPage.fillShippingAddress(
      firstName, email, 'New York', 'New York', '123 Main St', '10001', 'United States'
    );
    await allPages.checkoutPage.clickSaveAddressButton();
    await allPages.checkoutPage.assertAddressAddedToast();
  })

  await test.step('Complete order and verify in my orders', async () => {
    await allPages.checkoutPage.selectCashOnDelivery();
    await allPages.checkoutPage.verifyCheckoutTitle();
    await allPages.checkoutPage.clickOnPlaceOrder();
    await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
    await allPages.inventoryPage.clickOnContinueShopping();

    await allPages.loginPage.clickOnUserProfileIcon();
    await allPages.orderPage.clickOnMyOrdersTab();
    await allPages.orderPage.clickCancelOrderButton();
    await allPages.orderPage.confirmCancellation();
  });
});

test('Verify that the new user is able to Sign Up, Log In, and Navigate to the Home Page Successfully', {tag: '@webkit'}, async () => {
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

  await test.step('Verify that user can register successfully', async () => {
    await allPages.loginPage.clickOnUserProfileIcon();
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.clickOnSignupLink();
    await allPages.signupPage.assertSignupPage();
    await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
    await allPages.signupPage.verifySuccessSignUp();
  })

  await test.step('Verify that user can login successfully', async () => {
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.login(email, process.env.PASSWORD);
    await allPages.loginPage.verifySuccessSignIn();
    await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
  })
})

test('Verify that user is able to fill Contact Us page successfully', {tag: '@webkit'}, async () => {
    await login();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.contactUsPage.fillContactUsForm();
    await allPages.contactUsPage.verifySuccessContactUsFormSubmission();
});

test('Verify that user is able to submit a product review', {tag: '@webkit'}, async () => {
  await test.step('Login as existing user and navigate to a product', async () => {
    await login();
  })

  await test.step('Navigate to all product section and select a product', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.allProductsPage.clickNthProduct(1);
  })

  await test.step('Submit a product review and verify submission', async () => {
    await allPages.productDetailsPage.clickOnReviewsTab();
    await allPages.productDetailsPage.assertReviewsTab();
    
    await allPages.productDetailsPage.clickOnWriteAReviewBtn();
    await allPages.productDetailsPage.fillReviewForm();
    await allPages.productDetailsPage.assertSubmittedReview({
        name: 'John Doe',
        title: 'Great Product',
        opinion: 'This product exceeded my expectations. Highly recommend!'
    });
  })
});