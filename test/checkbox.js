module( "Checkbox Elements" );

test("valid() plugin method, special handling for checkable groups", function() {
	// rule is defined on first checkbox, must apply to others, too
	var checkable = $("#checkable2");
	ok( !checkable.valid(), "must be invalid, not checked yet" );
	checkable.attr("checked", true);
	ok( checkable.valid(), "valid, is now checked" );
	checkable.attr("checked", false);
	ok( !checkable.valid(), "invalid again" );
	$("#checkable3").attr("checked", true);
	ok( checkable.valid(), "valid, third box is checked" );
});

test("validating multiple checkboxes with 'required'", function() {
	expect(3);
	var checkboxes = $("#form input[name=check3]").prop("checked", false),
		v;
	equal(checkboxes.size(), 5);

	v = $("#form").validate({
		rules: {
			check3: "required"
		}
	});
	v.form();

	equal(v.size(), 1);
	checkboxes.filter(":last").prop("checked", true);
	v.form();
	equal(v.size(), 0);
});

test("validate checkbox on click", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	function trigger(element) {
		element.click();
		// triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e = $("#check2"),
		v = $("#form").validate({
			rules: {
				check2: "required"
			}
		});

	trigger(e);
	errors(0);
	trigger(e);
	equal( false, v.form() );
	errors(1);
	trigger(e);
	errors(0);
	trigger(e);
	errors(1);
});

test("validate multiple checkbox on click", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	function trigger(element) {
		element.click();
		// triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $("#check1").attr("checked", false),
		e2 = $("#check1b"),
		v = $("#form").validate({
			rules: {
				check: {
					required: true,
					minlength: 2
				}
			}
		});

	trigger(e1);
	trigger(e2);
	errors(0);
	trigger(e2);
	equal( false, v.form() );
	errors(1);
	trigger(e2);
	errors(0);
	trigger(e2);
	errors(1);
});

test("correct checkbox receives the error", function(){
	function trigger(element) {
		element.click();
		// triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $("#check1").attr("checked", false),
		v;

	$("#check1b").attr("checked", false);
	v = $("#form").find("[type=checkbox]").attr("checked", false).end().validate({
		rules:{
			check: {
					required: true,
					minlength: 2
			}
		}
	});

	equal(false, v.form());
	trigger(e1);
	equal(false, v.form());
	ok(v.errorList[0].element.id === v.currentElements[0].id, "the proper checkbox has the error AND is present in currentElements");
});

asyncTest("validation triggered on radio/checkbox when keyup fired ", function() {
	expect( 1 );

	$( "#form" ).validate({
		onkeyup: function() {
			ok( true, "Keyup fired" );
			start();
		}
	});

	$( "#form :checkbox:first" ).trigger( "keyup" );
});

asyncTest( "validation triggered on radio/checkbox focus out fired", function() {
	expect( 1 );

	$( "#form" ).validate({
		onfocusout: function() {
			ok( true, "Focus Out fired" );
			start();
		}
	});

	$( "#form :checkbox:first" ).trigger( "focusout" );
});

asyncTest( "validation triggered on radio/checkbox when focus in fired", function() {
	expect( 1 );

	$( "#form" ).validate({
		onfocusin: function() {
			ok( true, "Focus In fired" );
			start();
		}
	});

	$( "#form :checkbox:first" ).trigger( "focusin" );
});
