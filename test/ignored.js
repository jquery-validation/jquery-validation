module( "Ignored Elements" );

test("option: ignore", function() {
	var v = $("#testForm1").validate({
		ignore: "[name=lastname]"
	});
	v.form();
	equal( 1, v.size() );
});

test( "calling blur on ignored element", function() {
	var form = $( "#ignoredElements" );

	form.validate({
		ignore: ".ignore",
		submitHandler: $.noop,
		invalidHandler: function() {
			$( "#ss1" ).blur();
		}
	});

	form.trigger( "submit" );
	equal( form.valid(), false, "valid() should return false" );
});

test("ignore hidden elements", function(){
	var form = $("#userForm"),
		validate = form.validate({
			rules:{
				"username": "required"
			}
		});

	form.get(0).reset();
	ok(! validate.form(), "form should be initially invalid");
	$("#userForm [name=username]").hide();
	ok(validate.form(), "hidden elements should be ignored by default");
});

test("ignore hidden elements at start", function(){
	var form = $("#userForm"),
		validate = form.validate({
			rules:{
				"username": "required"
			}
		});

	form.get(0).reset();
	$("#userForm [name=username]").hide();
	ok(validate.form(), "hidden elements should be ignored by default");
	$("#userForm [name=username]").show();
	ok(! validate.form(), "form should be invalid when required element is visible");
});
