// allow only positive integers

jQuery.validator.addMethod("posInteger", function(value, element) {
	return this.optional( element ) || /\A[0-9]+\z/.test( value ) || /^[0-9]+$/.test( value );
}, 'Please enter a positive non-decimal number.');
