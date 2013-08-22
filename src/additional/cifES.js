jQuery.validator.addMethod( "cifES", function ( value, element ) {
	"use strict";
 
	var sum,
		num = [],
		controlDigit;
	
	value = value.toUpperCase();
 
	// Basic format test 
	if ( !value.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) {
		return false;
	}
	
	for ( var i = 0; i < 9; i++ ) {
		num[ i ] = parseInt( value.charAt( i ), 10 );
	}
 
	// Algorithm for checking CIF codes
	sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
	for ( var count = 1; count < 8; count += 2 ) {
		var tmp = ( 2 * num[ count ] ).toString(),
			secondDigit = tmp.charAt( 1 );
		
		sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === '' ? 0 : parseInt( secondDigit, 10 ) );
	}
	
	// CIF test
	if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
		sum += '';
		controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
		value += controlDigit;
		return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
	}
 
	return false;
 
}, "Please specify a valid CIF number." );