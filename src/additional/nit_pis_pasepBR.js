/*
 * NIT = Número de Identificação do Trabalhador (Worker Identification Number)
 * PIS = Programa de Integração Social (Social Integration Program)
 * Pasep = Programa de Formação do Patrimônio do Servidor Público (Civil Service Asset Formation Program)
 * More information on http://pt.wikipedia.org/wiki/PIS/PASEP_(contribui%C3%A7%C3%A3o)
 *
 * Accepted formats:
 * 99999999999
 * 999.9999.999-99
 */
$.validator.addMethod("nit_pis_pasepBR", function(number_pis) {
	var weights = "3298765432", rest = 0, i;
	if (!(/^\d{3}.\d{4}.\d{3}-\d{1}$|^\d{11}$/.test(number_pis))) {
		return false;
	}
	number_pis = number_pis.replace(/[^\d]+/g, "");
	for (i = 0; i <= 9; i++) {
		rest += (number_pis.slice(i, i + 1)) * (weights.slice(i, i + 1));
	}
	rest %= 11;
	if (rest !== 0) {
		rest = 11 - rest;
	}
	if (rest === 10 || rest === 11) {
		rest = rest.slice(1, 2);
	}
	if (String(rest) !== (number_pis.slice(10, 11))) {
		return false;
	}
	return true;
}, "Please specify a valid &quot;NIT/PIS/Pasep&quot; number.");
