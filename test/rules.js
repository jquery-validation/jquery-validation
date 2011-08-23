module("rules");

test("rules() - internal - input", function() {
	var element = $('#firstname');
	var v = $('#testForm1').validate();
	same( element.rules(), { required: true, minlength: 2 } );
});

test("rules(), ignore method:false", function() {
	var element = $('#firstnamec');
	var v = $('#testForm1clean').validate({
		rules: {
			firstname: { required: false, minlength: 2 }	
		}
	});
	same( element.rules(), { minlength: 2 } );
});

test("rules() - internal - select", function() {
	var element = $('#meal');
	var v = $('#testForm3').validate();
	same( element.rules(), {required: true} );
});

test("rules() - external", function() {
	var element = $('#text1');
	var v = $('#form').validate({
		rules: {
			action: {date: true, min: 5}
		}
	});
	same( element.rules(), {date: true, min: 5} );
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
	same( element.rules(), {required: true, number: true, rangelength: [2, 8]});
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
	same( $("#firstnamec").rules(), {range: [5, 12]});
	
	same( $("#lastnamec").rules(), {rangelength: [2, 8]} );
	jQuery.validator.autoCreateRanges = false;
});

test("rules(), gurantee that required is at front", function() {
	$("#testForm1").validate();
	var v = $("#v2").validate();
	$("#subformRequired").validate();
	function flatRules(element) {
		var result = [];
		jQuery.each($(element).rules(), function(key, value) { result.push(key) }); 
		return result.join(" ");
	}
	equals( "required minlength", flatRules("#firstname") );
	equals( "required maxlength minlength", flatRules("#v2-i6") );
	equals( "required maxlength", flatRules("#co_name") );
	
	QUnit.reset();
	jQuery.validator.autoCreateRanges = true;
	v = $("#v2").validate();
	equals( "required rangelength", flatRules("#v2-i6") );
	
	$("#subformRequired").validate({
		rules: {
			co_name: "required"
		}
	});
	$("#co_name").removeClass();
	equals( "required maxlength", flatRules("#co_name") );
	jQuery.validator.autoCreateRanges = false;
});

test("rules(), evaluate dynamic parameters", function() {
	expect(2);
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: {
				min: function(element) {
					equals( $("#firstnamec")[0], element );
					return 12;
				}
			}
		}
	});
	same( $("#firstnamec").rules(), {min:12});
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
	same( $("#v2-i1").rules(), { required: true });
	same( $("#v2-i2").rules(), { required: true, email: true });
	same( $("#v2-i3").rules(), { url: true });
	same( $("#v2-i4").rules(), { required: true, minlength: 2 });
	same( $("#v2-i5").rules(), { required: true, minlength: 2, maxlength: 5, customMethod1: "123" });
	jQuery.validator.autoCreateRanges = true;
	same( $("#v2-i5").rules(), { required: true, customMethod1: "123", rangelength: [2, 5] });
	same( $("#v2-i6").rules(), { required: true, customMethod2: true, rangelength: [2, 5] });
	jQuery.validator.autoCreateRanges = false;
	same( $("#v2-i7").rules(), { required: true, minlength: 2, customMethod: true });
	
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
						return /^a/.test($(el).val());
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
	equals( 0, v.objectLength(rules) );
	
	$("#firstnamec").val('ab');
	same( $("#firstnamec").rules(), {min:5});
	
	same( $("#lastnamec").rules(), {max:12, email:true});
});

test("rules(), add and remove", function() {
	$.validator.addMethod("customMethod1", function() {
		return false;
	}, "");
	$("#v2").validate();
	var removedAttrs = $("#v2-i5").removeClass("required").removeAttrs("minlength maxlength");
	same( $("#v2-i5").rules(), { customMethod1: "123" });
	
	$("#v2-i5").addClass("required").attr(removedAttrs);
	same( $("#v2-i5").rules(), { required: true, minlength: 2, maxlength: 5, customMethod1: "123" });
	
	$("#v2-i5").addClass("email").attr({min: 5});
	same( $("#v2-i5").rules(), { required: true, email: true, minlength: 2, maxlength: 5, min: 5, customMethod1: "123" });
	
	$("#v2-i5").removeClass("required email").removeAttrs("minlength maxlength customMethod1 min");
	same( $("#v2-i5").rules(), {});
	
	delete $.validator.methods.customMethod1;
	delete $.validator.messages.customMethod1;
});
	
test("rules(), add and remove static rules", function() {
	var v = $("#testForm1clean").validate({
		rules: {
			firstname: "required date"
		}
	});
	same( $("#firstnamec").rules(), { required: true, date: true } );
	
	$("#firstnamec").rules("remove", "date")
	same( $("#firstnamec").rules(), { required: true } );
	$("#firstnamec").rules("add", "email");
	same( $("#firstnamec").rules(), { required: true, email: true } );
	
	$("#firstnamec").rules("remove", "required");
	same( $("#firstnamec").rules(), { email: true } );
	
	same( $("#firstnamec").rules("remove"), { email: true } );
	same( $("#firstnamec").rules(), { } );
	
	$("#firstnamec").rules("add", "required email");
	same( $("#firstnamec").rules(), { required: true, email: true } );
	
	
	same( $("#lastnamec").rules(), {} );
	$("#lastnamec").rules("add", "required");
	$("#lastnamec").rules("add", {
		minlength: 2
	});
	same( $("#lastnamec").rules(), { required: true, minlength: 2 } );
	
	
	var removedRules = $("#lastnamec").rules("remove", "required email");
	same( $("#lastnamec").rules(), { minlength: 2 } );
	$("#lastnamec").rules("add", removedRules);
	same( $("#lastnamec").rules(), { required: true, minlength: 2 } );
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
	same( v.settings.messages.firstname, undefined );
	
	$("#firstnamec").rules("add", {
		messages: {
			required: "required"
		}
	});
	
	$("#firstnamec").valid();
	same( v.errorList[0] && v.errorList[0].message, "required" );
});
