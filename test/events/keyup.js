module( "Event: keyup" );

test("validate on keyup", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	function keyup( target ) {
		target.trigger( "keyup" );
	}
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate();

	keyup( e );
	errors( 0, "No value, no errors" );
	e.val( "a" );
	keyup( e );
	errors( 0, "Value, but not invalid" );
	e.val( "" );
	v.form();
	errors(2, "Both invalid");
	keyup(e);
	errors(1, "Only one field validated, still invalid");
	e.val("hh");
	keyup(e);
	errors(0, "Not invalid anymore");
	e.val("h");
	keyup(e);
	errors(1, "Field didn't loose focus, so validate again, invalid");
	e.val("hh");
	keyup(e);
	errors(0, "Valid");
});

asyncTest("validation triggered on radio when keyup fired ", function() {
	expect( 1 );

	var $form = $( "#form" );

	$form.validate({
		onkeyup: function() {
			ok( true, "Keyup fired" );
			start();
		}
	});

	$form.find( ":radio:first" ).trigger( "keyup" );
});

asyncTest("validation triggered on checkbox when keyup fired ", function() {
	expect( 1 );

	var $form = $( "#form" );

	$form.validate({
		onkeyup: function() {
			ok( true, "Keyup fired" );
			start();
		}
	});

	$form.find( ":checkbox:first" ).trigger( "keyup" );
});
