jQuery.validator.addMethod("distinctTo", function(value, element, params) {
    return value === $(params).val() ? false : true;
}, jQuery.validator.format("Please enter a distinct value."));
