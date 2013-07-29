jQuery.validator.addMethod( "nieES", function ( value, element ) {
	"use strict";

	var pos = '',
		NIE = value.toUpperCase(),
		stringDNI = "TRWAGMYFPDXBNJZSQVHLCKE";

	// Basic format test 
	if ( !NIE.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)') ) {
		return false;
	}


	//comprobacion de NIEs
	//T
	if ( /^[T]{1}/.test( NIE ) ){
		return ( NIE[ 8 ] === /^[T]{1}[A-Z0-9]{8}$/.test( NIE ) );
	}

	//XYZ
	if ( /^[XYZ]{1}/.test( NIE ) ){
		pos = NIE.replace( 'X','0' )
				.replace( 'Y','1' )
				.replace( 'Z','2' )
				.substring( 0, 8 ) % 23;

		return ( NIE[ 8 ] === stringDNI.charAt( pos ) );
	}

	return false;

}, "Please specify a valid NIE number.");

