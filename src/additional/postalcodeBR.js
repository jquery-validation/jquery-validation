/*
* Valida CEPs do brasileiros:
*
* Formatos aceitos:
* 99999-999
* 99.999-999
* 99999999
*/
$.validator.addMethod("postalcodeBR", function( cep_value ) {
	if ( /^\d{2}.\d{3}-\d{3}?$/.test( cep_value ) ){
		return true;
	}else if ( /^\d{5}-?\d{3}?$/.test( cep_value ) ){
			return true;
	}
	return false;
}, "Informe um CEP válido.");
