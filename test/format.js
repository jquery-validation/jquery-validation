module( "format" );

test("jQuery.validator.format", function() {
	equal( "Please enter a value between 0 and 1.", jQuery.validator.format("Please enter a value between {0} and {1}.", 0, 1) );
	equal( "0 is too fast! Enter a value smaller then 0 and at least -15", jQuery.validator.format("{0} is too fast! Enter a value smaller then {0} and at least {1}", 0, -15) );
	var template = jQuery.validator.format("{0} is too fast! Enter a value smaller then {0} and at least {1}");
	equal( "0 is too fast! Enter a value smaller then 0 and at least -15", template(0, -15) );
	template = jQuery.validator.format("Please enter a value between {0} and {1}.");
	equal( "Please enter a value between 1 and 2.", template([1, 2]) );
	equal( $.validator.format("{0}", "$0"), "$0" );
});
