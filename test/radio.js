module( "Radio Buttons" );

test("form(): radio buttons: required", function () {
	expect( 6 );
	var form = $("#testForm10")[0],
		v = $(form).validate({ rules: { testForm10Radio: "required"} });

	ok(!v.form(), "Invalid Form");
	equal($("#testForm10Radio1").attr("class"), "error");
	equal($("#testForm10Radio2").attr("class"), "error");

	$("#testForm10Radio2").attr("checked", true);
	ok(v.form(), "Valid form");

	equal($("#testForm10Radio1").attr("class"), "valid");
	equal($("#testForm10Radio2").attr("class"), "valid");
});

test("validate radio on click", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	function trigger(element) {
		element.click();
		// triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $("#radio1"),
		e2 = $("#radio1a"),
		v = $("#form").validate({
			rules: {
				radio1: "required"
			}
		});

	errors(0);
	equal( false, v.form() );
	errors(1);
	trigger(e2);
	errors(0);
	trigger(e1);
	errors(0);
});

test("hide(): radio", function() {
	expect( 2 );
	var errorLabel = $("#agreeLabel"),
		element = $("#agb")[0],
		v;

	element.checked = true;
	v = $("#testForm2").validate({ errorClass: "xerror" });
	errorLabel.show();

	ok( errorLabel.is(":visible"), "Error label visible after validation" );
	v.element(element);
	ok( errorLabel.is(":hidden"), "Error label not visible after hiding it" );
});

asyncTest("validation triggered on radio when keyup fired ", function() {
	expect( 1 );

	$( "#form" ).validate({
		onkeyup: function() {
			ok( true, "Keyup fired" );
			start();
		}
	});

	$( "#form :radio:first" ).trigger( "keyup" );
});

asyncTest( "validation triggered on radio focus out fired", function() {
	expect( 1 );

	$( "#form" ).validate({
		onfocusout: function() {
			ok( true, "Focus Out fired" );
			start();
		}
	});

	$( "#form :radio:first" ).trigger( "focusout" );
});

asyncTest( "validation triggered on radio when focus in fired", function() {
	expect( 1 );

	$( "#form" ).validate({
		onfocusin: function() {
			ok( true, "Focus In fired" );
			start();
		}
	});

	$( "#form :radio:first" ).trigger( "focusin" );
});
