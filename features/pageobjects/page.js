/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
import LoginPage from './form.page.js';

export default class Page {
    open () {
        return browser.url(`https://www.digitalunite.com/practice-webform-learners`)
    }
}
