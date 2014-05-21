module("remote");

asyncTest("remote", function() {
	expect(7);
	var e = $("#username"),
		v = $("#userForm").validate({
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
		equal( 1, v.size(), "There must be one error" );
		equal( "Peter in use", v.errorList[0].message );

		$(document).ajaxStop(function() {
			$(document).unbind("ajaxStop");
			equal( 1, v.size(), "There must be one error" );
			equal( "Peter2 in use", v.errorList[0].message );
			start();
		});
		e.val("Peter2");
		strictEqual( v.element(e), true, "new value, new request; dependency-mismatch considered as valid though" );
	});
	strictEqual( v.element(e), false, "invalid element, nothing entered yet" );
	e.val("Peter");
	strictEqual( v.element(e), true, "still invalid, because remote validation must block until it returns; dependency-mismatch considered as valid though" );
});

asyncTest("remote, customized ajax options", function() {
	expect(2);
	$("#userForm").validate({
		rules: {
			username: {
				required: true,
				remote: {
					url: "users.php",
					type: "POST",
					beforeSend: function(request, settings) {
						deepEqual(settings.type, "POST");
						deepEqual(settings.data, "username=asdf&email=email.com");
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


asyncTest("remote extensions", function() {
	expect(5);
	var e = $("#username"),
		v = $("#userForm").validate({
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
		if ( v.size() !== 0 ) {
			ok( "There must be one error" );
			equal( v.errorList[0].message, "asdf is already taken, please try something else" );
			v.element(e);
			equal( v.errorList[0].message, "asdf is already taken, please try something else", "message doesn't change on revalidation" );
		}
		start();
	});
	strictEqual( v.element(e), false, "invalid element, nothing entered yet" );
	e.val("asdf");
	strictEqual( v.element(e), true, "still invalid, because remote validation must block until it returns; dependency-mismatch considered as valid though" );
});

asyncTest("remote radio correct value sent", function() {
	expect(1);
	var e = $("#testForm10Radio2"),
		v;

	e.attr("checked", "checked");
	v = $("#testForm10").validate({
		rules: {
			testForm10Radio: {
				required: true,
				remote: {
					url: "echo.php",
					dataType: "json",
					success: function(data) {
						equal( data.testForm10Radio, "2", " correct radio value sent" );
						start();
					}
				}
			}
		}
	});

	v.element(e);
});

asyncTest("remote reset clear old value", function() {
	expect(1);
	var e = $("#username"),
		v = $("#userForm").validate({
			rules: {
				username: {
					required: true,
					remote: {
						url: "echo.php",
						dataFilter: function(data) {
							var json = JSON.parse(data);
							if(json.username === "asdf") {
								return "\"asdf is already taken\"";
							}
							return "\"" + true + "\"";
						}
					}
				}
			}
		});

	$(document).ajaxStop(function() {
		var waitTimeout;

		$(document).unbind("ajaxStop");


		$(document).ajaxStop(function() {
			clearTimeout(waitTimeout);
			ok( true, "Remote request sent to server" );
			start();
		});


		v.resetForm();
		e.val("asdf");
		waitTimeout = setTimeout(function() {
			ok( false, "Remote server did not get request");
			start();
		}, 200);
		v.element(e);
	});
	e.val("asdf");
	v.element(e);
});
