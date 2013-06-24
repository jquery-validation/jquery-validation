module("aria");
 
test("Invalid field adds aria-invalid=true", function() {
	var ariafirstname = $('#ariafirstname');
	var form = $('#ariaInvalid');
	form.validate({
		rules: {
			ariafirstname: 'required'
		}
	});
	ariafirstname.val('');
	ariafirstname.valid();
	equal(ariafirstname.attr('aria-invalid'), "true");
});

test("Valid field adds aria-invalid=false", function() {
	var ariafirstname = $('#ariafirstname');
	var form = $("#ariaInvalid");
	form.validate({
		rules: {
			ariafirstname: "required"
		}
	});
	ariafirstname.val('not empty');
	ariafirstname.valid();
	equal(ariafirstname.attr("aria-invalid"), "false");
	equal($("#ariaInvalid [aria-invalid=false]").length, 1);
});

test("resetForm(): removes all aria-invalid attributes", function() {
	var ariafirstname = $('#ariafirstname');
	var form = $("#ariaInvalid");
	var validator = form.validate({
		rules: {
			ariafirstname: "required"
		}
	});
	ariafirstname.val('not empty');
	ariafirstname.valid();
	validator.resetForm();
	equal($("#ariaInvalid [aria-invalid]").length, 0, "resetForm() should remove any aria-invalid attributes");
});
