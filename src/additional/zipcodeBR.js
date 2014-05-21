jQuery.validator.addMethod("zipcodeBR", function(value, element) {
	return this.optional(element) || /^\d{5}-\d{3}$/.test(value);
}, "The specified BR ZIP Code is invalid");
