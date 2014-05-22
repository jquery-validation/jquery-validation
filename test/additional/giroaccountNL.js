module("giroaccountNL");

test("giroaccountNL", function() {
	var method = methodTest("giroaccountNL");
	ok( method( "123"), "Valid NL giro account");
	ok( method( "1234567"), "Valid NL giro account");
	ok(!method( "123456788"), "Invalid NL giro account");
});
