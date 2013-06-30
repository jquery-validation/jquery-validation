jQuery.validator.addMethod("slug", function(value, element) {
	return this.optional(element) || /^([a-z0-9_-])+$/i.test(value);
}, "Alpha-numeric characters, Dashes, and Underscores only please");