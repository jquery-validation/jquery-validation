test("maxWords", function(){
	var method = methodTest("maxWords"),
		maxWords = 6;

	ok( method( "I am a sentence", maxWords), "Max Words");
	ok(!method( "I'm way too long for this sentence!", maxWords), "Too many words");
	ok(method( "Don’t “count” me as too long", maxWords), "Right amount of words with smartquotes");
	ok(!method( "But you can “count” me as too long", maxWords), "Too many words with smartquotes");
	ok(method( "<div>Don’t “count” me as too long</div>", maxWords), "Right amount of words with smartquotes w/ HTML");
	ok(!method( "<div>But you can “count” me as too long</div>", maxWords), "Too many words with smartquotes w/ HTML");
	ok( method( "hello", 2 ), "plain text, valid" );
	ok( method( "<b>world</b>", 2 ), "html, valid" );
	ok( method( "world <br/>", 2 ), "html, valid" );
	ok( method( "hello worlds", 2 ), "plain text, valid" );
	ok( method( "<b>hello</b> world", 2 ), "html, valid" );
	ok(!method( "hello 123 world", 2 ), "plain text, invalid" );
	ok(!method( "<b>hello</b> 123 world", 2 ), "html, invalid" );
});
