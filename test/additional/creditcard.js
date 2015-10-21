test( "creditcard", function() {
	var method = methodTest( "creditcard" );
	ok( method( "4111-1111-1111-1111" ), "Valid creditcard number" );
	ok( method( "4111 1111 1111 1111" ), "Valid creditcard number" );
	ok( !method( "41111" ), "Invalid creditcard number" );
	ok( !method( "asdf" ), "Invalid creditcard number" );
} );
