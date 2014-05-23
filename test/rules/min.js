module("min");

test("min", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.min,
		param = 8,
		e = $("#value1, #value2, #value3");

	ok(!method.call( v, e[0].value, e[0], param), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok( method.call( v, e[2].value, e[2], param), "Valid text input" );
});
