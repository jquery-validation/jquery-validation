module( "required" );

test("required", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.required,
		e = $("#text1, #text1b, #hidden2, #select1, #select2");
	ok( method.call( v, e[0].value, e[0]), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid text input" );
	ok(!method.call( v, e[1].value, e[2]), "Invalid text input" );

	ok(!method.call( v, e[2].value, e[3]), "Invalid select" );
	ok( method.call( v, e[3].value, e[4]), "Valid select" );

	e = $("#area1, #area2, #pw1, #pw2");
	ok( method.call( v, e[0].value, e[0]), "Valid textarea" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid textarea" );
	ok( method.call( v, e[2].value, e[2]), "Valid password input" );
	ok(!method.call( v, e[3].value, e[3]), "Invalid password input" );

	e = $("#radio1, #radio2, #radio3");
	ok(!method.call( v, e[0].value, e[0]), "Invalid radio" );
	ok( method.call( v, e[1].value, e[1]), "Valid radio" );
	ok( method.call( v, e[2].value, e[2]), "Valid radio" );

	e = $("#check1, #check2");
	ok( method.call( v, e[0].value, e[0]), "Valid checkbox" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid checkbox" );

	e = $("#select1, #select2, #select3, #select4");
	ok(!method.call( v, e[0].value, e[0]), "Invalid select" );
	ok( method.call( v, e[1].value, e[1]), "Valid select" );
	ok( method.call( v, e[2].value, e[2]), "Valid select" );
	ok( method.call( v, e[3].value, e[3]), "Valid select" );
});

test("required with dependencies", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.required,
		e = $("#hidden2, #select1, #area2, #radio1, #check2");
	ok( method.call( v, e[0].value, e[0], "asffsaa" ), "Valid text input due to dependency not met" );
	ok(!method.call( v, e[0].value, e[0], "input" ), "Invalid text input" );
	ok( method.call( v, e[0].value, e[0], function() { return false; }), "Valid text input due to dependency not met" );
	ok(!method.call( v, e[0].value, e[0], function() { return true; }), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], "asfsfa" ), "Valid select due to dependency not met" );
	ok(!method.call( v, e[1].value, e[1], "input" ), "Invalid select" );
	ok( method.call( v, e[2].value, e[2], "asfsafsfa" ), "Valid textarea due to dependency not met" );
	ok(!method.call( v, e[2].value, e[2], "input" ), "Invalid textarea" );
	ok( method.call( v, e[3].value, e[3], "asfsafsfa" ), "Valid radio due to dependency not met" );
	ok(!method.call( v, e[3].value, e[3], "input" ), "Invalid radio" );
	ok( method.call( v, e[4].value, e[4], "asfsafsfa" ), "Valid checkbox due to dependency not met" );
	ok(!method.call( v, e[4].value, e[4], "input" ), "Invalid checkbox" );
});

test("validating multiple checkboxes with 'required'", function() {
	expect(3);
	var checkboxes = $("#form input[name=check3]").prop("checked", false),
		v;
	equal(checkboxes.size(), 5);

	v = $("#form").validate({
		rules: {
			check3: "required"
		}
	});
	v.form();

	equal(v.size(), 1);
	checkboxes.filter(":last").prop("checked", true);
	v.form();
	equal(v.size(), 0);
});
