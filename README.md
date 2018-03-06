[jQuery Validation Plugin](https://jqueryvalidation.org/) - Form validation made easy
================================

[![release](https://img.shields.io/github/release/jquery-validation/jquery-validation.svg)](https://github.com/jquery-validation/jquery-validation/releases/latest)
[![Build Status](https://secure.travis-ci.org/jquery-validation/jquery-validation.svg)](https://travis-ci.org/jquery-validation/jquery-validation)
[![devDependency Status](https://david-dm.org/jquery-validation/jquery-validation/dev-status.svg?theme=shields.io)](https://david-dm.org/jquery-validation/jquery-validation#info=devDependencies)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/jquery-validation/badge?style=rounded)](https://www.jsdelivr.com/package/npm/jquery-validation)

The jQuery Validation Plugin provides drop-in validation for your existing forms, while making all kinds of customizations to fit your application really easy.

## Getting Started

### Downloading the prebuilt files

Prebuilt files can be downloaded from https://jqueryvalidation.org/

### Downloading the latest changes

The unreleased development files can be obtained by:

 1. [Downloading](https://github.com/jquery-validation/jquery-validation/archive/master.zip) or Forking this repository
 2. [Setup the build](CONTRIBUTING.md#build-setup)
 3. Run `grunt` to create the built files in the "dist" directory

### Including it on your page

Include jQuery and the plugin on a page. Then select a form to validate and call the `validate` method.

```html
<form>
	<input required>
</form>
<script src="jquery.js"></script>
<script src="jquery.validate.js"></script>
<script>
    $("form").validate();
</script>
```

Alternatively include jQuery and the plugin via requirejs in your module.

```js
define(["jquery", "jquery.validate"], function( $ ) {
	$("form").validate();
});
```

For more information on how to setup a rules and customizations, [check the documentation](https://jqueryvalidation.org/documentation/).

## Reporting issues and contributing code

See the [Contributing Guidelines](CONTRIBUTING.md) for details.

**IMPORTANT NOTE ABOUT EMAIL VALIDATION**. As of version 1.12.0 this plugin is using the same regular expression that the [HTML5 specification suggests for browsers to use](https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address). We will follow their lead and use the same check. If you think the specification is wrong, please report the issue to them. If you have different requirements, consider [using a custom method](https://jqueryvalidation.org/jQuery.validator.addMethod/).
In case you need to adjust the built-in validation regular expression patterns, please [follow the documentation](https://jqueryvalidation.org/jQuery.validator.methods/).

**IMPORTANT NOTE ABOUT REQUIRED METHOD**. As of version 1.14.0 this plugin stops trimming white spaces from the value of the attached element. If you want to achieve the same result, you can use the [`normalizer`](https://jqueryvalidation.org/normalizer/) that can be used to transform the value of an element before validation. This feature was available since `v1.15.0`. In other words, you can do something like this:
``` js
$("#myForm").validate({
	rules: {
		username: {
			required: true,
			// Using the normalizer to trim the value of the element
			// before validating it.
			//
			// The value of `this` inside the `normalizer` is the corresponding
			// DOMElement. In this example, `this` references the `username` element.
			normalizer: function(value) {
				return $.trim(value);
			}
		}
	}
});
```

## Accessibility
For an invalid field, the default output for the jQuery Validation Plugin is an error message in a `<label>` element. This results in two `<label>` elements pointing to a single input field using the `for` attribute. While this is valid HTML, it has inconsistent support across screen readers.

For greater screen reader support in your form's validation, use the `errorElement` parameter in the `validate()` method. This option outputs the error in an element of your choice and automatically adds ARIA attributes to the HTML that help with screen reader support.

`aria-describedby` is added to the input field and it is programmatically tied to the error element chosen in the `errorElement` parameter.

``` js
$("#myform").validate({
  errorElement: "span"
});
```

``` html
<label for="name">Name</label>
<input id="name" aria-describedby="unique-id-here">
<span class="error" id="unique-id-here">This field is required</span>
```

[Learn more about errorElement](https://jqueryvalidation.org/validate/#errorelement)

## License
Copyright &copy; Jörn Zaefferer<br>
Licensed under the MIT license.
