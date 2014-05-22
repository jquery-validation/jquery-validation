module("equalTo");

test("equalTo", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.equalTo,
		e = $("#text1, #text2");

	ok( method.call( v, "Test", e[0], "#text1" ), "Text input" );
	ok( method.call( v, "T", e[1], "#text2" ), "Another one" );
});
