// Matches CA post codes
jQuery.validator.addMethod("postcodeCA", function(value, element) {
	return this.optional(element) ||/^([a-zA-Z]\d[a-zA-z](?: )?\d[a-zA-Z]\d)$/.test(value);
}, "The specified postal code is invalid");