module( "Events: Blur" );

test("validate on blur", function() {
	function errors(expected, message) {
		equal(v.size(), expected, message );
	}
	function labels(expected) {
		equal(v.errors().filter(":visible").size(), expected);
	}
	function blur(target) {
		target.trigger("blur").trigger("focusout");
	}
	$("#errorFirstname").hide();
	var e = $("#firstname"),
		v = $("#testForm1").validate();

	$("#something").val("");
	blur(e);
	errors(0, "No value yet, required is skipped on blur");
	labels(0);
	e.val("h");
	blur(e);
	errors(1, "Required was ignored, but as something was entered, check other rules, minlength isn't met");
	labels(1);
	e.val("hh");
	blur(e);
	errors(0, "All is fine");
	labels(0);
	e.val("");
	v.form();
	errors(3, "Submit checks all rules, both fields invalid");
	labels(3);
	blur(e);
	errors(1, "Blurring the field results in emptying the error list first, then checking the invalid field: its still invalid, don't remove the error" );
	labels(3);
	e.val("h");
	blur(e);
	errors(1, "Entering a single character fulfills required, but not minlength: 2, still invalid");
	labels(3);
	e.val("hh");
	blur(e);
	errors(0, "Both required and minlength are met, no errors left");
	labels(2);
});

test("validate on not keyup, only blur", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	var e = $("#firstname"),
		v = $("#testForm1").validate({
			onkeyup: false
		});

	errors(0);
	e.val("a");
	e.trigger("keyup");
	e.keyup();
	errors(0);
	e.trigger("blur").trigger("focusout");
	errors(1);
});

test("validate on keyup and blur", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	var e = $("#firstname"),
		v = $("#testForm1").validate();

	errors(0);
	e.val("a");
	e.trigger("keyup");
	errors(0);
	e.trigger("blur").trigger("focusout");
	errors(1);
});

test("validate email on keyup and blur", function() {
	function errors(expected, message) {
		equal(expected, v.size(), message );
	}
	var e = $("#firstname"),
		v = $("#testForm1").validate();

	v.form();
	errors(2);
	e.val("a");
	e.trigger("keyup");
	errors(1);
	e.val("aa");
	e.trigger("keyup");
	errors(0);
});
