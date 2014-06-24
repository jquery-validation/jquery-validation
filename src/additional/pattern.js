/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod("pattern", function(value, element, param) {
	if (this.optional(element)) {
		return true;
	}
	if (typeof param === "string") {
		// checks for beginning and ending of regex with possible i,g,m modifiers
		var modReg = new RegExp("^([^\w0-9])(.*)\\1([igm]{1,3})$"),
			modifier = "";
		if (modReg.test(param)) {
			var matches = modReg.exec(param);
			param = matches[2];
			modifier = matches[3];
		}
		param = new RegExp(param, modifier);
	}
	return param.test(value);
}, "Invalid format.");
