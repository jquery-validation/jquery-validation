jQuery.validator.addMethod( "notEqualTo" , function( value, element, param ) {
	return !$.validator.methods.equalTo.call( this, value, element, param );
}, "Please enter a different value, values must not be the same." );
