QUnit.test( "matriculaCertidaoBR", function( assert ) {
	var method = methodTest( "matriculaCertidaoBR" );
	assert.ok( method( "10453901552013100012021000012321" ), "Valid certificate registration" );
	assert.ok( !method( "10453901552013100012021000012322" ), "Invalid certificate registration" );
} );
