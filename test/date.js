module( "date" );

test("date", function() {
	var method = methodTest("date");
	ok( method( "06/06/1990" ), "Valid date" );
	ok( method( "6/6/06" ), "Valid date" );
	ok(!method( "1990x-06-06" ), "Invalid date" );
});
