

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get dialogAlert() {
        return $("//div[@class='ot-sdk-container']")
    }

    get closeBtn () {
        return $("//div[@class='banner-close-btn-container']//button[@aria-label='Close']")
    }

    get inputName () {
        return $("//input[@id='edit-name']");
    }

    get inputNumber () {
        return $("//input[@id='edit-number']");
    }

    get inputDate () {
        return $("//input[@id='edit-date']");
    }

    get inputEmail () {
        return $("//input[@id='edit-email']");
    }

    get inputTellUs () {
        return $("//textarea[@id='edit-tell-us-a-bit-about-yourself-']");
    }

    get uploadFile() {
        return $("//input[@id='edit-uploadocument-upload']")
    }
    
    get checkbox() {
        return $("//input[@id='edit-age']")
    }

    get submit() {
        return $("//input[@id='edit-submit']")
    }

    get age2030NotSelect () {
        return $("//label[text()='20-30' and not(contains(@class, 'ui-state-active'))]");
    }

    get age3040NotSelect () {
        return $("//label[text()='30-40' and not(contains(@class, 'ui-state-active'))]");
    }

    get age4050NotSelect () {
        return $("//label[text()='40-50' and not(contains(@class, 'ui-state-active'))]");
    }

    get age50AboveNotSelect () {
        return $("//label[text()='50-above' and not(contains(@class, 'ui-state-active'))]");
    }

    get age2030Selected () {
        return $("//label[text()='20-30' and contains(@class, 'ui-state-active')]");
    }

    get age3040Selected () {
        return $("//label[text()='30-40' and contains(@class, 'ui-state-active')]");
    }

    get age4050Selected () {
        return $("//label[text()='40-50' and contains(@class, 'ui-state-active')]");
    }

    get age50AboveSelected () {
        return $("//label[text()='50-above' and contains(@class, 'ui-state-active')]");
    }

    get successMessage() {
        return $("//h1[text()='Thank you for your submission!']");
    }

    get requireNameMessage() {
        return $("//*[contains(text(), 'Please fill out this field.')]");
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async submitSuccessForm () {
        await browser.pause(5000)

        await this.dialogAlert.waitForEnabled({ timeout: 3000 });
        await this.closeBtn.waitForClickable({ timeout: 3000 });
        await this.closeBtn.click();

        await this.inputName.waitForEnabled({ timeout: 3000 });
        await this.inputName.setValue("Tran Thi Quyen");

        await this.inputNumber.waitForEnabled({ timeout: 3000 });
        await this.inputNumber.setValue("0776987786");

        await this.inputNumber.waitForEnabled({ timeout: 3000 });
        await this.age2030NotSelect.waitForClickable({ timeout: 3000 });
        await this.age2030NotSelect.click();

        const isSelectDate = await this.age2030Selected.isDisplayed();
        expect(isSelectDate).toEqual(true);

        await this.inputNumber.waitForEnabled({ timeout: 3000 });
        await this.inputDate.setValue("06/08/2023");

        await this.inputEmail.waitForEnabled({ timeout: 3000 });
        await this.inputEmail.setValue("quyen.trantester123@gmail.com");

        await this.inputTellUs.waitForEnabled({ timeout: 3000 });
        await this.inputTellUs.setValue("tell us about your self");

        await this.upload();
        await browser.pause(5000)

        await this.checkbox.waitForEnabled({ timeout: 3000 });
        await this.checkbox.click()
    
        await this.submit.waitForEnabled({ timeout: 3000 });
        await this.submit.click()
        await browser.pause(5000)

        const isDisplaySuccessMessage = await this.successMessage.isDisplayed();
        expect(isDisplaySuccessMessage).toEqual(true)

        const URL = await browser.getUrl()
        expect(URL).toContain("https://www.digitalunite.com/node")
    }

    async submitFormWithoutEnter() {
        await browser.pause(5000)

        await this.dialogAlert.waitForEnabled({ timeout: 3000 });
        await this.closeBtn.waitForClickable({ timeout: 3000 });
        await this.closeBtn.click();

        await this.submit.waitForEnabled({ timeout: 3000 });
        await this.submit.click()
        await browser.pause(5000)

        // Cannot get Xpath of required message
        // const isDisplayRequireMess = await this.requireNameMessage.isDisplayed()
        // expect(isDisplayRequireMess).toEqual(true)

        const URL = await browser.getUrl()
        expect(URL).toEqual("https://www.digitalunite.com/practice-webform-learners")


    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();
    }

    async upload () {
        const filePath = './data/image.png'
        const remoteFilePath = await browser.uploadFile(filePath)
        await this.uploadFile.setValue(remoteFilePath)
        
    }
}

export default new LoginPage();
