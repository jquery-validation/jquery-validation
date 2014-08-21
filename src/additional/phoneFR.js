/**
 * matches FR phone number format
 * FR phone numbers have 10 digits and first 0 can be replaced with +33 or 0033
 */

$.validator.addMethod("phoneFR", function(phone_number, element) {
	phone_number = phone_number.replace(/\s+/g, "");
	return this.optional(element) || phone_number.length > 9 &&
		phone_number.match(/^(0|(00|\+)33)[1-9]{1}[0-9]{8}$/);
}, "Please specify a valid phone number");
