### Checklist for this issue
If your issue is about the regex used in `email` rule, please note that as of version 1.12.0 this plugin is using the same regular expression that the HTML5 specification suggests for browsers to use (https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address). We will follow their lead and use the same check. If you think the specification is wrong, please report the issue to them. If you have different requirements, consider using a custom method.
In case you need to adjust the built-in validation regular expression patterns, please follow the documentation (http://jqueryvalidation.org/jQuery.validator.methods/).

### Subject of the issue
Describe your issue here.

### Your environment
* version of `jquery-validate`
* which browser and its version

### Steps to reproduce
Tell us how to reproduce this issue. If pssible, please provide a working demo in JSFiddle (https://jsfiddle.net) or JSBin (https://jsbin.com/).

### Expected behaviour
Tell us what should happen

### Actual behaviour
Tell us what happens instead
