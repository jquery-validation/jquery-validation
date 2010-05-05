(function($) {
	
function methodTest( methodName ) {
	var v = jQuery("#form").validate();
	var method = $.validator.methods[methodName];
	var element = $("#firstname")[0];
	return function(value, param) {
		element.value = value;
		return method.call( v, value, element, param );
	};
}

module("methods");

test("default messages", function() {
	var m = $.validator.methods;
	$.each(m, function(key) {
		ok( jQuery.validator.messages[key], key + " has a default message." );
	});
});

test("digit", function() {
	var method = methodTest("digits");
	ok( method( "123" ), "Valid digits" );
	ok(!method( "123.000" ), "Invalid digits" );
	ok(!method( "123.000,00" ), "Invalid digits" );
	ok(!method( "123.0.0,0" ), "Invalid digits" );
	ok(!method( "x123" ), "Invalid digits" );
	ok(!method( "100.100,0,0" ), "Invalid digits" );
});

test("url", function() {
	var method = methodTest("url");
	ok( method( "http://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "https://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "ftp://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "http://www.føtex.dk/" ), "Valid url, danish unicode characters" );
	ok( method( "http://bösendorfer.de/" ), "Valid url, german unicode characters" );
	ok( method( "http://192.168.8.5" ), "Valid IP Address" )
	ok(!method( "http://192.168.8." ), "Invalid IP Address" )
	ok(!method( "http://bassistance" ), "Invalid url" ); // valid
	ok(!method( "http://bassistance." ), "Invalid url" ); // valid
	ok(!method( "http://bassistance,de" ), "Invalid url" );
	ok(!method( "http://bassistance;de" ), "Invalid url" );
	ok(!method( "http://.bassistancede" ), "Invalid url" );
	ok(!method( "bassistance.de" ), "Invalid url" );
});

test("url2 (tld optional)", function() {
	var method = methodTest("url2");
	ok( method( "http://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "https://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "ftp://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "http://www.føtex.dk/" ), "Valid url, danish unicode characters" );
	ok( method( "http://bösendorfer.de/" ), "Valid url, german unicode characters" );
	ok( method( "http://192.168.8.5" ), "Valid IP Address" )
	ok(!method( "http://192.168.8." ), "Invalid IP Address" )
	ok( method( "http://bassistance" ), "Invalid url" );
	ok( method( "http://bassistance." ), "Invalid url" );
	ok(!method( "http://bassistance,de" ), "Invalid url" );
	ok(!method( "http://bassistance;de" ), "Invalid url" );
	ok(!method( "http://.bassistancede" ), "Invalid url" );
	ok(!method( "bassistance.de" ), "Invalid url" );
});

test("email", function() {
	var method = methodTest("email");
	ok( method( "name@domain.tld" ), "Valid email" );
	ok( method( "name@domain.tl" ), "Valid email" );
	ok( method( "bart+bart@tokbox.com" ), "Valid email" );
	ok( method( "bart+bart@tokbox.travel" ), "Valid email" );
	ok( method( "n@d.tld" ), "Valid email" );
	ok( method( "ole@føtex.dk"), "Valid email" );
	ok( method( "jörn@bassistance.de"), "Valid email" );
	ok( method( "bla.blu@g.mail.com"), "Valid email" );
	ok( method( "\"Scott Gonzalez\"@example.com" ), "Valid email" );
	ok( method( "\"Scott González\"@example.com" ), "Valid email" );
	ok( method( "\"name.\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name,\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name;\"@domain.tld" ), "Valid email" ); // valid without top label
	ok(!method( "name" ), "Invalid email" );
	ok(!method( "name@" ), "Invalid email" );
	ok(!method( "name@domain" ), "Invalid email" );
	ok(!method( "name.@domain.tld" ), "Invalid email" );
	ok(!method( "name,@domain.tld" ), "Invalid email" );
	ok(!method( "name;@domain.tld" ), "Invalid email" );
});

test("email2 (tld optional)", function() {
	var method = methodTest("email2");
	ok( method( "name@domain.tld" ), "Valid email" );
	ok( method( "name@domain.tl" ), "Valid email" );
	ok( method( "bart+bart@tokbox.com" ), "Valid email" );
	ok( method( "bart+bart@tokbox.travel" ), "Valid email" );
	ok( method( "n@d.tld" ), "Valid email" );
	ok( method( "ole@føtex.dk"), "Valid email" );
	ok( method( "jörn@bassistance.de"), "Valid email" );
	ok( method( "bla.blu@g.mail.com"), "Valid email" );
	ok( method( "\"Scott Gonzalez\"@example.com" ), "Valid email" );
	ok( method( "\"Scott González\"@example.com" ), "Valid email" );
	ok( method( "\"name.\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name,\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name;\"@domain.tld" ), "Valid email" ); // valid without top label
	ok(!method( "name" ), "Invalid email" );
	ok(!method( "name@" ), "Invalid email" );
	ok( method( "name@domain" ), "Invalid email" );
	ok(!method( "name.@domain.tld" ), "Invalid email" );
	ok(!method( "name,@domain.tld" ), "Invalid email" );
	ok(!method( "name;@domain.tld" ), "Invalid email" );
});

test("number", function() {
	var method = methodTest("number");
	ok( method( "123" ), "Valid number" );
	ok( method( "-123" ), "Valid number" );
	ok( method( "123,000" ), "Valid number" );
	ok( method( "-123,000" ), "Valid number" );
	ok( method( "123,000.00" ), "Valid number" );
	ok( method( "-123,000.00" ), "Valid number" );
	ok(!method( "123.000,00" ), "Invalid number" );
	ok(!method( "123.0.0,0" ), "Invalid number" );
	ok(!method( "x123" ), "Invalid number" );
	ok(!method( "100.100,0,0" ), "Invalid number" );
	
	ok( method( "" ), "Blank is valid" );
	ok( method( "123" ), "Valid decimal" );
	ok( method( "123000" ), "Valid decimal" );
	ok( method( "123000.12" ), "Valid decimal" );
	ok( method( "-123000.12" ), "Valid decimal" );
	ok( method( "123.000" ), "Valid decimal" );
	ok( method( "123,000.00" ), "Valid decimal" );
	ok( method( "-123,000.00" ), "Valid decimal" );
	ok(!method( "1230,000.00" ), "Invalid decimal" );
	ok(!method( "123.0.0,0" ), "Invalid decimal" );
	ok(!method( "x123" ), "Invalid decimal" );
	ok(!method( "100.100,0,0" ), "Invalid decimal" );
});

/* disabled for now, need to figure out how to test localized methods
test("numberDE", function() {
	var method = methodTest("numberDE");
	ok( method( "123" ), "Valid numberDE" );
	ok( method( "-123" ), "Valid numberDE" );
	ok( method( "123.000" ), "Valid numberDE" );
	ok( method( "-123.000" ), "Valid numberDE" );
	ok( method( "123.000,00" ), "Valid numberDE" );
	ok( method( "-123.000,00" ), "Valid numberDE" );
	ok(!method( "123,000.00" ), "Invalid numberDE" );
	ok(!method( "123,0,0.0" ), "Invalid numberDE" );
	ok(!method( "x123" ), "Invalid numberDE" );
	ok(!method( "100,100.0.0" ), "Invalid numberDE" );
	
	ok( method( "" ), "Blank is valid" );
	ok( method( "123" ), "Valid decimalDE" );
	ok( method( "123000" ), "Valid decimalDE" );
	ok( method( "123000,12" ), "Valid decimalDE" );
	ok( method( "-123000,12" ), "Valid decimalDE" );
	ok( method( "123.000" ), "Valid decimalDE" );
	ok( method( "123.000,00" ), "Valid decimalDE" );
	ok( method( "-123.000,00" ), "Valid decimalDE" )
	ok(!method( "123.0.0,0" ), "Invalid decimalDE" );
	ok(!method( "x123" ), "Invalid decimalDE" );
	ok(!method( "100,100.0.0" ), "Invalid decimalDE" );
});
*/

test("date", function() {
	var method = methodTest("date");
	ok( method( "06/06/1990" ), "Valid date" );
	ok( method( "6/6/06" ), "Valid date" );
	ok(!method( "1990x-06-06" ), "Invalid date" );
});

test("dateISO", function() {
	var method = methodTest("dateISO");
	ok( method( "1990-06-06" ), "Valid date" );
	ok( method( "1990/06/06" ), "Valid date" );
	ok( method( "1990-6-6" ), "Valid date" );
	ok( method( "1990/6/6" ), "Valid date" );
	ok(!method( "1990-106-06" ), "Invalid date" );
	ok(!method( "190-06-06" ), "Invalid date" );
});

/* disabled for now, need to figure out how to test localized methods
test("dateDE", function() {
	var method = methodTest("dateDE");
	ok( method( "03.06.1984" ), "Valid dateDE" );
	ok( method( "3.6.84" ), "Valid dateDE" );
	ok(!method( "6-6-06" ), "Invalid dateDE" );
	ok(!method( "1990-06-06" ), "Invalid dateDE" );
	ok(!method( "06/06/1990" ), "Invalid dateDE" );
	ok(!method( "6/6/06" ), "Invalid dateDE" );
});
*/

test("required", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.required,
		e = $('#text1, #text1b, #hidden2, #select1, #select2');
	ok( method.call( v, e[0].value, e[0]), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid text input" );
	ok(!method.call( v, e[1].value, e[2]), "Invalid text input" );
	
	ok(!method.call( v, e[2].value, e[3]), "Invalid select" );
	ok( method.call( v, e[3].value, e[4]), "Valid select" );
	
	e = $('#area1, #area2, #pw1, #pw2');
	ok( method.call( v, e[0].value, e[0]), "Valid textarea" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid textarea" );
	ok( method.call( v, e[2].value, e[2]), "Valid password input" );
	ok(!method.call( v, e[3].value, e[3]), "Invalid password input" );
	
	e = $('#radio1, #radio2, #radio3');
	ok(!method.call( v, e[0].value, e[0]), "Invalid radio" );
	ok( method.call( v, e[1].value, e[1]), "Valid radio" );
	ok( method.call( v, e[2].value, e[2]), "Valid radio" );
	
	e = $('#check1, #check2');
	ok( method.call( v, e[0].value, e[0]), "Valid checkbox" );
	ok(!method.call( v, e[1].value, e[1]), "Invalid checkbox" );
	
	e = $('#select1, #select2, #select3, #select4');
	ok(!method.call( v, e[0].value, e[0]), "Invalid select" );
	ok( method.call( v, e[1].value, e[1]), "Valid select" );
	ok( method.call( v, e[2].value, e[2]), "Valid select" );
	ok( method.call( v, e[3].value, e[3]), "Valid select" );
});

test("required with dependencies", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.required,
    	e = $('#hidden2, #select1, #area2, #radio1, #check2');
	ok( method.call( v, e[0].value, e[0], "asffsaa"), "Valid text input due to depencie not met" );
	ok(!method.call( v, e[0].value, e[0], "input"), "Invalid text input" );
	ok( method.call( v, e[0].value, e[0], function() { return false; }), "Valid text input due to depencie not met" );
	ok(!method.call( v, e[0].value, e[0], function() { return true; }), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], "asfsfa"), "Valid select due to dependency not met" );
	ok(!method.call( v, e[1].value, e[1], "input"), "Invalid select" );
	ok( method.call( v, e[2].value, e[2], "asfsafsfa"), "Valid textarea due to dependency not met" );
	ok(!method.call( v, e[2].value, e[2], "input"), "Invalid textarea" );
	ok( method.call( v, e[3].value, e[3], "asfsafsfa"), "Valid radio due to dependency not met" );
	ok(!method.call( v, e[3].value, e[3], "input"), "Invalid radio" );
	ok( method.call( v, e[4].value, e[4], "asfsafsfa"), "Valid checkbox due to dependency not met" );
	ok(!method.call( v, e[4].value, e[4], "input"), "Invalid checkbox" );
});

test("minlength", function() {
	var v = jQuery("#form").validate(),
		method = $.validator.methods.minlength,
		param = 2,
		e = $('#text1, #text1c, #text2, #text3');
	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
	ok( method.call( v, e[3].value, e[3], param), "Valid text input" );
	
	e = $('#check1, #check2, #check3');
	ok(!method.call( v, e[0].value, e[0], param), "Valid checkbox" );
	ok( method.call( v, e[1].value, e[1], param), "Valid checkbox" );
	ok( method.call( v, e[2].value, e[2], param), "Invalid checkbox" );
	
	e = $('#select1, #select2, #select3, #select4, #select5');
	ok(method.call( v, e[0].value, e[0], param), "Valid select " + e[0].id );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid select " + e[1].id );
	ok( method.call( v, e[2].value, e[2], param), "Valid select " + e[2].id );
	ok( method.call( v, e[3].value, e[3], param), "Valid select " + e[3].id );
	ok( method.call( v, e[4].value, e[4], param), "Valid select " + e[4].id );
});

test("maxlength", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.maxlength,
		param = 4,
		e = $('#text1, #text2, #text3');
	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
	
	e = $('#check1, #check2, #check3');
	ok( method.call( v, e[0].value, e[0], param), "Valid checkbox" );
	ok( method.call( v, e[1].value, e[1], param), "Invalid checkbox" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid checkbox" );
	
	e = $('#select1, #select2, #select3, #select4');
	ok( method.call( v, e[0].value, e[0], param), "Valid select" );
	ok( method.call( v, e[1].value, e[1], param), "Valid select" );
	ok( method.call( v, e[2].value, e[2], param), "Valid select" );
	ok(!method.call( v, e[3].value, e[3], param), "Invalid select" );
});

test("rangelength", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.rangelength,
		param = [2, 4],
		e = $('#text1, #text2, #text3');
	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok(!method.call( v, e[1].value, e[1], param), "Invalid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
});

test("min", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.min,
		param = 8,
		e = $('#value1, #value2, #value3');
	ok(!method.call( v, e[0].value, e[0], param), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok( method.call( v, e[2].value, e[2], param), "Valid text input" );
});

test("max", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.max,
		param = 12,
		e = $('#value1, #value2, #value3');
	ok( method.call( v, e[0].value, e[0], param), "Valid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
});

test("range", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.range,
		param = [4,12],
		e = $('#value1, #value2, #value3');
	ok(!method.call( v, e[0].value, e[0], param), "Invalid text input" );
	ok( method.call( v, e[1].value, e[1], param), "Valid text input" );
	ok(!method.call( v, e[2].value, e[2], param), "Invalid text input" );
});

test("equalTo", function() {
	var v = jQuery("#form").validate();
	var method = $.validator.methods.equalTo,
		e = $('#text1, #text2');
	ok( method.call( v, "Test", e[0], "#text1"), "Text input" );
	ok( method.call( v, "T", e[1], "#text2"), "Another one" );
});

test("creditcard", function() {
	var method = methodTest("creditcard");
	ok( method( "446-667-651" ), "Valid creditcard number" );
	ok( !method( "asdf" ), "Invalid creditcard number" );
});

test("accept", function() {
	var method = methodTest("accept");
	ok( method( "picture.gif" ), "Valid default accept type" );
	ok( method( "picture.jpg" ), "Valid default accept type" );
	ok( method( "picture.jpeg" ), "Valid default accept type" );
	ok( method( "picture.png" ), "Valid default accept type" );
	ok( !method( "picture.pgn" ), "Invalid default accept type" );
	
	var v = jQuery("#form").validate(),
		method = function(value, param) {
		return $.validator.methods.accept.call(v, value, $('#text1')[0], param)
	};
	ok( method( "picture.doc", "doc"), "Valid custom accept type" );
	ok( method( "picture.pdf", "doc|pdf"), "Valid custom accept type" );
	ok( method( "picture.pdf", "pdf|doc"), "Valid custom accept type" );
	ok( !method( "picture.pdf", "doc"), "Invalid custom accept type" );
	ok( !method( "picture.doc", "pdf"), "Invalid custom accept type" );
	
	ok( method( "picture.pdf", "doc,pdf"), "Valid custom accept type, comma seperated" );
	ok( method( "picture.pdf", "pdf,doc"), "Valid custom accept type, comma seperated" );
	ok( !method( "picture.pdf", "gop,top"), "Invalid custom accept type, comma seperated" );
});

test("remote", function() {
	expect(7);
	stop();
	var e = $("#username");
	var v = $("#userForm").validate({
		rules: {
			username: {
				required: true,
				remote: "users.php"
			}
		},
		messages: {
			username: {
				required: "Please",
				remote: jQuery.validator.format("{0} in use")
			}
		},
		submitHandler: function() {
			ok( false, "submitHandler may never be called when validating only elements");
		}
	});
	$(document).ajaxStop(function() {
		$(document).unbind("ajaxStop");
		equals( 1, v.size(), "There must be one error" );
		equals( "Peter in use", v.errorList[0].message );
		
		$(document).ajaxStop(function() {
			$(document).unbind("ajaxStop");
			equals( 1, v.size(), "There must be one error" );
			equals( "Peter2 in use", v.errorList[0].message );
			start();
		});
		e.val("Peter2");
		ok( !v.element(e), "new value, new request" );
	});
	ok( !v.element(e), "invalid element, nothing entered yet" );
	e.val("Peter");
	ok( !v.element(e), "still invalid, because remote validation must block until it returns" );
});

test("remote, customized ajax options", function() {
	expect(2);
	stop();
	var v = $("#userForm").validate({
		rules: {
			username: {
				required: true,
				remote: {
					url: "users.php",
					type: "post",
					beforeSend: function(request, settings) {
						same(settings.type, "post");
						same(settings.data, "username=asdf&email=email.com");
					},
					data: {
						email: function() {
							return "email.com";
						}
					},
					complete: function() {
						start();
					}
				}
			}
		}
	});
	$("#username").val("asdf");
	$("#userForm").valid();
});


test("remote extensions", function() {
	expect(5);
	stop();
	var e = $("#username");
	var v = $("#userForm").validate({
		rules: {
			username: {
				required: true,
				remote: "users2.php"
			}
		},
		messages: {
			username: {
				required: "Please"
			}
		},
		submitHandler: function() {
			ok( false, "submitHandler may never be called when validating only elements");
		}
	});
	$(document).ajaxStop(function() {
		$(document).unbind("ajaxStop");
		equals( 1, v.size(), "There must be one error" );
		equals( v.errorList[0].message, "asdf is already taken, please try something else" );
		v.element(e);
		equals( v.errorList[0].message, "asdf is already taken, please try something else", "message doesn't change on revalidation" );
		start();
	});
	ok( !v.element(e), "invalid element, nothing entered yet" );
	e.val("asdf");
	ok( !v.element(e), "still invalid, because remote validation must block until it returns" );
});

module("additional methods");

test("phone (us)", function() {
	var method = methodTest("phoneUS");
	ok( method( "1(212)-999-2345" ), "Valid us phone number" );
	ok( method( "212 999 2344" ), "Valid us phone number" );
	ok( method( "212-999-0983" ), "Valid us phone number" );
	ok(!method( "111-123-5434" ), "Invalid us phone number" );
	ok(!method( "212 123 4567" ), "Invalid us phone number" );
});

test("dateITA", function() {
	var method = methodTest("dateITA");
	ok( method( "01/01/1900" ), "Valid date ITA" );
	ok(!method( "01/13/1990" ), "Invalid date ITA" );
	ok(!method( "01.01.1900" ), "Invalid date ITA" );
});

test("time", function() {
	var method = methodTest("time");
	ok( method("00:00"), "Valid time, lower bound" );
	ok( method("23:59"), "Valid time, upper bound" );
	ok( !method("24:60"), "Invalid time" );
	ok( !method("24:00"), "Invalid time" );
	ok( !method("29:59"), "Invalid time" );
	ok( !method("30:00"), "Invalid time" );
});

test("minWords", function() {
	var method = methodTest("minWords");
	ok( method("hello worlds", 2), "plain text, valid" );
	ok( method("<b>hello</b> world", 2), "html, valid" );
	ok( !method("hello", 2), "plain text, invalid" );
	ok( !method("<b>world</b>", 2), "html, invalid" );
	ok( !method("world <br/>", 2), "html, invalid" );
});

test("maxWords", function() {
	var method = methodTest("maxWords");
	ok( method("hello", 2), "plain text, valid" );
	ok( method("<b>world</b>", 2), "html, valid" );
	ok( method("world <br/>", 2), "html, valid" );
	ok( !method("hello worlds", 2), "plain text, invalid" );
	ok( !method("<b>hello</b> world", 2), "html, invalid" );
});

function testCardTypeByNumber(number, cardname, expected) {
	$("#cardnumber").val(number);
	var actual = $("#ccform").valid();
	equals(actual, expected, $.format("Expect card number {0} to validate to {1}, actually validated to ", number, expected));
}

test('creditcardtypes, all', function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					all: true
				}
			}
		}
	});
		
	testCardTypeByNumber("4111-1111-1111-1111", "VISA", true)
	testCardTypeByNumber("5111-1111-1111-1118", "MasterCard", true)
	testCardTypeByNumber("6111-1111-1111-1116", "Discover", true)
	testCardTypeByNumber("3400-0000-0000-009", "AMEX", true);
	
	testCardTypeByNumber("4111-1111-1111-1110", "VISA", false)
	testCardTypeByNumber("5432-1111-1111-1111", "MasterCard", false)
	testCardTypeByNumber("6611-6611-6611-6611", "Discover", false)
	testCardTypeByNumber("3777-7777-7777-7777", "AMEX", false)

});

test('creditcardtypes, visa', function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					visa: true
				}
			}
		}
	});
		
	testCardTypeByNumber("4111-1111-1111-1111", "VISA", true)
	testCardTypeByNumber("5111-1111-1111-1118", "MasterCard", false)
	testCardTypeByNumber("6111-1111-1111-1116", "Discover", false)
	testCardTypeByNumber("3400-0000-0000-009", "AMEX", false);
});

test('creditcardtypes, mastercard', function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					mastercard: true
				}
			}
		}
	});
		
	testCardTypeByNumber("5111-1111-1111-1118", "MasterCard", true)
	testCardTypeByNumber("6111-1111-1111-1116", "Discover", false)
	testCardTypeByNumber("3400-0000-0000-009", "AMEX", false);
	testCardTypeByNumber("4111-1111-1111-1111", "VISA", false);
});

})(jQuery);