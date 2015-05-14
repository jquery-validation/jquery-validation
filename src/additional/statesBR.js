/* Validates Brazilian state
*  Can be case insensitive or require capitalization - default is case insensitive
*  Can include the Federal District or not - default does not
*  Usage examples:
*
*  This is the default - case insensitive, no include Federal District
*  stateInput: {
*     caseSensitive: false
*  }
*
*  Only allow capital letters
*  stateInput: {
*     caseSensitive: true
*  }
*
*/
$.validator.addMethod("stateBR", function(value, element, options) {
	var isDefault = typeof options === "undefined",
		caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive,
		regex;
	regex = "^(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)$";
	regex = caseSensitive ? new RegExp(regex) : new RegExp(regex, "i");
	return this.optional(element) || regex.test(value);
}, "Please specify a valid state");
