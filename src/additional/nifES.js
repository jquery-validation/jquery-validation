jQuery.validator.addMethod( "nifES", function ( value, element ) {
	"use strict";

	var NIF = value.toUpperCase(),
		letterDNI=NIF.charAt( 8 ),
		stringDNI = "TRWAGMYFPDXBNJZSQVHLCKE",
		position = NIF.substring( 8,0 ) % 23,
		letter = stringDNI.charAt( position );

	// Basic format test 
	if ( !NIF.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)') ) {
		return false;
	}

	// Test NIF
	if ( /^[0-9]{8}[A-Z]{1}$/.test( NIF ) ){
		return ( letter === letterDNI );
	}
	// Test specials NIF (starts with K, L or M)
	if ( /^[KLM]{1}/.test( NIF ) ){
		return ( NIF[ 8 ] === String.fromCharCode( 64 ) );
	}

	return false;

}, "Please specify a valid NIF number.");
