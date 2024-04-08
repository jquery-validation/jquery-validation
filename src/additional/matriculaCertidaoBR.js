/*
 * Brazillian certificate registration.
 *
 * Certificate registration number follows the pattern aaaaaa.bb.cc.dddd.e.fffff.ggg.hhhhhhh-ii, where:
 *
 * aaaaaa indicates the Código Nacional da Serventia (notary's office unique identification) ex.: 10453-9 (v. Nota final)
 * bb indicates the Collection Code (01-Proper collection e 02-Incorporated collection)
 * cc indicates the Type of Service Provided (55 - Civil Registration Service for Natural Persons)
 * dddd indicates the registration year - ex.: 2013
 * e indicates The book category - 1-Book A (Birth),
 *                                 2-Book B (Marriage),
 *                                 3-Book B Auxiliary (Religious weddings registrations with civil effects),
 *                                 4-Book C (Deaths),
 *                                 5-Book C Auxiliary (Stillbirth registrations),
 *                                 6-Book D (Banns of marriage registrations),
 *                                 7-Book E (Other acts related to Civil registration or unique E Book),
 *                                 8-Book E (Unfolded for specific Emancipations registraion) and
 *                                 9-Book E (Unfolded for specific Interdictions registraion)
 * fffff indicates the book number - ex.: 00012
 * ggg indicates the page number - ex.: 021
 * hhhhhhh indicates the term number - ex.: 0000123
 * ii indicates the Verification digits VD, of which the computation obeys the following rule, according to the
 * known VD MODULE 11:
 *
 * 1  0  4  5  3  9  0  1  5  5  2  0  1  3  1  0  0  0  1  2  0  2  1  0  0  0  0  1  2  3 = 2
 * x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x
 * 2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9
 * ----------------------------------------------------------------------------------------
 * 2+ 0+16+25+18+63+ 0+ 9+50+ 0+ 2+ 0+ 3+12+ 5+ 0+ 0+ 0+ 9+20+ 0+ 2+ 2+ 0+ 0+ 0+ 0+ 7+16+27 = 288
 *
 * 288÷11=26, with remainer 2 (this is the 1st digit of the VD) - Note: if the remainder is "10", the VD1 is "1"
 *
 * 1  0  4  5  3  9  0  1  5  5  2  0  1  3  1  0  0  0  1  2  0  2  1  0  0  0  0  1  2  3  2 = 1
 * x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x
 * 1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9
 * -------------------------------------------------------------------------------------------
 * 1+ 0+12+20+15+54+ 0+ 8+45+50+ 0+ 0+ 2+ 9+ 4+ 0+ 0+ 0+ 8+18+ 0+ 0+ 1+ 0+ 0+ 0+ 0+ 6+14+24+18 = 309
 *
 * 309÷11=28, with remainer 1 (this is the 2nd digit of the VD) - Note: if the remainder is "10", the VD2 is "1"
 *
 * Therefore, the Certificate registration number+VD = 104539.01.55.2013.1.00012.021.0000123-21
 *
 * Source: http://ghiorzi.org/DVnew.htm#zc
 *
 */
$.validator.addMethod( "matriculaCertidaoBR", function( value, element ) {
	"use strict";

	if ( this.optional( element ) ) {
		return true;
	}

	// Removing special characters from value
	value = value.replace( /([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "" );

	// Checking for dump data
	if ( value === "" ) {
		return false;
	}

	// Checking value to have 32 digits only
	if ( value.length !== 32 ) {
		return false;
	}

	var sum = 0, weight = 0,
		firstCN, secondCN, checkResult, i;

	firstCN = parseInt( value.slice( -2, -1 ), 10 );
	secondCN = parseInt( value.slice( -1 ), 10 );

	checkResult = function( sum, cn ) {
		var result = sum % 11;
		if ( ( result === 10 ) ) {
			result = 1;
		}
		return ( result === cn );
	};

	// Step 1 - using first Check Number:
	for ( i = 0; i < value.length - 2; i++ ) {
		weight = ( i + 2 ) % 11;
		sum = sum + parseInt( value.substring( i, i + 1 ), 10 ) * weight;
	}

	// If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
	if ( checkResult( sum, firstCN ) ) {
		sum = 0;
		for ( i = 0; i < value.length - 1; i = i + 1 ) {
			weight = ( i + 1 ) % 11;
			sum = sum + parseInt( value.substring( i, i + 1 ), 10 ) * weight;
		}
		return checkResult( sum, secondCN );
	}
	return false;

}, "Please specify a valid certificate registration." );
