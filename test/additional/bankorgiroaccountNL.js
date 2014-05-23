module("bankorgiroaccountNL");

test("bankorgiroaccountNL", function() {
	var method = methodTest("bankorgiroaccountNL");
	ok( method( "123"), "Valid NL giro account");
	ok( method( "1234567"), "Valid NL giro account");
	ok( method( "123456789"), "Valid NL bank account");
	ok(!method( "12345678"), "Invalid NL bank or giro account");
	ok(!method( "123456788"), "Invalid NL bank or giro account");
});
