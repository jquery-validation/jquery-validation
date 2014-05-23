module("pattern");

test("pattern", function() {
	var method = methodTest("pattern");
	ok( method( "AR1004", "AR\\d{4}" ), "Correct format for the given RegExp" );
	ok( method( "AR1004", /^AR\d{4}$/ ), "Correct format for the given RegExp" );
	ok(!method( "BR1004", /^AR\d{4}$/ ), "Invalid format for the given RegExp" );
});
