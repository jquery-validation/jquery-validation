    /* Matches Danish postcode */
    $.validator.addMethod("postalcodeDK", function(value, element) {
        return this.optional(element) || /^[0-9]{3,4}$/.test(value);
    }, "Please specify a valid danish postal code");
