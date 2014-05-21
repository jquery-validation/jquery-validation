module("messages");

test("default messages", function() {
	var m = $.validator.methods;
	$.each(m, function(key) {
		ok( jQuery.validator.messages[key], key + " has a default message." );
	});
});

test("messages", function() {
	var m = jQuery.validator.messages;
	equal( "Please enter no more than 0 characters.", m.maxlength(0) );
	equal( "Please enter at least 1 characters.", m.minlength(1) );
	equal( "Please enter a value between 1 and 2 characters long.", m.rangelength([1, 2]) );
	equal( "Please enter a value less than or equal to 1.", m.max(1) );
	equal( "Please enter a value greater than or equal to 0.", m.min(0) );
	equal( "Please enter a value between 1 and 2.", m.range([1, 2]) );
});
