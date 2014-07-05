/* Matches Mexican postcode (CAP) */
$.validator.addMethod("postalCodeMX", function(value, element) {
	return this.optional(element) || /^\d{5}$/.test(value);
}, "Please specify a valid postal code");
