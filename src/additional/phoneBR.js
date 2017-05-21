$.validator.addMethod("phoneBR", function(phone_number, element) {
	phone_number = phone_number.replace(/\s+/g, "");
	return this.optional(element) || phone_number.length > 7 &&
		phone_number.match(/^(\(?[0-9]{2,3}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm);
}, "Please specify a valid phone number");
