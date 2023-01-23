QUnit.test( "vinUS", function( assert ) {
	var method = methodTest( "vinUS" );
	assert.ok( method( "11111111111111111" ), "Valid test VIN  number" );
	assert.ok( method( "1FTFX1CT9CFD06231" ), "Valid US VIN number" );
	assert.ok( method( "2FTHF26F8SCA68695" ), "Valid CAN VIN  number" );
	assert.ok( method( "LJCPCBLCX11000237" ), "Valid VIN with X check digit" );
	assert.ok( !method( "LJCPCBLC011000237" ), "Invalid VIN with 0 check digit" );
	assert.ok( !method( "2FTHF26F8" ), "InValid VIN  number" );
	assert.ok( !method( "11111111X1111111" ), "Invalid test VIN" );
	assert.ok( !method( "1111111101111111" ), "Invalid test VIN" );
} );
