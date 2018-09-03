/*  mobile number for Russia Fedaration */
$.validator.addMethod( "mobileRU", function( phone_number, element ) {
	phone_number = phone_number.replace( /\(|\)|\s+|-/g, "" );
	return this.optional( element ) || phone_number.length > 9 &&
		phone_number.match( /^((\+7|7|8)+([0-9]){10})$/ );
}, "Please specify a valid mobile number" );
