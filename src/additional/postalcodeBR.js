/*
* Valida CEPs do brasileiros:
*
*
*
* Formato aceito 99999-999
*
*
*/
$.validator.addMethod("postalcodeBR", function(cep_value, element) {
	return this.optional(element) || /^\d{5}-\d{3}?$/.test(cep_value);
}, "Informe um CEP válido.");
