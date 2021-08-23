/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @example $.validator.methods.pattern("ar1004",element,["AR\d{4}",true])
* @result true
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod( "pattern", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}
	var ignoreCase = false;
	if ( Array.isArray( param ) ) {
		ignoreCase = ( typeof param[1] === "boolean" && param[1] );
		param = param[0];
	}
	if ( typeof param === "string" ) {
		param = new RegExp( "^(?:" + param + ")$", ignoreCase ? "i" : "" );
	}
	return param.test( value );
}, "Invalid format." );
