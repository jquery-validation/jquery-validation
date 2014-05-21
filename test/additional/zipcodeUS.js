module("zipcodeUS");

test("zipcodeUS", function() {
	var method = methodTest("zipcodeUS");
	ok( method( "12345" ), "Valid zip" );
	ok( method( "12345-2345" ), "Valid zip" );
	ok( method( "90210-4567" ), "Valid zip" );
	ok(!method( "1" ), "Invalid zip" );
	ok(!method( "1234" ), "Invalid zip" );
	ok(!method( "123-23" ), "Invalid zip" );
	ok(!method( "12345-43" ), "Invalid zip" );
	ok(!method( "123456-7890" ), "Invalid zip" );
});
