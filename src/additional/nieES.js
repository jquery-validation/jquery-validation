jQuery.validator.addMethod("nieES",function(value, element) {

	"use strict";

	var n = 0, 
		suma = 0,
		pos = '',
		NIE = value.toUpperCase(),
		cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE";

	// Basic format test 
	if (!NIE.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
		return false;
	}


	//comprobacion de NIEs
	//T
	if (/^[T]{1}/.test(NIE)){
		if (NIE[8] === /^[T]{1}[A-Z0-9]{8}$/.test(NIE)){
			return true;
		}else{
			return false;
		}
	}

	//XYZ
	if (/^[XYZ]{1}/.test(NIE)){
		pos = NIE.replace('X','0');
		pos = pos.replace('Y','1');
		pos = pos.replace('Z','2');
		pos = pos.substring(0, 8) % 23;
		if (NIE[8] === cadenadni.substring(pos, pos + 1)){
			return true;
		}
		else{
			return false;
		}
	}

	return false;

}, "Por favor, escribe un NIE válido.");

