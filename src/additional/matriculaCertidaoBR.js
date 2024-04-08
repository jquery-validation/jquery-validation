/*
 * Calcula se uma matrícula de Certidão de Nascimento, Casamento ou Óbito é válida
 *
 * O Número de Matrícula tem a configuração aaaaaa.bb.cc.dddd.e.fffff.ggg.hhhhhhh-ii, onde:
 *
 * aaaaaa indica o Código Nacional da Serventia (identificação única do cartório) ex.: 10453-9 (v. Nota final)
 * bb indica o Código do Acervo (01-Acervo Próprio e 02-Acervos incorporados)
 * cc indica o Tipo de Serviço Prestado (55 - Serviço de Registro Civil das Pessoas Naturais)
 * dddd indica o Ano do Registro - ex.: 2013
 * e indica o Tipo do livro - 1-Livro A (Nascimento),
 *                            2-Livro B (Casamento),
 *                            3-Livro B Auxiliar (Registro de casamentos religiosos para fins civis),
 *                            4-Livro C (Óbito),
 *                            5-Livro C Auxiliar (Registro de Natimortos),
 *                            6-Livro D (Registro de Proclamas),
 *                            7-Livro E (Demais atos relativos ao Registro Civil ou Livro E Único),
 *                            8-Livro E (Desdobrado para registro específico das Emancipações) e
 *                            9-Livro E (Desdobrado para registro específico das Interdições)
 * fffff indica o Número do livro - ex.: 00012
 * ggg indica o Número da folha - ex.: 021
 * hhhhhhh indica o Número do Termo - ex.: 0000123
 * ii indica o Dígito Verificador DV, cujo cálculo obedece ao seguinte esquema, dentro do critério
 * de DV MÓDULO 11 já conhecido:
 *
 * 1  0  4  5  3  9  0  1  5  5  2  0  1  3  1  0  0  0  1  2  0  2  1  0  0  0  0  1  2  3 = 2
 * x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x
 * 2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9
 * ----------------------------------------------------------------------------------------
 * 2+ 0+16+25+18+63+ 0+ 9+50+ 0+ 2+ 0+ 3+12+ 5+ 0+ 0+ 0+ 9+20+ 0+ 2+ 2+ 0+ 0+ 0+ 0+ 7+16+27 = 288
 *
 * 288÷11=26, com resto 2 (este  o 1º dígito do DV) - Nota: se o resto for "10", o DV será "1"
 *
 * 1  0  4  5  3  9  0  1  5  5  2  0  1  3  1  0  0  0  1  2  0  2  1  0  0  0  0  1  2  3  2 = 1
 * x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x  x
 * 1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9 10  0  1  2  3  4  5  6  7  8  9
 * -------------------------------------------------------------------------------------------
 * 1+ 0+12+20+15+54+ 0+ 8+45+50+ 0+ 0+ 2+ 9+ 4+ 0+ 0+ 0+ 8+18+ 0+ 0+ 1+ 0+ 0+ 0+ 0+ 6+14+24+18 = 309
 *
 * 309÷11=28, com resto 1 (este é o 2º dígito do DV) - Nota: se o resto for "10", o DV será "1"
 *
 * Portanto, o Número de Matrícula+DV = 104539.01.55.2013.1.00012.021.0000123-21
 *
 * Fonte: http://ghiorzi.org/DVnew.htm#zc
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
