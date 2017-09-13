/* Matches Danish postcode */
$.validator.addMethod( "postalcodeDK", function( value, element ) {
	return this.optional( element ) || /^[0-9]{4}$/.test( value );
}, "Please specify a valid postal code" );

/*
 * This accept all danish(DK) zip codes (1000 to 9999)
 * also work for the danish kingdoms Greenland.
 * Not work for the danish kingdom Faroe Islands after they use 3 digi zip codes.
 *
 * Note: Greenland and Faroe Islands is a part of the Danish Kingdom and not the country it self.
*/
