jQuery.validator.addMethod("cifES",function(value, element) {

	"use strict";

	var n = 0,
		suma = 0,
		num = [],
		CIF = value.toUpperCase();


	// Basic format test 
	if (!CIF.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
		return false;
	}
	

	for (var i = 0; i < 9; i ++) {
		num[i] = CIF.substr(i, 1);
	}

	// Algoritmo para comprobacion de codigos tipo CIF
	suma = parseInt(num[2],10) + parseInt(num[4],10) + parseInt(num[6],10);
	for (var temp1=0, temp2=0, count = 1; count < 8; count += 2){
		temp1 = 2 * parseInt(num[count],10);
		temp1 += '';
		temp1 = temp1.substring(0,1);
		temp2 = 2 * parseInt(num[count],10);
		temp2 += '';
		temp2 = temp2.substring(1,2);
		if (temp2 === '') {
			temp2 = '0';
		}

		suma += (parseInt(temp1,10) + parseInt(temp2,10));
	}
	suma += '';
	n = 10 - parseInt(suma.substring(suma.length-1, suma.length),10);

	if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(CIF)){
		CIF = n + '';
		if (parseInt(num[8],10) === parseInt(String.fromCharCode(64 + n),10) || parseInt(num[8],10) === parseInt(CIF.substring(CIF.length-1, CIF.length),10)){
			return true;
		} else{
			return false;
		}
	}

	return false;

}, "Por favor, escribe un CIF válido.");