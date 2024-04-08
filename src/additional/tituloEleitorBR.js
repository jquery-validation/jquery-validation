/*
 * Brazillian voter registration number.
 *
 * Voter registration number should have 12 or 13 digits.
 *
 * - The characters 1 to 8 are sequencial numbers.
 *
 * - The characters 9 and 10 represent the federation states where the registration
 *   has been issued
 *  (01 = SP, 02 = MG, 03 = RJ, 04 = RS, 05 = BA, 06 = PR, 07 = CE, 08 = PE,
 *   09 = SC, 10 = GO,  11 = MA12 = PB, 13 = PA, 14 = ES, 15 = PI, 16 = RN, 17 = AL,
 *   18 = MT, 19 = MS, 20 = DF, 21 = SE, 22 = AM, 23 = RO, 24 = AC, 25 = AP, 26 = RR,
 *   27 = TO, 28 = Abroad(ZZ).
 *
 * - The characters 11 and 12 are verification digits.
 *
 * 1) Number parts
 * ------------------------------------------------
 * |       Sequential Number      |  UF   |   VD  |
 *  1   0   2   3   8   5   0   1   0   6   7   1
 *
 * 2) Computation of first VD.
 *
 *  - We sum the product of the numerals 1 through 8 by the numbers 2, 3, 4, 5, 6, 7, 8 and 9.
 *
 *   1   0   2   3   8   5   0   1
 *   x   x   x   x   x   x   x   x
 *   2   3   4   5   6   7   8   9
 * = 2 + 0 + 8 +15 +48 +35 + 0 + 9  = 117
 *
 *  - The resulting sum is divided by 11.
 *    The VD1 is the remainer of the division.
 *    If the remainer is 10, the VD1 is 0.
 *
 * 2.1) 117 / 11 has remainer iqual to 7.
 *
 * 3) Computation of second VD.
 *
 * - We sum the product of the numerals 9 through 11 (relative to the 2 UF digits and the new
 *   VD1 just computed before) by the numbers 7, 8 and 9.
 *   If the remainer is 10, the VD2 is 0.
 *   0   6   7
 *   x   x   x
 *   7   8   9
 * = 0 +48 +63 = 111
 *
 * 3.1) 111 / 11 has remainer iqual to 1.
 *
 * Source: http://clubes.obmep.org.br/blog/a-matematica-nos-documentos-titulo-de-eleitor/
 *         https://siga0984.wordpress.com/2019/05/01/algoritmos-validacao-de-titulo-de-eleitor/
 *
 */
$.validator.addMethod( "tituloEleitorBR", function( value, element ) {
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

	// Checking value to have 12 or 13 digits only
	if ( value.length < 12 || value.length > 13 ) {
		return false;
	}

	var ufs = {
		 1: "SP",  2: "MG",  3: "RJ",  4: "RS",  5: "BA",  6: "PR",  7: "CE",  8: "PE",  9: "SC",
		10: "GO", 11: "MA", 12: "PB", 13: "PA", 14: "ES", 15: "PI", 16: "RN", 17: "AL", 18: "MT",
		19: "MS", 20: "DF", 21: "SE", 22: "AM", 23: "RO", 24: "AC", 25: "AP", 26: "RR", 27: "TO",
		28: "ZZ"
	};

	var uf = parseInt( value.slice( -4, -2 ), 10 );

	// Checking uf
	if ( uf < 1 || uf > 28 ) {
		return false;
	}

	var sum = 0, weight = 0,
		firstCN, secondCN, checkResult, i;

	firstCN = parseInt( value.slice( -2, -1 ), 10 );
	secondCN = parseInt( value.slice( -1 ), 10 );

	checkResult = function( sum, cn, uf ) {
		var result = sum % 11;
		if ( ( result === 0 ) && ( ufs[ uf ] === "SP" || ufs[ uf ] === "MG" ) ) {

			// Special rule for the states of São Paulo and Minas Gerais
			// If the ramainder of the division is zero, the verification
			// digit is 1
			result = 1;

		} else if ( ( result === 10 ) ) {
			result = 0;
		}
		return ( result === cn );
	};

	// Step 1 - using first Check Number:
	for ( i = value.length - 4; i >= 1; i = i - 1 ) {
		weight = i + 1;
		weight = ( weight === 1 ) ? 9 : weight;
		sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * weight;
	}

	// If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
	if ( checkResult( sum, firstCN ) ) {
		sum = 0;
		for ( i = 9; i <= 11; i++ ) {
			sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * ( i - 2 );
		}
		return checkResult( sum, secondCN );
	}
	return false;

}, "Please specify a valid voter registration number." );
