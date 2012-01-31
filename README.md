[jQuery Validation Plugin](http://bassistance.de/jquery-plugins/jquery-plugin-validation/) - Form validation made easy
================================

The jQuery Validation Plugin provides drop-in validation for your existing forms, while making all kinds of customizations to fit your application really easy.

## Getting Started

Include jQuery and the plugin on a page. Then select a form to validate and call the `validate` method.

```html
<form>
	<input required>
</form>
<script src="jquery.js"></script>
<script src="jquery.validation.js"></script>
<script>
$("form").validate();
</script>
```

For more information on how to setup a rules and customizations, [check the documentation](http://docs.jquery.com/Plugins/Validation).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

If you've wrote custom methods that you'd like to contribute to additional-methods.js, create a branch, add the method there and send a pull request for that branch.

If you've wrote a patch for some bug listed on http://plugins.jquery.com/project/issues/validate, please provide a link to that issue in your commit message.

## License
Copyright (c) 2012 Jörn Zaefferer
Licensed under the MIT license.
