jQuery.validator.addMethod("zipcodeUS", function(value, element) {
	return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
}, "The specified US ZIP Code is invalid");
