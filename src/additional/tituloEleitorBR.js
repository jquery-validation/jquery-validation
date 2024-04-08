/*
 * Calcula se um título eleitoral é válido
 *
 * Título de eleitor deve possuir 12 dígitos.
 *
 * - Os caracteres 1 a 8 são números sequenciais.
 *
 * - Os caracteres 9 e 10 representam os estados da federação onde o título
 *   foi emitido (01 = SP, 02 = MG, 03 = RJ, 04 = RS, 05 = BA, 06 = PR, 07 = CE, 08 = PE,
 *   09 = SC, 10 = GO,  11 = MA12 = PB, 13 = PA, 14 = ES, 15 = PI, 16 = RN, 17 = AL,
 *   18 = MT, 19 = MS, 20 = DF, 21 = SE, 22 = AM, 23 = RO, 24 = AC, 25 = AP, 26 = RR,
 *   27 = TO, 28 = Exterior(ZZ).
 *
 * - Os caracteres 11 e 12 são dígitos verificadores.
 *
 * 1) Partes do número
 * ------------------------------------------------
 * |       Número Sequencial      |  UF   |   DV  |
 *  1   0   2   3   8   5   0   1   0   6   7   1
 *
 * 2) Cálculo do primeiro DV.
 *
 *  - Soma-se o produto das algarismos 1 a 8 pelos números 2, 3, 4, 5, 6, 7, 8 e 9.
 *
 *   1   0   2   3   8   5   0   1
 *   x   x   x   x   x   x   x   x
 *   2   3   4   5   6   7   8   9
 * = 2 + 0 + 8 +15 +48 +35 + 0 + 9  = 117
 *
 *  - O somatório encontrado é dividido por 11. O DV1 é o resto da divisão. Se o
 *    resto for 10, o DV1 é 0.
 *
 * 2.1) 117 / 11 tem resto igual a 7.
 *
 * 3) Cálculo do segundo DV
 *
 * - Soma-se o produto dos algarismos 9 a 11 (relativos aos 2 dígitos da UF e o novo
 *   DV1 que acabou de ser calculado) e os multiplicam pelos números 7, 8 e 9. Se o
 *   resto for 10, DV2 será 0.
 *   0   6   7
 *   x   x   x
 *   7   8   9
 * = 0 +48 +63 = 111
 *
 * 3.1) 111 / 11 tem resto igual a 1.
 *
 * Fontes: http://clubes.obmep.org.br/blog/a-matematica-nos-documentos-titulo-de-eleitor/
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

			// Regra especial para São Paulo e Minas Gerais
			// Se o resto da divisão for zero, o digito
			// verificador é 1
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
