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
});
