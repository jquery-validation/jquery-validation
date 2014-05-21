module( "email" );

test("email", function() {
	var method = methodTest("email");
	ok( method( "name@domain.tld" ), "Valid email" );
	ok( method( "name@domain.tl" ), "Valid email" );
	ok( method( "bart+bart@tokbox.com" ), "Valid email" );
	ok( method( "bart+bart@tokbox.travel" ), "Valid email" );
	ok( method( "n@d.tld" ), "Valid email" );
	ok( method( "bla.blu@g.mail.com"), "Valid email" );
	ok( method( "name@domain" ), "Valid email" );
	ok( method( "name.@domain.tld" ), "Valid email" );
	ok( method( "name@website.a" ), "Valid email" );
	ok(!method( "ole@føtex.dk"), "Invalid email" );
	ok(!method( "jörn@bassistance.de"), "Invalid email" );
	ok(!method( "name" ), "Invalid email" );
	ok(!method( "test@test-.com" ), "Invalid email" );
	ok(!method( "name@" ), "Invalid email" );
	ok(!method( "name,@domain.tld" ), "Invalid email" );
	ok(!method( "name;@domain.tld" ), "Invalid email" );
	ok(!method( "name;@domain.tld." ), "Invalid email" );
});
