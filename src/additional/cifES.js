jQuery.validator.addMethod( "cifES", function ( value, element ) {
	"use strict";
 
	var n,
		sum,
		num = [],
		CIF = value.toUpperCase();
 
	// Basic format test 
	if ( !CIF.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) {
		return false;
	}
	
	for ( var i = 0; i < 9; i++ ) {
		num[i] = parseInt( CIF.charAt( i ), 10 );
	}
 
	// Algorithm for checking CIF codes
	sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
	for ( var count = 1; count < 8; count += 2 ) {
		var tmp = ( 2 * num[ count ] ).toString(),
			secondDigit = tmp.charAt( 1 );
		
		sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === '' ? 0 : parseInt( secondDigit, 10 ) );
	}
	
	if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( CIF ) ) {
		sum += '';
		n = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
		CIF += n;
		return ( num[ 8 ].toString() === String.fromCharCode( 64 + n ) || num[ 8 ].toString() === CIF.charAt( CIF.length - 1 ) );
	}
 
	return false;
 
}, "Please specify a valid CIF number." );