QUnit.test( "cnhBR", function( assert ) {
	var method = methodTest( "cnhBR" );
	assert.ok( method( "00000000119" ), "Valid driver's license number" );
	assert.ok( !method( "11111111111" ), "Invalid driver's license number" );
	assert.ok( !method( "asdf" ), "Invalid driver's license number" );
} );
