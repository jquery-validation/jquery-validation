test("minWords", function(){
	var method = methodTest("minWords"),
		minWords = 6;

	ok(!method( "I am a short sentence", minWords), "Max Words");
	ok( method( "I'm way too long for this sentence!", minWords), "Too many words");
	ok(!method( "Don’t “count” me as short.", minWords), "Right amount of words with smartquotes");
	ok( method( "But you can “count” me as too short", minWords), "Too many words with smartquotes");
	ok(!method( "<div>“Count” me as too short.</div>", minWords), "Right amount of words with smartquotes w/ HTML");
	ok( method( "<div>But you can “count” me as too long</div>", minWords), "Too many words with smartquotes w/ HTML");
	ok( method( "hello worlds", 2 ), "plain text, valid" );
	ok( method( "<b>hello</b> world", 2 ), "html, valid" );
	ok(!method( "hello", 2 ), "plain text, invalid" );
	ok(!method( "<b>world</b>", 2 ), "html, invalid" );
	ok(!method( "world <br/>", 2 ), "html, invalid" );
});
