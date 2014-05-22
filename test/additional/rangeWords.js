test("rangeWords", function(){
	var method = methodTest("rangeWords"),
		rangeWords = [3,6];

	ok(!method( "I'm going to be longer than “six words!”", rangeWords), "Longer than 6 with smartquotes");
	ok( method( "I'm just the right amount!", rangeWords), "In between");
	ok( method( "Super short sentence’s.", rangeWords), "Low end");
	ok(!method( "I", rangeWords), "Too short");
	ok( method( "<div>“Count” me as perfect.</div>", rangeWords), "Right amount of words with smartquotes w/ HTML");
	ok(!method( "<div>But you can “count” me as too long</div>", rangeWords), "Too many words with smartquotes w/ HTML");
	ok( method( "hello", [0, 2] ), "plain text, valid" );
	ok( method( "hello worlds", [0, 2] ), "plain text, valid" );
	ok( method( "<b>hello</b> world", [0, 2] ), "html, valid" );
	ok(!method( "hello worlds what is up", [0, 2] ), "plain text, invalid" );
	ok(!method( "<b>Hello</b> <b>world</b> <b>hello</b>", [0, 2] ), "html, invalid" );
});
