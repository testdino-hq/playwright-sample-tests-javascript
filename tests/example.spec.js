// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
dotenv.config({ override: true })

test.describe('Login to the application', () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach(async ({ page }) => {
    allPages = new AllPages(page);
  })

  test('Verify that user can login and logout successfully', async ({ page }) => {
    await test.step('Navigate to the login page and login with valid credentials', async () => {
      await page.goto('/');
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
})

test.describe('Change the profile details', () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach(async ({ page }) => {
    allPages = new AllPages(page);
  })

  test('Verify that user can update personal information', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('/');
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

  test('Verify that User Can Add, Edit, and Delete Addresses after Logging In', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('/');
      // TODO: Add userPage to AllPages.js and create UserPage.js
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

  test('Verify that user can change password successfully', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('/');
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Click on user profile icon to open profile menu', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
    })
    await test.step('Click on security button to access password change section', async () => {
      await allPages.userPage.clickOnSecurityButton();
    })
    await test.step('Fill new password field', async () => {
      await allPages.userPage.enterNewPassword();
    })
    await test.step('Fill confirm password field', async () => {
      await allPages.userPage.enterConfirmNewPassword();
    })
    await test.step('Click update password button to change password', async () => {
      await allPages.userPage.clickOnUpdatePasswordButton();
    })
    await test.step('Verify password change notification is displayed', async () => {
      await allPages.userPage.getUpdatePasswordNotification();
    })
    await test.step('Logout from the application', async () => {
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.clickOnLogoutButton();
    })
    await test.step('Login with new password', async () => {
      await allPages.loginPage.login(process.env.USERNAME, process.env.NEW_PASSWORD);
    })
    await test.step('Revert password back to original', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
      await allPages.userPage.clickOnSecurityButton();
      await allPages.userPage.revertPasswordBackToOriginal();
      await allPages.userPage.getUpdatePasswordNotification();
    })
  })
  
  test('Verify that the New User is able to add Addresses in the Address section', async ({ page }) => {
    await test.step('Login to the website', async () => {
      await page.goto('/');
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Navigate to the user profile page', async () => {
      await allPages.userPage.clickOnUserProfileIcon();
    })
    await test.step('Click on the address tab', async () => {
      await allPages.userPage.clickOnAddressTab();
    })
    await test.step('Click on the add address button', async () => {
      await allPages.userPage.clickOnAddAddressButton();
    })
    await test.step('Check the add new address menu', async () => {
      await allPages.userPage.checkAddNewAddressMenu();
    })
    await test.step('Fill the address form', async () => {
      await allPages.userPage.fillAddressForm();
    })
  })

})

test.describe('Order Placement', () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach(async ({ page }) => {
    allPages = new AllPages(page);
  })

  test('Verify that User Can Complete the Journey from Login to Order Placement', async ({ page }) => {
    const productName = 'GoPro HERO10 Black'; // Define productName here
    await test.step('Login to the application', async () => {
      await page.goto('/');
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })
    await test.step('Navigate to the product page and add a product to the cart', async () => {
      await allPages.inventoryPage.clickOnShopNowButton();
      await allPages.inventoryPage.clickOnAllProductsLink();
      await allPages.inventoryPage.searchProduct(productName);
      await allPages.inventoryPage.verifyProductTitleVisible(productName);
      await allPages.inventoryPage.clickOnAddToCartIcon();
    })
  })

  test('Verify user can place and cancel an order', async ({ page }) => {
    const productName = 'GoPro HERO10 Black';
    const productPriceAndQuantity = '₹49,999 × 1';
    const productQuantity = '1';
    const orderStatusProcessing = 'Processing';
    const orderStatusCanceled = 'Canceled';

    await test.step('Login to the application', async () => {
      await page.goto('/');
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.loginPage.validateSignInPage();
      await allPages.loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    })

    await test.step('Add a product to the cart', async () => {
      await allPages.inventoryPage.clickOnAllProductsLink(); // TODO: Add clickOnAllProductsLink to InventoryPage.js
      await allPages.inventoryPage.searchProduct(productName); // TODO: searchProduct in InventoryPage.js needs to be generic
      await allPages.inventoryPage.verifyProductTitleVisible(productName); // TODO: Add verifyProductTitleVisible to InventoryPage.js
      await allPages.inventoryPage.clickOnAddToCartIcon(); // TODO: Add clickOnAddToCartIcon to InventoryPage.js
    })

    await test.step('Navigate to cart and proceed to checkout', async () => {
      await allPages.cartPage.clickOnCartIcon(); // TODO: Add clickOnCartIcon to CartPage.js
      await allPages.cartPage.verifyCartItemVisible(productName); // TODO: Add verifyCartItemVisible to CartPage.js
      await allPages.cartPage.clickOnCheckoutButton(); // Already exists as clickCheckoutButton, rename this
    })

    await test.step('Complete the checkout process', async () => {
      await allPages.checkoutPage.verifyCheckoutTitle(); // Exists as assertCheckoutTitle, rename this
      await allPages.checkoutPage.verifyProductInCheckout(productName); // TODO: Add verifyProductInCheckout to CheckoutPage.js
      await allPages.checkoutPage.selectCashOnDelivery(); // Exists as clickCodButton, rename this
      await allPages.checkoutPage.verifyCashOnDeliverySelected(); // TODO: Add verifyCashOnDeliverySelected to CheckoutPage.js
      await allPages.checkoutPage.clickOnPlaceOrder(); // Exists as clickPlaceOrderButton, rename this
      await allPages.checkoutPage.verifyOrderPlacedSuccessfully(); // TODO: Add verifyOrderPlacedSuccessfully to CheckoutPage.js
      await allPages.checkoutPage.verifyOrderItemName(productName); // TODO: Add verifyOrderItemName to CheckoutPage.js
      await allPages.inventoryPage.clickOnContinueShopping(); // TODO: Add clickOnContinueShopping to InventoryPage.js
    })

    await test.step('Navigate to "My Orders" and view the order', async () => {
      await allPages.loginPage.clickOnUserProfileIcon();
      await allPages.orderPage.clickOnMyOrdersTab();
      await allPages.orderPage.verifyMyOrdersTitle();
      await allPages.orderPage.clickOnPaginationButton(2);
      await allPages.orderPage.verifyProductInOrderList(productName);
      await allPages.orderPage.verifyPriceAndQuantityInOrderList(productPriceAndQuantity);
      await allPages.orderPage.verifyOrderStatusInList(orderStatusProcessing, productName);
      await allPages.orderPage.clickOnPaginationButton(1);
      await allPages.orderPage.clickViewDetailsButton(1);
      await allPages.orderPage.verifyOrderDetailsTitle();
      await allPages.orderPage.verifyOrderSummary(productName, productQuantity, '₹49,999', orderStatusProcessing);
    })

    await test.step('Cancel the order and verify cancellation', async () => {
      await allPages.orderPage.clickCancelOrderButton(2);
      await allPages.orderPage.confirmCancellation();
      await allPages.orderPage.verifyCancellationConfirmationMessage();
      await allPages.orderPage.verifyMyOrdersCount();
      await allPages.orderPage.clickOnMyOrdersTab();
      await allPages.orderPage.verifyMyOrdersTitle();
      await allPages.orderPage.clickOnPaginationButton(2);
      await allPages.orderPage.verifyOrderStatusInList(orderStatusCanceled, productName);
    })
  })

})

test.describe('Order Placement from Scratch', () => {
  /** @type {AllPages} */
  let allPages;
  let email;
  let firstName;
  let lastName;

  test.beforeAll(async () => {
    email = `test+${Date.now()}@test.com`;
    firstName = `Test`;
    lastName = `User`;
  })

  test.beforeEach(async ({page}) => {
    allPages = new AllPages(page);
    await page.goto('/');
    await allPages.loginPage.clickOnUserProfileIcon();
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.clickOnSignupLink();
    await allPages.signupPage.assertSignupPage();
    await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
    await allPages.signupPage.verifySuccessSignUp();
  })

  test('Verify that a New User Can Successfully Complete the Journey from Registration to a Single Order Placement', async ({ page }) => {
    let productName;
    let productPrice;
    let productReviewCount;

    await test.step('Login as the newly registered user', async () => {
        await allPages.loginPage.validateSignInPage();
        await allPages.loginPage.login(email, process.env.PASSWORD);
        await allPages.loginPage.verifySuccessSignIn();
        await expect(allPages.homePage.getHomeNav()).toBeVisible({ timeout: 30000 });
    });

    await test.step('Navigate to All Products page', async () => {
        await allPages.homePage.clickAllProductsNav();
        await allPages.allProductsPage.assertAllProductsTitle();
    });

    await test.step('Select the first product and add to wishlist', async () => {
        productName = await allPages.allProductsPage.getNthProductName(1);
        console.log(productName);

        productPrice = await allPages.allProductsPage.getNthProductPrice(1);
        console.log(productPrice);

        productReviewCount = await allPages.allProductsPage.getNthProductReviewCount(1);
        console.log(productReviewCount);

        await allPages.allProductsPage.clickNthProductWishlistIcon(1);
        await expect(allPages.allProductsPage.getNthProductWishlistIconCount(1)).toContainText('1');

        await allPages.allProductsPage.clickNthProduct(1);
    });

    await test.step('Verify product details on Product Details page', async () => {
        await allPages.productDetailsPage.assertProductNameTitle(productName);
        await allPages.productDetailsPage.assertProductPrice(productName, productPrice);
        await allPages.productDetailsPage.assertProductReviewCount(productName, productReviewCount);
        await expect(allPages.allProductsPage.getNthProductWishlistIconCount(1)).toContainText('1');
    });

    await test.step('Add product to cart', async () => {
        await allPages.productDetailsPage.clickAddToCartButton();
    });

    await test.step('Go to cart, increase quantity, and verify cart details', async () => {
        await allPages.productDetailsPage.clickCartIcon();
        await allPages.cartPage.assertYourCartTitle();
        expect(allPages.cartPage.getCartItemName()).toContainText(productName, { timeout: 10000 });
        expect(allPages.cartPage.getCartItemPrice()).toContainText(productPrice);
        expect(allPages.cartPage.getCartItemQuantity()).toContainText('1');
        await allPages.cartPage.clickIncreaseQuantityButton();
        await expect(allPages.cartPage.getCartItemQuantity()).toContainText('2');
        const cleanPrice = productPrice.replace(/[₹,]/g, '');
        const priceValue = parseFloat(cleanPrice) * 2;
        await expect(allPages.cartPage.getTotalValue()).toContainText(priceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        await allPages.cartPage.clickOnCheckoutButton(); // Updated method name
    });

    await test.step('Fill shipping address and save', async () => {
        await allPages.checkoutPage.verifyCheckoutTitle(); // Updated method name
        await allPages.checkoutPage.fillShippingAddress(firstName, email, 'New York', 'New York', '123 Main St', '10001', 'United States');
        await allPages.checkoutPage.clickSaveAddressButton();
        await allPages.checkoutPage.assertAddressAddedToast();
    });

    await test.step('Select COD payment, verify order summary, and place order', async () => {
        await allPages.checkoutPage.selectCashOnDelivery(); // Updated method name
        await allPages.checkoutPage.verifyCheckoutTitle(); // Updated method name
        await allPages.checkoutPage.assertOrderSummaryTitle();
        await expect(allPages.checkoutPage.getOrderSummaryImage()).toBeVisible();
        await expect(allPages.checkoutPage.getOrderSummaryProductName()).toContainText(productName);
        await allPages.checkoutPage.verifyProductInCheckout(productName);
        await expect(allPages.checkoutPage.getOrderSummaryProductQuantity()).toContainText('2');
        await expect(allPages.checkoutPage.getOrderSummaryProductPrice()).toContainText(productPrice);
        const cleanPrice = productPrice.replace(/[₹,]/g, '');
        const subtotalValue = parseFloat(cleanPrice) * 2;
        const formattedSubtotal = subtotalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        expect(await allPages.checkoutPage.getOrderSummarySubtotalValue()).toContain(formattedSubtotal);
        await expect(allPages.checkoutPage.getOrderSummaryShippingValue()).toContainText('Free');
        await allPages.checkoutPage.clickOnPlaceOrder(); // Updated method name
    });

    await test.step('Verify order details and information after placing order', async () => {
        await allPages.orderDetailsPage.assertOrderDetailsTitle();
        await allPages.orderDetailsPage.assertOrderPlacedName();
        await allPages.orderDetailsPage.assertOrderPlacedMessage();
        await allPages.orderDetailsPage.assertOrderPlacedDate();
        await allPages.orderDetailsPage.assertOrderInformationTitle();
        await allPages.orderDetailsPage.assertOrderConfirmedTitle();
        await allPages.orderDetailsPage.assertOrderConfirmedMessage();
        await allPages.orderDetailsPage.assertShippingDetailsTitle();
        await allPages.orderDetailsPage.assertShippingEmailValue(email);
        const cleanPrice = productPrice.replace(/[₹,]/g, '');
        const subtotalValue = parseFloat(cleanPrice) * 2;
        const formattedSubtotal = subtotalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        await allPages.orderDetailsPage.assertPaymentMethodAmount(formattedSubtotal);
        await allPages.orderDetailsPage.assertDeliveryAddressLabel();
        await allPages.orderDetailsPage.assertDeliveryAddressValue();
        await allPages.orderDetailsPage.assertContinueShoppingButton();
    });

    await test.step('Verify order summary on Order Details page and return to home', async () => {
        await allPages.orderDetailsPage.assertOrderSummaryTitle();
        await allPages.orderDetailsPage.assertOrderSummaryProductName(productName);
        await allPages.orderDetailsPage.assertOrderSummaryProductQuantity('2');
        await allPages.orderDetailsPage.assertOrderSummaryProductPrice(productPrice);
        const cleanPrice = productPrice.replace(/[₹,]/g, '');
        const subtotalValue = parseFloat(cleanPrice) * 2;
        const formattedSubtotal = subtotalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        await allPages.orderDetailsPage.assertOrderSummarySubtotalValue(formattedSubtotal);
        await allPages.orderDetailsPage.assertOrderSummaryShippingValue('Free');
        await allPages.orderDetailsPage.assertOrderSummaryTotalValue(formattedSubtotal);
        await allPages.orderDetailsPage.clickBackToHomeButton();
    });
  })
})
