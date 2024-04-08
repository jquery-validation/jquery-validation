QUnit.test( "tituloEleitorBR", function( assert ) {
	var method = methodTest( "tituloEleitorBR" );
	assert.ok( method( "743650641660" ), "Valid voter registration number" );
	assert.ok( method( "525028881694" ), "Valid voter registration number" );
	assert.ok( method( "102385010671" ), "Valid voter registration number" );
	assert.ok( !method( "153016161686" ), "Invalid voter registration number" );
	assert.ok( !method( "01234567890" ), "Invalid voter registration number" );
} );
