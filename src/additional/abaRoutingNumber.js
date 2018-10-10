/**
 * This is used in the United States to process payments, deposits,
 * or transfers using the Automated Clearing House (ACH) or Fedwire
 * systems. A very common use case would be to validate a form for
 * an ACH bill payment.
 */
$.validator.addMethod( "abaRoutingNumber", function( value ) {
	var checksum = 0;
	var tokens = value.split( "" );
	var length = tokens.length;

	// Length Check
	if ( length !== 9 ) {
		return false;
	}

	// Calc the checksum
	// https://en.wikipedia.org/wiki/ABA_routing_transit_number
	for ( var i = 0; i < length; i += 3 ) {
		checksum +=	parseInt( tokens[ i ], 10 )     * 3 +
					parseInt( tokens[ i + 1 ], 10 ) * 7 +
					parseInt( tokens[ i + 2 ], 10 );
	}

	// If not zero and divisible by 10 then valid
	if ( checksum !== 0 && checksum % 10 === 0 ) {
		return true;
	}

	return false;
}, "Please enter a valid routing number." );
