module("mobileNL");

test("mobileNL", function() {
	var method = methodTest("mobileNL");
	ok( method( "0612345678"), "Valid NL Mobile Number");
	ok( method( "06-12345678"), "Valid NL Mobile Number");
	ok( method( "06-12 345 678"), "Valid NL Mobile Number");
	ok( method( "+316-12345678"), "Valid NL Mobile Number");
	ok( method( "+31(0)6-12345678"), "Valid NL Mobile Number");
	ok(!method( "abcdefghij"), "Invalid NL Mobile Number: text");
	ok(!method( "0123456789"), "Invalid NL Mobile Number: should start with 06");
	ok(!method( "0823456789"), "Invalid NL Mobile Number: should start with 06");
	ok(!method( "06-1234567"), "Invalid NL Mobile Number: too short");
	ok(!method( "06-123456789"), "Invalid NL Mobile Number: too long");
	ok(!method( "-0612345678"), "Invalid NL Mobile Number");
	ok(!method( "+310612345678"), "Invalid NL Mobile Number: no 0 after +31 allowed");
});
