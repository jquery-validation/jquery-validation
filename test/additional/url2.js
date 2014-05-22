module( "url2" );

test("url2 (tld optional)", function() {
	var method = methodTest("url2");
	ok( method( "http://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "https://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "ftp://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "http://www.føtex.dk/" ), "Valid url, danish unicode characters" );
	ok( method( "http://bösendorfer.de/" ), "Valid url, german unicode characters" );
	ok( method( "http://192.168.8.5" ), "Valid IP Address" );
	ok(!method( "http://192.168.8." ), "Invalid IP Address" );
	ok( method( "http://bassistance" ), "Invalid url" );
	ok( method( "http://bassistance." ), "Invalid url" );
	ok(!method( "http://bassistance,de" ), "Invalid url" );
	ok(!method( "http://bassistance;de" ), "Invalid url" );
	ok(!method( "http://.bassistancede" ), "Invalid url" );
	ok(!method( "bassistance.de" ), "Invalid url" );
});
