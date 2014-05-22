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
