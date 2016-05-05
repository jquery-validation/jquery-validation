QUnit.test( "creditcard", function( assert ) {
	var method = methodTest( "creditcard" );
	assert.ok( method( "4111-1111-1111-1111" ), "Valid creditcard number" );
	assert.ok( method( "4111 1111 1111 1111" ), "Valid creditcard number" );
	assert.ok( !method( "41111" ), "Invalid creditcard number" );
	assert.ok( !method( "asdf" ), "Invalid creditcard number" );
} );
