/* exports methodTest */

methodTest = function( methodName ) {
	var $fixture = $( "#qunit-fixture" ),
		$form = $fixture.append( "<form id='form_" + methodName + "'><input type='text' id='element_" + methodName + "' /></form>" ),
		validator = $form.validate(),
		method = $.validator.methods[methodName],
		element = $("#element_" + methodName)[0];

	return function(value, param) {
		element.value = value;
		return method.call( validator, value, element, param );
	};
};
