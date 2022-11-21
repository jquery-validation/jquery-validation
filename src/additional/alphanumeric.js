$.validator.addMethod( "alphanumeric", function( value, element ) {
	return this.optional( element ) || /^[a-zàâçéèêëîïôûùüÿæœ0-9_]+$/i.test( value );
}, "Letters, numbers, and underscores only please." );
