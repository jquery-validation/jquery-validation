module( "Event: focusout" );

asyncTest( "validation triggered on checkbox focus out fired", function() {
	expect( 1 );

	$( "#form_checkbox" ).validate({
		onfocusout: function() {
			ok( true, "Focus Out fired" );
			start();
		}
	});

	$( "#form_checkbox :checkbox:first" ).trigger( "focusout" );
});


asyncTest( "validation triggered on radio focus out fired", function() {
	expect( 1 );

	$( "#form_radio" ).validate({
		onfocusout: function() {
			ok( true, "Focus Out fired" );
			start();
		}
	});

	$( "#form_radio :radio:first" ).trigger( "focusout" );
});
