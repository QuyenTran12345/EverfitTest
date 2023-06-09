/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
import LoginPage from './form.page.js';

export default class Page {
    open () {
        return browser.url(`https://www.digitalunite.com/practice-webform-learners`)
    }

    setValue(selector, value) {
        const element = LoginPage[selector]
        console.log(element);
        $(element).setValue(value)
    }
}
