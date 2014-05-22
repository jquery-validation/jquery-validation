module("rangelength");

test("rangelength", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.rangelength,
		param = [2, 4],
		e = $("#text1, #text2, #text3");

	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
});
