test("rangeWords", function(){
	var method = methodTest("rangeWords"),
		rangeWords = [3,6];

	ok(!method( "I'm going to be longer than “six words!”", rangeWords), "Longer than 6 with smartquotes");
	ok( method( "I'm just the right amount!", rangeWords), "In between");
	ok( method( "Super short sentence’s.", rangeWords), "Low end");
	ok(!method( "I", rangeWords), "Too short");
	ok( method( "<div>“Count” me as perfect.</div>", rangeWords), "Right amount of words with smartquotes w/ HTML");
	ok(!method( "<div>But you can “count” me as too long</div>", rangeWords), "Too many words with smartquotes w/ HTML");
});
