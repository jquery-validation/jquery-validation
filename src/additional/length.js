jQuery.validator.addMethod("length", function(value, element, param) {
	var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
	return this.optional(element) || length === param;
}, "Please enter exactly at {0} characters in length.");