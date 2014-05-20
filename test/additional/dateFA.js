test("dateFA", function() {
	var method = methodTest("dateFA");

	ok( method( "1342/12/29" ), "Valid date FA" );
	ok( method( "1342/12/30" ), "Valid date FA" );
	ok( method( "1361/6/31" ), "Valid date FA" );
	ok( method( "1321/11/30" ), "Valid date FA" );
	ok( method( "1361/1/1" ), "Valid date FA" );
	ok( method( "1020/3/3" ), "Valid date FA" );
	ok( method( "1020/03/3" ), "Valid date FA" );
	ok( method( "1020/3/03" ), "Valid date FA" );
	ok( method( "1020/03/03" ), "Valid date FA" );
	ok( method( "1001/7/30" ), "Valid date FA" );

	ok(!method( "1000/1/32" ), "Invalid date FA" );
	ok(!method( "1323/12/31" ), "Invalid date FA" );
	ok(!method( "1361/0/11" ), "Invalid date FA" );
	ok(!method( "63/4/4" ), "Invalid date FA" );
	ok(!method( "15/6/1361" ), "Invalid date FA" );
});
