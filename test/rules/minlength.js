module( "minlength" );

test("minlength", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.minlength,
		param = 2,
		e = $("#text1, #text1c, #text2, #text3");
	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
	ok( method.call( v, e[3].value, e[3], param), "Valid text input" );

	e = $("#check1, #check2, #check3");
	ok(!method.call( v, e[0].value, e[0], param), "Valid checkbox" );
	ok( method.call( v, e[1].value, e[1], param), "Valid checkbox" );
	ok( method.call( v, e[2].value, e[2], param), "Invalid checkbox" );

	e = $("#select1, #select2, #select3, #select4, #select5");
	ok(method.call( v, e[0].value, e[0], param), "Valid select " + e[0].id );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid select " + e[1].id );
	ok( method.call( v, e[2].value, e[2], param), "Valid select " + e[2].id );
	ok( method.call( v, e[3].value, e[3], param), "Valid select " + e[3].id );
	ok( method.call( v, e[4].value, e[4], param), "Valid select " + e[4].id );
});
