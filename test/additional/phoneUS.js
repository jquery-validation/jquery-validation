module("phoneUS");

test("phone (us)", function() {
	var method = methodTest("phoneUS");
	ok( method( "1(212)-999-2345" ), "Valid US phone number" );
	ok( method( "212 999 2344" ), "Valid US phone number" );
	ok( method( "212-999-0983" ), "Valid US phone number" );
	ok(!method( "111-123-5434" ), "Invalid US phone number. Area Code cannot start with 1" );
	ok(!method( "212 123 4567" ), "Invalid US phone number. NXX cannot start with 1" );
	ok(!method( "234-911-5678" ), "Invalid US phone number, because the exchange code cannot be in the form N11" );
	ok(!method( "911-333-5678" ), "Invalid US phone number, because the area code cannot be in the form N11" );
	ok(method( "234-912-5678" ), "Valid US phone number" );
});
