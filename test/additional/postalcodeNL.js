module("postalcodeNL");

test("postalcodeNL", function() {
	var method = methodTest("postalcodeNL");
	ok( method( "1234AB"), "Valid NL Postal Code");
	ok( method( "1234ab"), "Valid NL Postal Code");
	ok( method( "1234 AB"), "Valid NL Postal Code");
	ok( method( "6789YZ"), "Valid NL Postal Code");
	ok(!method( "123AA"), "Invalid NL Postal Code: not enough digits");
	ok(!method( "12345ZZ"), "Invalid NL Postal Code: too many digits");
	ok(!method( "1234  AA"), "Invalid NL Postal Code: too many spaces");
	ok(!method( "AA1234"), "Invalid NL Postal Code");
	ok(!method( "1234-AA"), "Invalid NL Postal Code");
});
