module("bic");

/**
 * BIC tests (For BIC definition take a look on the implementation itself)
 */
test("bic", function() {
	var method = methodTest( "bic" );

	ok( !method( "PBNKDEF" ), "Invalid BIC: too short" );
	ok( !method( "DEUTDEFFA1" ), "Invalid BIC: disallowed length" );
	ok( !method( "PBNKDEFFXXX1" ), "Invalid BIC: too long" );
	ok( !method( "1BNKDEFF" ), "Invalid BIC: invalid digit" );
	ok( !method( "PBNKDE1F" ), "Invalid BIC: invalid digit" );
	ok( !method( "PBNKDEF3" ), "Invalid BIC: invalid digit" );
	ok( !method( "PBNKDEFO" ), "Invalid BIC: invalid char" );
	ok( !method( "INGDDEFFXAA" ), "Invalid BIC: invalid char" );
	ok( !method( "DEUTDEF0" ), "Invalid BIC: invalid digit" );

	ok( method( "DEUTDEFF" ), "Valid BIC" );
	ok( method( "DEUTDEFFXXX" ), "Valid BIC" );
	ok( method( "PBNKDE2F" ), "Valid BIC" );
	ok( method( "INGDDEFF101" ), "Valid BIC" );
	ok( method( "INGDDEF2134" ), "Valid BIC" );
	ok( method( "INGDDE91XXX" ), "Valid BIC" );
	ok( method( "INGDDEF2" ), "Valid BIC" );
	ok( method( "AAFFFRP1" ), "Valid BIC" );
	ok( method( "DEUTDEFFAB1" ), "Valid BIC" );
	ok( method( "DEUTDEFFAXX" ), "Valid BIC" );
});
