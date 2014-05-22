module("range");

test("range", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.range,
		param = [4,12],
		e = $("#value1, #value2, #value3");

	ok(!method.call( v, e[0].value, e[0], param), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
});
