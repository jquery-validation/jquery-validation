module("dateNL");

test("dateNL", function() {
	var method = methodTest("dateNL");
	ok( method( "01-01-1900" ), "Valid date NL" );
	ok( method( "01.01.1900" ), "Valid date NL" );
	ok( method( "01/01/1900" ), "Valid date NL" );
	ok( method( "01-01-00" ), "Valid date NL" );
	ok( method( "1-01-1900" ), "Valid date NL" );
	ok( method( "10-10-1900" ), "Valid date NL" );
	ok(!method( "0-01-1900" ), "Invalid date NL" );
	ok(!method( "00-01-1900" ), "Invalid date NL" );
	ok(!method( "35-01-1990" ), "Invalid date NL" );
	ok(!method( "01.01.190" ), "Invalid date NL" );
});
