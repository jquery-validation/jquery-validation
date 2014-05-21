module("bankaccountNL");

test("bankaccountNL", function() {
	var method = methodTest("bankaccountNL");
	ok( method( "755490975"), "Valid NL bank account");
	ok( method( "75 54 90 975"), "Valid NL bank account");
	ok( method( "123456789"), "Valid NL bank account");
	ok( method( "12 34 56 789"), "Valid NL bank account");
	ok(!method( "12 3456789"), "Valid NL bank account: inconsistent spaces");
	ok(!method( "123 45 67 89"), "Valid NL bank account: incorrect spaces");
	ok(!method( "755490971"), "Invalid NL bank account");
	ok(!method( "755490973"), "Invalid NL bank account");
	ok(!method( "755490979"), "Invalid NL bank account");
	ok(!method( "123456781"), "Invalid NL bank account");
	ok(!method( "123456784"), "Invalid NL bank account");
	ok(!method( "123456788"), "Invalid NL bank account");
});
