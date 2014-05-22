module("time");

test("time", function() {
	var method = methodTest("time");
	ok( method( "00:00" ), "Valid time, lower bound" );
	ok( method( "23:59" ), "Valid time, upper bound" );
	ok(!method( "12" ), "Invalid time" );
	ok(!method( "29:59" ), "Invalid time" );
	ok(!method( "00:60" ), "Invalid time" );
	ok(!method( "24:60" ), "Invalid time" );
	ok(!method( "24:00" ), "Invalid time" );
	ok(!method( "30:00" ), "Invalid time" );
	ok(!method( "29:59" ), "Invalid time" );
	ok(!method( "120:00" ), "Invalid time" );
	ok(!method( "12:001" ), "Invalid time" );
	ok(!method( "12:00a" ), "Invalid time" );
});
