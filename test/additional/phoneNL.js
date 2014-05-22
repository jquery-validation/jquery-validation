module("phoneNL");

test("phoneNL", function() {
	var method = methodTest("phoneNL");
	ok( method( "0701234567"), "Valid phone NL");
	ok( method( "0687654321"), "Valid phone NL");
	ok( method( "020-1234567"), "Valid phone NL");
	ok( method( "020 - 12 34 567"), "Valid phone NL");
	ok( method( "010-2345678"), "Valid phone NL");
	ok( method( "+3120-1234567"), "Valid phone NL");
	ok( method( "+31(0)10-2345678"), "Valid phone NL");
	ok(!method( "020-123456"), "Invalid phone NL: too short");
	ok(!method( "020-12345678"), "Invalid phone NL: too long");
	ok(!method( "-0201234567"), "Invalid phone NL");
	ok(!method( "+310201234567"), "Invalid phone NL: no 0 after +31 allowed");
});
