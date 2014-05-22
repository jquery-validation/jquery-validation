module( "Event: click" );

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
