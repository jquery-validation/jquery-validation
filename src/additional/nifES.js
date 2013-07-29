jQuery.validator.addMethod("nifES",function(value, element) {

	"use strict";

	var n = 0, 
		suma = 0,
		num = [],
		NIF = value.toUpperCase(),
		letradni=NIF.charAt(8),
		cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE",
		posicion = NIF.substring(8,0) % 23,
		letra = cadenadni.charAt(posicion);

	// Basic format test 
	if (!NIF.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
		return false;
	}

	// Comprobacion de NIFs
	if (/^[0-9]{8}[A-Z]{1}$/.test(NIF)){
		if (letra === letradni){
			return true;
		}
		else{
			return false;
		}
	}
	// Comprobacion de NIFs especiales
	if (/^[KLM]{1}/.test(NIF)){
		if (NIF[8] === String.fromCharCode(64 + n)){
			return true;
		}
		else {
			return false;
		}
	}

	return false;

}, "Por favor, escribe un NIF válido");
