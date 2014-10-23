/*
 * TE = Número do Título Eleitoral
 *
 * Mais informações em http://pt.wikipedia.org/wiki/T%C3%ADtulo_eleitoral
 *
 * Formatos aceitos:
 * 9999 9999 9999
 * 999999999999
 * 99999999999
 * 999999999/99
 */
$.validator.addMethod("teBR", function(numero_titulo) {
	var pesos = "23456789", resto_dv1 = 0, resto_dv2 = 0, i;
	if (!(/^\d{12}$|^\d{4} \d{4} \d{4}$/.test(numero_titulo))) {
		numero_titulo = "0" + numero_titulo;
		if (!(/^\d{12}$|^\d{10}\/\d{2}$/.test(numero_titulo))) {
			return false;
		}
	}
	numero_titulo = numero_titulo.replace(/[^\d]+/g, "");
	for (i = 0; i <= 8; i++) {
		resto_dv1 += (numero_titulo.charAt(i)) * (pesos.charAt(i));
	}
	for (i = 8; i <= 10; i++) {
		resto_dv2 += (numero_titulo.charAt(i)) * (pesos.charAt(i - 3));
	}
	resto_dv1 %= 11;
	resto_dv2 %= 11;
	if (resto_dv1 === 10) {
		resto_dv1 = 0;
	}
	if (resto_dv2 === 10) {
		resto_dv2 = 0;
	}
	if ((String(resto_dv1) === numero_titulo.charAt(10)) && (String(resto_dv2) === numero_titulo.charAt(11))) {
		return true;
	}
	return false;
}, "Por favor, forne&ccedil;a um &quot;T&iacute;tulo&quot; v&aacute;lido.");
