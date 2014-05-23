module( "Radio Buttons", {
	setup: function() {
		var $fixture = $( "#qunit-fixture" ),
			$form = $( "<form id='form_radio'></form>" );

		$form.append("<input id='test_radio1' name='test_radio1' type='radio'>");
		$fixture.append($form);
	},
	teardown: function() {
		$( "#form_radio" ).remove();
	}
});

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
