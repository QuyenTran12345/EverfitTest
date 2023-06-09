import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/form.page.js';

Given(/^I open the page$/, async () => {
    await LoginPage.open()
});

When(/^I submitting with all required and optional fields is filled in correctly.$/, async () => {
    await LoginPage.submitSuccessForm()
});

When(/^I submitting without entering any information$/, async () => {
    await LoginPage.submitFormWithoutEnter()
});



// Then(/^I should see a flash message saying (.*)$/, async (message) => {
//     await expect(SecurePage.flashAlert).toBeExisting();
//     await expect(SecurePage.flashAlert).toHaveTextContaining(message);
// });

