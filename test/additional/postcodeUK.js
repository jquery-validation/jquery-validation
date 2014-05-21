module("postcodeUK");

test("postcodeUK", function() {
	var method = methodTest("postcodeUK");
	ok( method( "AA9A 9AA" ), "Valid postcode" );
	ok( method( "A9A 9AA" ), "Valid postcode" );
	ok( method( "A9 9AA" ), "Valid postcode" );
	ok( method( "A99 9AA" ), "Valid postcode" );
	ok( method( "AA9 9AA" ), "Valid postcode" );
	ok( method( "AA99 9AA" ), "Valid postcode" );

	// Channel Island
	ok(!method( "AAAA 9AA" ), "Invalid postcode" );
	ok(!method( "AA-2640" ), "Invalid postcode" );

	ok(!method( "AAA AAA" ), "Invalid postcode" );
	ok(!method( "AA AAAA" ), "Invalid postcode" );
	ok(!method( "A AAAA" ), "Invalid postcode" );
	ok(!method( "AAAAA" ), "Invalid postcode" );
	ok(!method( "999 999" ), "Invalid postcode" );
	ok(!method( "99 9999" ), "Invalid postcode" );
	ok(!method( "9 9999" ), "Invalid postcode" );
	ok(!method( "99999" ), "Invalid postcode" );
});
