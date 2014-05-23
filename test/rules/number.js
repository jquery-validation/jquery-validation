module( "number" );

test("number", function() {
	var method = methodTest("number");
	ok( method( "123" ), "Valid number" );
	ok( method( "-123" ), "Valid number" );
	ok( method( "123,000" ), "Valid number" );
	ok( method( "-123,000" ), "Valid number" );
	ok( method( "123,000.00" ), "Valid number" );
	ok( method( "-123,000.00" ), "Valid number" );
	ok(!method( "123.000,00" ), "Invalid number" );
	ok(!method( "123.0.0,0" ), "Invalid number" );
	ok(!method( "x123" ), "Invalid number" );
	ok(!method( "100.100,0,0" ), "Invalid number" );

	ok( method( "" ), "Blank is valid" );
	ok( method( "123" ), "Valid decimal" );
	ok( method( "123000" ), "Valid decimal" );
	ok( method( "123000.12" ), "Valid decimal" );
	ok( method( "-123000.12" ), "Valid decimal" );
	ok( method( "123.000" ), "Valid decimal" );
	ok( method( "123,000.00" ), "Valid decimal" );
	ok( method( "-123,000.00" ), "Valid decimal" );
	ok( method( ".100" ), "Valid decimal" );
	ok(!method( "1230,000.00" ), "Invalid decimal" );
	ok(!method( "123.0.0,0" ), "Invalid decimal" );
	ok(!method( "x123" ), "Invalid decimal" );
	ok(!method( "100.100,0,0" ), "Invalid decimal" );
});