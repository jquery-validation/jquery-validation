module("rules");

test("rules() - internal - input", function() {
	var element = $('#firstname');
	var v = $('#testForm1').validate();
	deepEqual( element.rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 } ] );
});

test("rules(), ignore method:false", function() {
	var element = $('#firstnamec');
	var v = $('#testForm1clean').validate({
		rules: {
			firstname: { required: false, minlength: 2 }
		}
	});
	deepEqual( element.rules(), [ { method: "minlength", parameters: 2 } ] );
});

test("rules() HTML5 required (no value)", function() {
	var element = $('#testForm11text1');
	var v = $('#testForm11').validate();
	deepEqual( element.rules(), [ { method: "required", parameters: true } ] );
});

test("rules() - internal - select", function() {
	var element = $('#meal');
	var v = $('#testForm3').validate();
	deepEqual( element.rules(), [ { method: "required", parameters: true } ] );
});

test("rules() - external", function() {
	var element = $('#text1');
	var v = $('#form').validate({
		rules: {
			action: {date: true, min: 5}
		}
	});
	deepEqual( element.rules(), [ { method: "date", parameters: true }, { method: "min", parameters: 5 } ] );
});

test("rules() - external - complete form", function() {
	expect(1);

	var methods = $.extend({}, $.validator.methods);
	var messages = $.extend({}, $.validator.messages);

	$.validator.addMethod("verifyTest", function() {
		ok( true, "method executed" );
		return true;
	});
	var v = $('#form').validate({
		rules: {
			action: {verifyTest: true}
		}
	});
	v.form();

	$.validator.methods = methods;
	$.validator.messages = messages;
});

test("rules() - internal - input", function() {
	var element = $('#form8input');
	var v = $('#testForm8').validate();
	deepEqual( element.rules(), [ { method: "required", parameters: true }, { method: "number", parameters: true}, { method: "rangelength", parameters: [2, 8] } ] );
});

test("rules(), merge min/max to range, minlength/maxlength to rangelength", function() {
	jQuery.validator.autoCreateRanges = true;
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: {
				min: 5,
				max: 12
			},
			lastname: {
				minlength: 2,
				maxlength: 8
			}
		}
	});
	deepEqual( $("#firstnamec").rules(), [ { method: "range", parameters: [5, 12] } ] );

	deepEqual( $("#lastnamec").rules(), [ { method: "rangelength", parameters: [2, 8] } ] );
	jQuery.validator.autoCreateRanges = false;
});

test("rules(), guarantee that required is at front", function() {
	$("#testForm1").validate();
	var v = $("#v2").validate();
	$("#subformRequired").validate();
	function flatRules(element) {
		var result = [];
		jQuery.each($(element).rules(), function(key, value) { result.push(value.method); });
		return result.join(" ");
	}
	equal( "required minlength", flatRules("#firstname") );
	equal( "required minlength maxlength", flatRules("#v2-i6") );
	equal( "required maxlength", flatRules("#co_name") );

	QUnit.reset();
	jQuery.validator.autoCreateRanges = true;
	v = $("#v2").validate();
	equal( "required rangelength", flatRules("#v2-i6") );

	$("#subformRequired").validate({
		rules: {
			co_name: "required"
		}
	});
	$("#co_name").removeClass();
	equal( "required maxlength", flatRules("#co_name") );
	jQuery.validator.autoCreateRanges = false;
});

test("rules(), evaluate dynamic parameters", function() {
	expect(2);
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: {
				min: function(element) {
					equal( $("#firstnamec")[0], element );
					return 12;
				}
			}
		}
	});
	deepEqual( $("#firstnamec").rules(), [ { method: "min", parameters: 12 } ] );
});

test("rules(), class and attribute combinations", function() {

	$.validator.addMethod("customMethod1", function() {
		return false;
	}, "");
	$.validator.addMethod("customMethod2", function() {
		return false;
	}, "");
	var v = $("#v2").validate({
		rules: {
			'v2-i7': {
				required: true,
				minlength: 2,
				customMethod: true
			}
		}
	});
	deepEqual( $("#v2-i1").rules(), [ { method: "required", parameters: true } ] );
	deepEqual( $("#v2-i2").rules(), [ { method: "required", parameters: true }, { method: "email", parameters: true } ] );
	deepEqual( $("#v2-i3").rules(), [ { method: "url", parameters: true } ] );
	deepEqual( $("#v2-i4").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 } ] );
	deepEqual( $("#v2-i5").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 }, { method: "maxlength", parameters: 5 }, { method: "customMethod1", parameters: "123" } ] );
	jQuery.validator.autoCreateRanges = true;
	deepEqual( $("#v2-i5").rules(), [ { method: "required", parameters: true }, { method: "customMethod1", parameters: "123" }, { method: "rangelength", parameters: [2, 5] } ] );
	deepEqual( $("#v2-i6").rules(), [ { method: "required", parameters: true }, { method: "customMethod2", parameters: true }, { method: "rangelength", parameters: [2, 5] } ] );
	jQuery.validator.autoCreateRanges = false;
	deepEqual( $("#v2-i7").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 }, { method: "customMethod", parameters: true } ] );

	delete $.validator.methods.customMethod1;
	delete $.validator.messages.customMethod1;
	delete $.validator.methods.customMethod2;
	delete $.validator.messages.customMethod2;
});

test("rules(), dependency checks", function() {
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: {
				min: {
					param: 5,
					depends: function(el) {
						return (/^a/).test($(el).val());
					}
				}
			},
			lastname: {
				max: {
					param: 12
				},
				email: {
					depends: function() { return true; }
				}
			}
		}
	});

	var rules = $("#firstnamec").rules();
	equal( 0, v.objectLength(rules) );

	$("#firstnamec").val('ab');
	deepEqual( $("#firstnamec").rules(), [ { method: "min", parameters: 5 } ] );

	deepEqual( $("#lastnamec").rules(), [ { method: "max", parameters: 12 }, { method: "email", parameters: true } ] );
});

test("rules(), add and remove", function() {
	$.validator.addMethod("customMethod1", function() {
		return false;
	}, "");
	$("#v2").validate();
	var removedAttrs = $("#v2-i5").removeClass("required").removeAttrs("minlength maxlength");
	deepEqual( $("#v2-i5").rules(), [ { method: "customMethod1", parameters: "123" } ]);

	$("#v2-i5").addClass("required").attr(removedAttrs);
	deepEqual( $("#v2-i5").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 }, { method: "maxlength", parameters: 5 }, { method: "customMethod1", parameters: "123" } ]);

	$("#v2-i5").addClass("email").attr({min: 5});
	deepEqual( $("#v2-i5").rules(), [ { method: "required", parameters: true }, { method: "email", parameters: true }, { method: "minlength", parameters: 2 }, { method: "maxlength", parameters: 5 }, { method: "min", parameters: 5 }, { method: "customMethod1", parameters: "123" } ]);

	$("#v2-i5").removeClass("required email").removeAttrs("minlength maxlength customMethod1 min");
	deepEqual( $("#v2-i5").rules(), []);

	delete $.validator.methods.customMethod1;
	delete $.validator.messages.customMethod1;
});

test("rules(), add and remove static rules", function() {
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: "required date"
		}
	});
	deepEqual( $("#firstnamec").rules(), [ { method: "required", parameters: true }, { method: "date", parameters: true } ] );

	$("#firstnamec").rules("remove", "date");
	deepEqual( $("#firstnamec").rules(), [ { method: "required", parameters: true } ] );
	$("#firstnamec").rules("add", "email");
	deepEqual( $("#firstnamec").rules(), [ { method: "required", parameters: true }, { method: "email", parameters: true } ] );

	$("#firstnamec").rules("remove", "required");
	deepEqual( $("#firstnamec").rules(), [ { method: "email", parameters: true } ] );

	deepEqual( $("#firstnamec").rules("remove"), { email: true } );
	deepEqual( $("#firstnamec").rules(), [] );

	$("#firstnamec").rules("add", "required email");
	deepEqual( $("#firstnamec").rules(), [ { method: "required", parameters: true }, { method: "email", parameters: true } ] );


	deepEqual( $("#lastnamec").rules(), [] );
	$("#lastnamec").rules("add", "required");
	$("#lastnamec").rules("add", {
		minlength: 2
	});
	deepEqual( $("#lastnamec").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 } ] );


	var removedRules = $("#lastnamec").rules("remove", "required email");
	deepEqual( $("#lastnamec").rules(), [ { method: "minlength", parameters: 2 } ] );
	$("#lastnamec").rules("add", removedRules);
	deepEqual( $("#lastnamec").rules(), [ { method: "required", parameters: true }, { method: "minlength", parameters: 2 } ] );
});

test("rules(), add messages", function() {
	$("#firstnamec").attr("title", null);
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: "required"
		}
	});
	$("#testForm1clean").valid();
	$("#firstnamec").valid();
	deepEqual( v.settings.messages.firstname, undefined );

	$("#firstnamec").rules("add", {
		messages: {
			required: "required"
		}
	});

	$("#firstnamec").valid();
	deepEqual( v.errorList[0] && v.errorList[0].message, "required" );

	$("#firstnamec").val("test");
	$("#firstnamec").valid();
	equal(v.errorList.length, 0);
});
