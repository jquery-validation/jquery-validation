$.validator.addMethod( "date", function( date_number, element ) {
	date_number = date_number.replace( /\(|\)|\s+|-/g, "" );
	return this.optional( element ) || date_number.length > 9 &&
		date_number.match( /^[0-9]{2}:[0-9]{2}$/ );
}, "Please specify a valid date" );
