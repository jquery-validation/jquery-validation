/*
 * TE = Número do Título Eleitoral (Number of Electoral Title)
 *
 * More information on http://pt.wikipedia.org/wiki/T%C3%ADtulo_eleitoral
 *
 * Accepted formats:
 * 9999 9999 9999
 * 999999999999
 * 99999999999
 * 999999999/99
 */
$.validator.addMethod("teBR", function(number_title) {
	var weights = "23456789", rest_dv1 = 0, rest_dv2 = 0, i;
	if (!(/^\d{12}$|^\d{4} \d{4} \d{4}$/.test(number_title))) {
		number_title = "0" + number_title;
		if (!(/^\d{12}$|^\d{10}\/\d{2}$/.test(number_title))) {
			return false;
		}
	}
	number_title = number_title.replace(/[^\d]+/g, "");
	for (i = 0; i <= 8; i++) {
		rest_dv1 += (number_title.charAt(i)) * (weights.charAt(i));
	}
	for (i = 8; i <= 10; i++) {
		rest_dv2 += (number_title.charAt(i)) * (weights.charAt(i - 3));
	}
	rest_dv1 %= 11;
	rest_dv2 %= 11;
	if (rest_dv1 === 10) {
		rest_dv1 = 0;
	}
	if (rest_dv2 === 10) {
		rest_dv2 = 0;
	}
	if ((String(rest_dv1) === number_title.charAt(10)) && (String(rest_dv2) === number_title.charAt(11))) {
		return true;
	}
	return false;
}, "Please specify a valid number.");
