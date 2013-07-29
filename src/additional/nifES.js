jQuery.validator.addMethod("nifES",function(value, element) {

	"use strict";

	var NIF = value.toUpperCase(),
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
		return (letra === letradni);
	}
	// Comprobacion de NIFs especiales
	if (/^[KLM]{1}/.test(NIF)){
		return (NIF[8] === String.fromCharCode(64));
	}

	return false;

}, "Please specify a valid NIF number.");
