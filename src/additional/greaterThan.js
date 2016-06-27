$.validator.addMethod("greaterThan", function (value, element, params) {
    var currentValue = isNaN(value) ? undefined : parseFloat(value);
    return this.optional(element) || currentValue > params[0];
}, $.validator.format("The value must be greater than {0}."));