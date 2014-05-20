/* exports methodTest */

methodTest = function( methodName ) {
	var v = jQuery("#form").validate(),
		method = $.validator.methods[methodName],
		element = $("#firstname")[0];

	return function(value, param) {
		element.value = value;
		return method.call( v, value, element, param );
	};
};
