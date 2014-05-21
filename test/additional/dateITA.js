module("dateITA");

test("dateITA", function() {
	var method = methodTest("dateITA");
	ok( method( "01/01/1900" ), "Valid date ITA" );
	ok( method( "17/10/2010" ), "Valid date ITA" );
	ok(!method( "01/13/1990" ), "Invalid date ITA" );
	ok(!method( "01.01.1900" ), "Invalid date ITA" );
	ok(!method( "01/01/199" ), "Invalid date ITA" );
});
