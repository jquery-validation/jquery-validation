/* Matches Italian postcode (CAP) */
jQuery.validator.addMethod("postalcodeIT", function(value, element) {
    return this.optional(element) || /^\d{5}$/.test(value);
}, "Please specify a valid postal code");
