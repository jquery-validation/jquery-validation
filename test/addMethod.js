module( "addMethod" );

test("addMethod", function() {
	expect( 3 );
	$.validator.addMethod("hi", function(value) {
		return value === "hi";
	}, "hi me too");
	var method = $.validator.methods.hi,
		e = $("#text1")[0];
	ok( !method(e.value, e), "Invalid" );
	e.value = "hi";
	ok( method(e.value, e), "Invalid" );
	ok( jQuery.validator.messages.hi === "hi me too", "Check custom message" );
});

test("addMethod2", function() {
	expect( 4 );
	$.validator.addMethod("complicatedPassword", function(value, element) {
		return this.optional(element) || /\D/.test(value) && /\d/.test(value);
	}, "Your password must contain at least one number and one letter");
	var v = jQuery("#form").validate({
			rules: {
				action: { complicatedPassword: true }
			}
		}),
		e = $("#text1")[0];

	e.value = "";
	strictEqual( v.element(e), true, "Rule is optional, valid" );
	equal( 0, v.size() );
	e.value = "ko";
	ok( !v.element(e), "Invalid, doesn't contain one of the required characters" );
	e.value = "ko1";
	ok( v.element(e) );
});
