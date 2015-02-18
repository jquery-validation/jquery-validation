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
$.validator.addMethod("nit_pis_pasepBR", function(numero_pis) {
	var pesos = "3298765432", resto = 0, i;
	if (!(/^\d{3}.\d{4}.\d{3}-\d{1}$|^\d{11}$/.test(numero_pis))) {
		return false;
	}
	numero_pis = numero_pis.replace(/[^\d]+/g, "");
	for (i = 0; i <= 9; i++) {
		resto += (numero_pis.slice(i, i + 1)) * (pesos.slice(i, i + 1));
	}
	resto %= 11;
	if (resto !== 0) {
		resto = 11 - resto;
	}
	if (resto === 10 || resto === 11) {
		resto = resto.slice(1, 2);
	}
	if (String(resto) !== (numero_pis.slice(10, 11))) {
		return false;
	}
	return true;
}, "Please specify a valid &quot;NIT/PIS/Pasep&quot; number.");
