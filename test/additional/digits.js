module( "digits" );

test("digits", function() {
	var method = methodTest("digits");
	ok( method( "123" ), "Valid digits" );
	ok(!method( "123.000" ), "Invalid digits" );
	ok(!method( "123.000,00" ), "Invalid digits" );
	ok(!method( "123.0.0,0" ), "Invalid digits" );
	ok(!method( "x123" ), "Invalid digits" );
	ok(!method( "100.100,0,0" ), "Invalid digits" );
});
