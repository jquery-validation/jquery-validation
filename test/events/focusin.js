module( "Event: focusin" );

asyncTest( "validation triggered on radio when focus in fired", function() {
	expect( 1 );

	$( "#form_radio" ).validate({
		onfocusin: function() {
			ok( true, "Focus In fired" );
			start();
		}
	});

	$( "#form_radio :radio:first" ).trigger( "focusin" );
});

asyncTest( "validation triggered on radio/checkbox when focus in fired", function() {
	expect( 1 );

	$( "#form_checkbox" ).validate({
		onfocusin: function() {
			ok( true, "Focus In fired" );
			start();
		}
	});

	$( "#form_checkbox :checkbox:first" ).trigger( "focusin" );
});
