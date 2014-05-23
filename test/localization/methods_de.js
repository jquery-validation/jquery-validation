module( "methods DE" );

/* disabled for now, need to figure out how to test localized methods
test("numberDE", function() {
	var method = methodTest("numberDE");
	ok( method( "123" ), "Valid numberDE" );
	ok( method( "-123" ), "Valid numberDE" );
	ok( method( "123.000" ), "Valid numberDE" );
	ok( method( "-123.000" ), "Valid numberDE" );
	ok( method( "123.000,00" ), "Valid numberDE" );
	ok( method( "-123.000,00" ), "Valid numberDE" );
	ok(!method( "123,000.00" ), "Invalid numberDE" );
	ok(!method( "123,0,0.0" ), "Invalid numberDE" );
	ok(!method( "x123" ), "Invalid numberDE" );
	ok(!method( "100,100.0.0" ), "Invalid numberDE" );

	ok( method( "" ), "Blank is valid" );
	ok( method( "123" ), "Valid decimalDE" );
	ok( method( "123000" ), "Valid decimalDE" );
	ok( method( "123000,12" ), "Valid decimalDE" );
	ok( method( "-123000,12" ), "Valid decimalDE" );
	ok( method( "123.000" ), "Valid decimalDE" );
	ok( method( "123.000,00" ), "Valid decimalDE" );
	ok( method( "-123.000,00" ), "Valid decimalDE" )
	ok(!method( "123.0.0,0" ), "Invalid decimalDE" );
	ok(!method( "x123" ), "Invalid decimalDE" );
	ok(!method( "100,100.0.0" ), "Invalid decimalDE" );
});
*/

/* disabled for now, need to figure out how to test localized methods
test("dateDE", function() {
	var method = methodTest("dateDE");
	ok( method( "03.06.1984" ), "Valid dateDE" );
	ok( method( "3.6.84" ), "Valid dateDE" );
	ok(!method( "6-6-06" ), "Invalid dateDE" );
	ok(!method( "1990-06-06" ), "Invalid dateDE" );
	ok(!method( "06/06/1990" ), "Invalid dateDE" );
	ok(!method( "6/6/06" ), "Invalid dateDE" );
});
*/
