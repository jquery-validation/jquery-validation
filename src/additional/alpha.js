jQuery.validator.addMethod("alpha", function(value, element) {
	return this.optional(element) || /^([a-z])+$/i.test(value);
}, "Letters only please");