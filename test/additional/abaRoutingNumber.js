QUnit.test( "abaRoutingNumber", function( assert ) {
	var method = methodTest( "abaRoutingNumber" );

	// Bounds
	assert.ok( !method( "12345678" ), "Invalid routing number." );
	assert.ok( !method( "1234567890" ), "Invalid routing number." );

	// Checksum
	assert.ok( !method( "123456789" ), "Invalid routing number." );
	assert.ok( method( "123456780" ), "Valid routing number." );
	assert.ok( method( "123123123" ), "Valid routing number." );
	assert.ok( method( "021000021" ), "Valid routing number." );
	assert.ok( method( "011401533" ), "Valid routing number." );
	assert.ok( method( "091000019" ), "Valid routing number." );

	// Garbage
	assert.ok( !method( "asdf" ), "Invalid routing number." );
	assert.ok( !method( "asdfasdfa" ), "Invalid routing number." );
	assert.ok( !method( "&&abcdefg" ), "Invalid routing number." );
	assert.ok( !method( "||abcdefg" ), "Invalid routing number." );
	assert.ok( !method( "!abcdefgh" ), "Invalid routing number." );
	assert.ok( !method( "abcd+efgh" ), "Invalid routing number." );
} );
