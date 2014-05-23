module("maxlength");

test("maxlength", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.maxlength,
		param = 4,
		e = $("#text1, #text2, #text3");

	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );

	e = $("#check1, #check2, #check3");
	ok( method.call( v, e[0].value, e[0], param), "Valid checkbox" );
	ok( method.call( v, e[1].value, e[1], param), "Invalid checkbox" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid checkbox" );

	e = $("#select1, #select2, #select3, #select4");
	ok( method.call( v, e[0].value, e[0], param), "Valid select" );
	ok( method.call( v, e[1].value, e[1], param), "Valid select" );
	ok( method.call( v, e[2].value, e[2], param), "Valid select" );
	ok(!method.call( v, e[3].value, e[3], param), "Invalid select" );
});
