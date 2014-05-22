module("time12h");

test("time12h", function() {
	var method = methodTest("time12h");
	ok( method( "12:00 AM" ), "Valid time, lower bound, am" );
	ok( method( "11:59 AM" ), "Valid time, upper bound, am" );
	ok( method( "12:00AM" ), "Valid time, no space, am" );
	ok( method( "12:00PM" ), "Valid time, no space, pm" );
	ok( method( "12:00 PM" ), "Valid time, lower bound, pm" );
	ok( method( "11:59 PM" ), "Valid time, upper bound, pm" );
	ok( method( "11:59 am" ), "Valid time, also accept lowercase" );
	ok( method( "11:59 pm" ), "Valid time, also accept lowercase" );
	ok( method( "1:59 pm" ), "Valid time, single hour, no leading 0" );
	ok( method( "01:59 pm" ), "Valid time, single hour, leading 0" );
	ok(!method( "12:00" ), "Invalid time" );
	ok(!method( "9" ), "Invalid time" );
	ok(!method( "9 am"), "Invalid time" );
	ok(!method( "12:61 am" ), "Invalid time" );
	ok(!method( "13:00 am" ), "Invalid time" );
	ok(!method( "00:00 am" ), "Invalid time" );
});
