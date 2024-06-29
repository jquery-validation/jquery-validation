/**
 * Italian phone numbers have 9-10 digits (and start with +39 or 0039).
 */
$.validator.addMethod( "phoneIT", function( value, element ) {
	return this.optional( element ) || /^((00|\+)39)[\d]{9,10}$/.test( value );
},"Please specify a valid phone number." );
