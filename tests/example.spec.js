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

test('Verify that user can log in and log out successfully', {
  tag: '@android',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Login' },
    { type: 'testdino:link', description: 'https://jira.example.com/LOGIN-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Login and logout on Android' }
  ]
}, async () => {
  const start = Date.now();
  await login();
  await logout();
  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that all navbar links work properly', {
  tag: '@webkit',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Navbar' },
    { type: 'testdino:link', description: 'https://jira.example.com/NAVBAR-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Navbar functionality on WebKit' }
  ]
}, async () => {
    const start = Date.now();
    // await login();
    await allPages.homePage.clickBackToHomeButton();
    // await allPages.homePage.assertHomePage();
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.homePage.clickAboutUsNav();
    await allPages.homePage.assertAboutUsTitle();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
});

test('Verify that user can edit and delete a product review', {
  tag: '@firefox',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Review' },
    { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Edit and delete product review on Firefox' }
  ]
}, async () => {
  const start = Date.now();
  await test.step('Login as existing user and navigate to a product', async () => {
    // await login();
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

  await test.step('Edit the submitted review and verify changes', async () => {
    await allPages.productDetailsPage.clickOnEditReviewBtn();
    await allPages.productDetailsPage.updateReviewForm();
    await allPages.productDetailsPage.assertUpdatedReview({
        title: 'Updated Review Title',
        opinion: 'This is an updated review opinion.'
    })
    });

  await test.step('Delete the submitted review and verify deletion', async () => {
    await allPages.productDetailsPage.clickOnDeleteReviewBtn();
  });

  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that user can complete the journey from login to order placement', {
  tag: '@ios',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Order' },
    { type: 'testdino:link', description: 'https://jira.example.com/ORDER-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Login to order placement journey on iOS' }
  ]
}, async () => {
  const start = Date.now();
  const productName = 'GoPro HERO10 Black';
  // await login();
  await allPages.inventoryPage.clickOnShopNowButton();
  await allPages.inventoryPage.clickOnAllProductsLink();
  await allPages.inventoryPage.searchProduct(productName);
  await allPages.inventoryPage.verifyProductTitleVisible(productName);
  await allPages.inventoryPage.clickOnAddToCartIcon();

  // await allPages.cartPage.clickOnCartIcon();
  // await allPages.cartPage.verifyCartItemVisible(productName);
  // await allPages.cartPage.clickOnCheckoutButton();
  // await allPages.checkoutPage.verifyCheckoutTitle();
  // await allPages.checkoutPage.verifyProductInCheckout(productName);
  // await allPages.checkoutPage.selectCashOnDelivery();
  // await allPages.checkoutPage.verifyCashOnDeliverySelected();
  // await allPages.checkoutPage.clickOnPlaceOrder();
  // await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that a new user can complete the journey from registration to a single order placement', {
  tag: '@android',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Registration' },
    { type: 'testdino:link', description: 'https://jira.example.com/REG-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Registration to single order on Android' }
  ]
}, async () => {
  const start = Date.now();
  // fresh test data
  const email = `test+${Date.now()}@test.com`;
  const firstName = 'Test';
  const lastName = 'User';

  let productName;
  let productPrice;
  let productReviewCount;

  await test.step('Verify that user can register successfully', async () => {
    // await allPages.loginPage.clickOnUserProfileIcon();
    // await allPages.loginPage.validateSignInPage();
    // await allPages.loginPage.clickOnSignupLink();
    // await allPages.signupPage.assertSignupPage();
    // await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
    // await allPages.signupPage.verifySuccessSignUp();
  })

  await test.step('Verify that user can login successfully', async () => {
    // await allPages.loginPage.validateSignInPage();
    // await allPages.loginPage.login(email, process.env.PASSWORD);
    // await allPages.loginPage.verifySuccessSignIn();
    // await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
  })

  await test.step('Navigate to all product and add to wishlist section', async () => {
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();

    productName = await allPages.allProductsPage.getNthProductName(1);
    productPrice = await allPages.allProductsPage.getNthProductPrice(1);
    productReviewCount = await allPages.allProductsPage.getNthProductReviewCount(1);

    await allPages.allProductsPage.clickNthProductWishlistIcon(1);
    await expect(allPages.allProductsPage.getNthProductWishlistIconCount(1)).toContainText('1');
    await allPages.allProductsPage.clickNthProduct(1);

    await allPages.productDetailsPage.assertProductNameTitle(productName);
    await allPages.productDetailsPage.assertProductPrice(productName, productPrice);
    await allPages.productDetailsPage.assertProductReviewCount(productName, productReviewCount);
    await expect(allPages.allProductsPage.getNthProductWishlistIconCount(1)).toContainText('1');
  })

  await test.step('Add product to cart, add new address and checkout', async () => {
    await allPages.productDetailsPage.clickAddToCartButton();

    // await allPages.productDetailsPage.clickCartIcon();
    // await allPages.cartPage.assertYourCartTitle();
    // await expect(allPages.cartPage.getCartItemName()).toContainText(productName, { timeout: 10000 });
    // await expect(allPages.cartPage.getCartItemPrice()).toContainText(productPrice);
    // await expect(allPages.cartPage.getCartItemQuantity()).toContainText('1');
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await expect(allPages.cartPage.getCartItemQuantity()).toContainText('2');

    // const cleanPrice = productPrice.replace(/[₹,]/g, '');
    // const priceValue = parseFloat(cleanPrice) * 2;
    // await expect(allPages.cartPage.getTotalValue()).toContainText(
    //   priceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // );
    // await allPages.cartPage.clickOnCheckoutButton();

    // // Fill shipping address and save
    // await allPages.checkoutPage.verifyCheckoutTitle();
    // await allPages.checkoutPage.fillShippingAddress(
    //   firstName, email, 'New York', 'New York', '123 Main St', '10001', 'United States'
    // );
    // await allPages.checkoutPage.clickSaveAddressButton();
    // await allPages.checkoutPage.assertAddressAddedToast();

    // // COD, verify summary, place order
    // await allPages.checkoutPage.selectCashOnDelivery();
    // await allPages.checkoutPage.verifyCheckoutTitle();
    // await allPages.checkoutPage.assertOrderSummaryTitle();
    // await expect(allPages.checkoutPage.getOrderSummaryImage()).toBeVisible();
    // await expect(allPages.checkoutPage.getOrderSummaryProductName()).toContainText(productName);
    // await allPages.checkoutPage.verifyProductInCheckout(productName);
    // await expect(allPages.checkoutPage.getOrderSummaryProductQuantity()).toContainText('2');
    // await expect(allPages.checkoutPage.getOrderSummaryProductPrice()).toContainText(productPrice);

    // const subtotalValue = parseFloat(cleanPrice) * 2;
    // const formattedSubtotal = subtotalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // await expect(await allPages.checkoutPage.getOrderSummarySubtotalValue()).toContain(formattedSubtotal);
    // await expect(allPages.checkoutPage.getOrderSummaryShippingValue()).toContainText('Free');
    // await allPages.checkoutPage.clickOnPlaceOrder();

    // // Order details and return to home
    // await allPages.orderDetailsPage.assertOrderDetailsTitle();
    // await allPages.orderDetailsPage.assertOrderPlacedName();
    // await allPages.orderDetailsPage.assertOrderPlacedMessage();
    // await allPages.orderDetailsPage.assertOrderPlacedDate();
    // await allPages.orderDetailsPage.assertOrderInformationTitle();
    // await allPages.orderDetailsPage.assertOrderConfirmedTitle();
    // await allPages.orderDetailsPage.assertOrderConfirmedMessage();
    // await allPages.orderDetailsPage.assertShippingDetailsTitle();
    // await allPages.orderDetailsPage.assertShippingEmailValue(email);
    // await allPages.orderDetailsPage.assertPaymentMethodAmount(formattedSubtotal);
    // await allPages.orderDetailsPage.assertDeliveryAddressLabel();
    // await allPages.orderDetailsPage.assertDeliveryAddressValue();
    // await allPages.orderDetailsPage.assertContinueShoppingButton();

    // await allPages.orderDetailsPage.assertOrderSummaryTitle();
    // await allPages.orderDetailsPage.assertOrderSummaryProductName(productName);
    // await allPages.orderDetailsPage.assertOrderSummaryProductQuantity('2');
    // await allPages.orderDetailsPage.assertOrderSummaryProductPrice(productPrice);
    // await allPages.orderDetailsPage.assertOrderSummarySubtotalValue(formattedSubtotal);
    // await allPages.orderDetailsPage.assertOrderSummaryShippingValue('Free');
    // await allPages.orderDetailsPage.assertOrderSummaryTotalValue(formattedSubtotal);
    // await allPages.orderDetailsPage.clickBackToHomeButton();
  });

  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that user can add product to cart before logging in and complete order after logging in', {
  tag: '@webkit',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Cart' },
    { type: 'testdino:link', description: 'https://jira.example.com/CART-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Add to cart before login, order after login on WebKit' }
  ]
}, async () => {
  const start = Date.now();
  await test.step('Navigate and add product to cart before logging in', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickProductImage();
    await allPages.homePage.clickAddToCartButton();
    await allPages.homePage.validateAddCartNotification();
    // await allPages.loginPage.clickOnUserProfileIcon();
  })
  // await test.step('Login and complete order', async () => {
//     await login();
//     await allPages.cartPage.clickOnCartIcon();
//     await allPages.cartPage.clickOnCheckoutButton();
//     await allPages.checkoutPage.verifyCheckoutTitle();
//     await allPages.checkoutPage.selectCashOnDelivery();
//     await allPages.checkoutPage.verifyCashOnDeliverySelected();
//     await allPages.checkoutPage.clickOnPlaceOrder();
//     await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
// })
  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that user can filter products by price range', {
  tag: '@filter',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Filter' },
    { type: 'testdino:link', description: 'https://jira.example.com/FILTER-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Filter products by price range' }
  ]
}, async () => {
    const start = Date.now();
    await login();
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickOnFilterButton();
    await allPages.homePage.AdjustPriceRangeSlider('10000', '20000');
    await allPages.homePage.clickOnFilterButton();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
});

test('Verify that user can add product to wishlist, move it to cart, and checkout', {
  tag: '@wishlist',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Wishlist' },
    { type: 'testdino:link', description: 'https://jira.example.com/WISHLIST-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Wishlist to cart and checkout' }
  ]
}, async () => {
    const start = Date.now();
    // await login();
  
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
      // await allPages.cartPage.clickOnCheckoutButton();
      // await allPages.checkoutPage.verifyCheckoutTitle();
      // await allPages.checkoutPage.selectCashOnDelivery();
      // await allPages.checkoutPage.verifyCashOnDeliverySelected();
      // await allPages.checkoutPage.clickOnPlaceOrder();
      // await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
    });

    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
});

test.describe('Orders Module', () => {
  test.describe('Order Cancellation', () => {
    test('Verify that new user can view and cancel an order in My Orders', {
      tag: '@chromium',
      annotation: [
        { type: 'testdino:priority', description: 'p0' },
        { type: 'testdino:feature', description: 'Orders' },
        { type: 'testdino:link', description: 'https://jira.example.com/ORDER-002' },
        { type: 'testdino:owner', description: '@Kriti Verma' },
        { type: 'testdino:notify-slack', description: '@Kriti Verma' },
        { type: 'testdino:context', description: 'Critical order cancellation flow for new users' }
      ]
    }, async () => {
    const start = Date.now();
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

    let productName= `Rode NT1-A Condenser Mic`;

  // await test.step('Verify that user can register successfully', async () => {
  //   await allPages.loginPage.clickOnUserProfileIcon();
  //   await allPages.loginPage.validateSignInPage();
  //   await allPages.loginPage.clickOnSignupLink();
  //   await allPages.signupPage.assertSignupPage();
  //   await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
  //   await allPages.signupPage.verifySuccessSignUp();
  // })

  // await test.step('Verify that user can login successfully', async () => {
  //   await allPages.loginPage.validateSignInPage();
  //   await allPages.loginPage.login(email, process.env.PASSWORD);
  //   await allPages.loginPage.verifySuccessSignIn();
  //   await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
  // })

  await test.step('Navigate to All Products and add view details of a random product', async () => {
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();
    productName = await allPages.allProductsPage.getNthProductName(1);
    await allPages.allProductsPage.clickNthProduct(1);
    await allPages.productDetailsPage.clickAddToCartButton();
  });

  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'order-flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });

  // await test.step('Add product to cart, add new address and checkout', async () => {
  //   await allPages.productDetailsPage.clickCartIcon();
  //   await allPages.cartPage.assertYourCartTitle();
  //   await expect(allPages.cartPage.getCartItemName()).toContainText(productName, { timeout: 10000 });
  //   await allPages.cartPage.clickOnCheckoutButton();
  //   await allPages.checkoutPage.verifyCheckoutTitle();
  //   await allPages.checkoutPage.fillShippingAddress(
  //     firstName, email, 'New York', 'New York', '123 Main St', '10001', 'United States'
  //   );
  //   await allPages.checkoutPage.clickSaveAddressButton();
  //   await allPages.checkoutPage.assertAddressAddedToast();
  // })

  // await test.step('Complete order and verify in my orders', async () => {
  //   await allPages.checkoutPage.selectCashOnDelivery();
  //   await allPages.checkoutPage.verifyCheckoutTitle();
  //   await allPages.checkoutPage.clickOnPlaceOrder();
  //   await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
  //   await allPages.inventoryPage.clickOnContinueShopping();

  //   await allPages.loginPage.clickOnUserProfileIcon();
  //   await allPages.orderPage.clickOnMyOrdersTab();
  //   await allPages.orderPage.clickCancelOrderButton();
  //   await allPages.orderPage.confirmCancellation();
  // });
    });
  });
});

test('Verify that a new user can complete the journey from registration to multiple order placements', {
  tag: '@firefox',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Order' },
    { type: 'testdino:link', description: 'https://jira.example.com/ORDER-003' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Registration to multiple order placement on Firefox' }
  ]
}, async () => {
    const start = Date.now();
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

    let productName= `Rode NT1-A Condenser Mic`;

  await test.step('Navigate to All Products and add view details of a random product', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.allProductsPage.clickNthProduct(1);
    await allPages.productDetailsPage.clickOnReviewsTab();
    await allPages.productDetailsPage.assertReviewsTab();
    await allPages.productDetailsPage.clickOnAdditionalInfoTab();
    await allPages.productDetailsPage.assertAdditionalInfoTab();
  })

  await test.step('Add product to cart, change quantity, add new address and checkout', async () => {
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.productDetailsPage.clickCartIcon();
    // await allPages.cartPage.clickIncreaseQuantityButton();
    // await allPages.cartPage.clickOnCheckoutButton();
    // await allPages.checkoutPage.verifyCheckoutTitle();
    // await allPages.checkoutPage.selectCashOnDelivery();
    // await allPages.checkoutPage.verifyCashOnDeliverySelected();
    // await allPages.checkoutPage.fillShippingAddress(process.env.SFIRST_NAME, email, process.env.SCITY, process.env.SSTATE, process.env.SSTREET_ADD, process.env.SZIP_CODE, process.env.SCOUNTRY);
    // await allPages.checkoutPage.clickSaveAddressButton();
    // await allPages.checkoutPage.clickOnPlaceOrder();
    // await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
    // await allPages.checkoutPage.verifyOrderConfirmedTitle();
    // await allPages.checkoutPage.clickOnContinueShoppingButton();
  })

  await test.step('Add another product to cart, select existing address and checkout', async () => {
    // await allPages.homePage.clickOnShopNowButton();
    // await allPages.allProductsPage.assertAllProductsTitle();
    // await allPages.allProductsPage.clickNthProduct(1);
    // await allPages.productDetailsPage.clickAddToCartButton();
    // await allPages.productDetailsPage.clickCartIcon();
    // await allPages.cartPage.clickOnCheckoutButton();
    // await allPages.checkoutPage.verifyCheckoutTitle();
    // await allPages.checkoutPage.selectCashOnDelivery();
    // await allPages.checkoutPage.verifyCashOnDeliverySelected();
    // await allPages.checkoutPage.clickOnPlaceOrder();
    // await allPages.checkoutPage.verifyOrderPlacedSuccessfully();
  });

  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that a new user can sign up, log in, and navigate to the home page successfully', {
  tag: '@ios',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Registration' },
    { type: 'testdino:link', description: 'https://jira.example.com/REG-002' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Sign up, login and navigate home on iOS' }
  ]
}, async () => {
    const start = Date.now();
    const email = `test+${Date.now()}@test.com`;
    const firstName = 'Test';
    const lastName = 'User';

  await test.step('Verify that user can register successfully', async () => {
  //   await allPages.loginPage.clickOnUserProfileIcon();
  //   await allPages.loginPage.validateSignInPage();
  //   await allPages.loginPage.clickOnSignupLink();
  //   await allPages.signupPage.assertSignupPage();
  //   await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
  //   await allPages.signupPage.verifySuccessSignUp();
  })

  // await test.step('Verify that user can login successfully', async () => {
  //   await allPages.loginPage.validateSignInPage();
  //   await allPages.loginPage.login(email, process.env.PASSWORD);
  //   await allPages.loginPage.verifySuccessSignIn();
  //   await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
  // })
  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
})

test('Verify that user can fill and submit the Contact Us form successfully', {
  tag: '@chromium',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Contact' },
    { type: 'testdino:link', description: 'https://jira.example.com/CONTACT-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Contact Us form submission on Chromium' }
  ]
}, async () => {
    const start = Date.now();
    await login();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.contactUsPage.fillContactUsForm();
    await allPages.contactUsPage.verifySuccessContactUsFormSubmission();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
});

test('Verify that user can submit a product review', {
  tag: '@firefox',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Review' },
    { type: 'testdino:link', description: 'https://jira.example.com/REVIEW-002' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Submit product review on Firefox' }
  ]
}, async () => {
  const start = Date.now();
  await test.step('Login as existing user and navigate to a product', async () => {
    // await login();
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
  });

  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that user can update personal information in profile', {
  tag: '@webkit',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Profile' },
    { type: 'testdino:link', description: 'https://jira.example.com/PROFILE-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Update personal information on WebKit' }
  ]
}, async () => {
  const start = Date.now();
  await allPages.userPage.clickOnUserProfileIcon();
//   await allPages.userPage.updatePersonalInfo();
//   await allPages.userPage.verifyPersonalInfoUpdated();
  const flowTime = Date.now() - start;
  test.info().annotations.push({
    type: 'testdino:metric',
    description: JSON.stringify({
      name: 'flow-time',
      value: flowTime,
      unit: 'ms',
      threshold: 5000,
    }),
  });
});

test('Verify that user can delete a selected product from cart', {
  tag: '@android',
  annotation: [
    { type: 'testdino:priority', description: 'p1' },
    { type: 'testdino:feature', description: 'Cart' },
    { type: 'testdino:link', description: 'https://jira.example.com/CART-001' },
    { type: 'testdino:owner', description: 'qa-team' },
    { type: 'testdino:notify-slack', description: '#e2e-alerts' },
    { type: 'testdino:context', description: 'Delete selected product from cart on Android' }
  ]
}, async () => {
    const start = Date.now();
    const productName = 'GoPro HERO10 Black';
    await login();
    await allPages.inventoryPage.clickOnShopNowButton();
    await allPages.inventoryPage.clickOnAllProductsLink();
    await allPages.inventoryPage.searchProduct(productName);
    await allPages.inventoryPage.verifyProductTitleVisible(productName);
    await allPages.inventoryPage.clickOnAddToCartIcon();

    await allPages.cartPage.clickOnCartIcon();
    await allPages.cartPage.verifyCartItemVisible(productName);
    await allPages.cartPage.clickOnDeleteProductIcon();
    await allPages.cartPage.verifyCartItemDeleted(productName);
    await allPages.cartPage.verifyEmptyCartMessage();
    await allPages.cartPage.clickOnStartShoppingButton();
    await allPages.allProductsPage.assertAllProductsTitle();
    const flowTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'flow-time',
        value: flowTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
});