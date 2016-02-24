if ( window.sessionStorage ) {
	sessionStorage.clear();
}
jQuery.validator.defaults.debug = true;
$.mockjaxSettings.log = $.noop;

$.mockjax( {
	url: "form.php?user=Peter&password=foobar",
	responseText: "Hi Peter, welcome back.",
	responseStatus: 200,
	responseTime: 1
} );

$.mockjax( {
	url: "users.php",
	data: {
		username: /Peter2?|asdf/
	},
	responseText: "false",
	responseStatus: 200,
	responseTime: 1
} );

$.mockjax( {
	url: "users2.php",
	data: {
		username: "asdf"
	},
	responseText: "\"asdf is already taken, please try something else\"",
	responseStatus: 200,
	responseTime: 1
} );

$.mockjax( {
	url: "echo.php",
	response: function( data ) {
		this.responseText = JSON.stringify( data.data );
	},
	responseTime: 100
} );

$.mockjax( {
	url: "response.php",
	response: function( settings ) {
		var responseText = settings.data.responseText;
		if ( responseText ) {
			if ( typeof responseText === "function" ) {
				this.responseText = responseText();
			} else {
				this.responseText = responseText;
			}
		} else {
			this.responseText = "";
		}
		this.responseStatus = settings.data.responseStatus || 200;
		this.responseTime = settings.data.responseTime || 100;
	}
} );

$.mockjax( {
	url: "issue1508.php",
	response: function( settings ) {
		if ( /abc/i.test( settings.data.val2 ) ) {
			this.responseText = "false";
		} else {
			this.responseText = "true";
		}
	},
	responseStatus: 200,
	responseTime: 1
} );

$.mockjax( {
	url: "workemail.php",
	response: function( data ) {
		this.responseStatus = data.data.special === "somevalue" ? 200 : 400; //Requires special param for request
		if ( this.responseStatus === 200 ) { //Only if valid request - processing workemail
			this.responseText = JSON.stringify( data.data.email === "john.doe@company.com" );
		}
	}
} );

// Asserts that there is a visible error with the given text for the specified element
QUnit.assert.hasError = function( element, text, message ) {
	var errors = $( element ).closest( "form" ).validate().errorsFor( element[ 0 ] ),
		actual = ( errors.length === 1 && errors.is( ":visible" ) ) ? errors.text() : "";
	QUnit.push( actual, actual, text, message );
};

// Asserts that there is no visible error for the given element
QUnit.assert.noErrorFor = function( element, message ) {
	var errors = $( element ).closest( "form" ).validate().errorsFor( element[ 0 ] ),
		hidden = ( errors.length === 0 ) || ( errors.is( ":hidden" ) && ( errors.text() === "" ) );
	QUnit.push( hidden, hidden, true, message );
};

module( "validator" );

test( "Constructor", function() {
	var v1 = $( "#testForm1" ).validate(),
		v2 = $( "#testForm1" ).validate();

	equal( v1, v2, "Calling validate() multiple times must return the same validator instance" );
	equal( v1.elements().length, 3, "validator elements" );
} );

test( "validate() without elements, with non-form elements", 0, function() {
	$( "#doesntexist" ).validate();
} );

test( "valid() plugin method", function() {
	var form = $( "#userForm" ),
		input = $( "#username" );

	form.validate();
	ok( !form.valid(), "Form isn't valid yet" );
	ok( !input.valid(), "Input isn't valid either" );

	input.val( "Hello world" );
	ok( form.valid(), "Form is now valid" );
	ok( input.valid(), "Input is valid, too" );
} );

test( "valid() plugin method, multiple inputs", function() {
	var form = $( "#testForm1" ),
		validator = form.validate(),
		inputs = form.find( "input" );

	ok( !inputs.valid(), "all invalid" );
	inputs.not( ":first" ).val( "ok" );
	equal( validator.numberOfInvalids(), 2 );
	strictEqual( inputs.valid(), false, "just one invalid" );
	inputs.val( "ok" );
	strictEqual( inputs.valid(), true, "all valid" );
} );

test( "valid() plugin method, special handling for checkable groups", function() {

	// Rule is defined on first checkbox, must apply to others, too
	var checkable = $( "#checkable2" );
	ok( !checkable.valid(), "must be invalid, not checked yet" );
	checkable.attr( "checked", true );
	ok( checkable.valid(), "valid, is now checked" );
	checkable.attr( "checked", false );
	ok( !checkable.valid(), "invalid again" );
	$( "#checkable3" ).attr( "checked", true );
	ok( checkable.valid(), "valid, third box is checked" );
} );

test( "valid() ???", function() {
	expect( 4 );
	var errorList = [
			{
				name: "meal",
				message: "foo",
				element: $( "#meal" )[ 0 ]
			}
		],
		v = $( "#testForm3" ).validate();

	ok( v.valid(), "No errors, must be valid" );
	v.errorList = errorList;
	ok( !v.valid(), "One error, must be invalid" );
	QUnit.reset();
	v = $( "#testForm3" ).validate( {
		submitHandler: function() {
			ok( false, "Submit handler was called" );
		}
	} );
	ok( v.valid(), "No errors, must be valid and returning true, even with the submit handler" );
	v.errorList = errorList;
	ok( !v.valid(), "One error, must be invalid, no call to submit handler" );
} );

test( "valid(), ignores ignored elements", function() {
	$( "#testForm1clean" ).validate( {
		ignore: "#firstnamec",
		rules: {
			firstnamec: "required"
		}
	} );
	ok( $( "#firstnamec" ).valid() );
} );

test( "addMethod", function() {
	expect( 3 );
	$.validator.addMethod( "hi", function( value ) {
		return value === "hi";
	}, "hi me too" );
	var method = $.validator.methods.hi,
		e = $( "#text1" )[ 0 ];
	ok( !method( e.value, e ), "Invalid" );
	e.value = "hi";
	ok( method( e.value, e ), "Invalid" );
	ok( jQuery.validator.messages.hi === "hi me too", "Check custom message" );
} );

test( "addMethod2", function() {
	expect( 4 );
	$.validator.addMethod( "complicatedPassword", function( value, element ) {
		return this.optional( element ) || /\D/.test( value ) && /\d/.test( value );
	}, "Your password must contain at least one number and one letter" );
	var v = jQuery( "#form" ).validate( {
			rules: {
				action: { complicatedPassword: true }
			}
		} ),
		e = $( "#text1" )[ 0 ];

	e.value = "";
	strictEqual( v.element( e ), true, "Rule is optional, valid" );
	equal( v.size(), 0 );
	e.value = "ko";
	ok( !v.element( e ), "Invalid, doesn't contain one of the required characters" );
	e.value = "ko1";
	ok( v.element( e ) );
} );

test( "form(): simple", function() {
	expect( 2 );
	var form = $( "#testForm1" )[ 0 ],
		v = $( form ).validate();

	ok( !v.form(), "Invalid form" );
	$( "#firstname" ).val( "hi" );
	$( "#lastname" ).val( "hi" );
	ok( v.form(), "Valid form" );
} );

test( "form(): checkboxes: min/required", function() {
	expect( 3 );
	var form = $( "#testForm6" )[ 0 ],
		v = $( form ).validate();

	ok( !v.form(), "Invalid form" );
	$( "#form6check1" ).attr( "checked", true );
	ok( !v.form(), "Invalid form" );
	$( "#form6check2" ).attr( "checked", true );
	ok( v.form(), "Valid form" );
} );

test( "form(): radio buttons: required", function() {
	expect( 6 );
	var form = $( "#testForm10" )[ 0 ],
		v = $( form ).validate( {
			rules: {
				testForm10Radio: "required"
			}
		} );

	ok( !v.form(), "Invalid Form" );
	equal( $( "#testForm10Radio1" ).attr( "class" ), "error" );
	equal( $( "#testForm10Radio2" ).attr( "class" ), "error" );

	$( "#testForm10Radio2" ).attr( "checked", true );
	ok( v.form(), "Valid form" );

	equal( $( "#testForm10Radio1" ).attr( "class" ), "valid" );
	equal( $( "#testForm10Radio2" ).attr( "class" ), "valid" );
} );

test( "form(): selects: min/required", function() {
	expect( 3 );
	var form = $( "#testForm7" )[ 0 ],
		v = $( form ).validate();

	ok( !v.form(), "Invalid form" );
	$( "#optionxa" ).attr( "selected", true );
	ok( !v.form(), "Invalid form" );
	$( "#optionxb" ).attr( "selected", true );
	ok( v.form(), "Valid form" );
} );

test( "form(): with equalTo", function() {
	expect( 2 );
	var form = $( "#testForm5" )[ 0 ],
		v = $( form ).validate();

	ok( !v.form(), "Invalid form" );
	$( "#x1, #x2" ).val( "hi" );
	ok( v.form(), "Valid form" );
} );

test( "form(): with equalTo and onfocusout=false", function() {
	expect( 4 );
	var form = $( "#testForm5" )[ 0 ],
		v = $( form ).validate( {
			onfocusout: false,
			showErrors: function() {
				ok( true, "showErrors should only be called twice" );
				this.defaultShowErrors();
			}
		} );

	$( "#x1, #x2" ).val( "hi" );
	ok( v.form(), "Valid form" );
	$( "#x2" ).val( "not equal" ).blur();
	ok( !v.form(), "Invalid form" );
} );

test( "check(): simple", function() {
	expect( 3 );
	var element = $( "#firstname" )[ 0 ],
		v = $( "#testForm1" ).validate();

	ok( v.size() === 0, "No errors yet" );
	v.check( element );
	ok( v.size() === 1, "error exists" );
	v.errorList = [];
	$( "#firstname" ).val( "hi" );
	v.check( element );
	ok( v.size() === 0, "No more errors" );
} );

test( "hide(): input", function() {
	expect( 3 );
	var errorLabel = $( "#errorFirstname" ),
		element = $( "#firstname" )[ 0 ],
		v;

	element.value = "bla";
	v = $( "#testForm1" ).validate();
	errorLabel.show();

	ok( errorLabel.is( ":visible" ), "Error label visible before validation" );
	ok( v.element( element ) );
	ok( errorLabel.is( ":hidden" ), "Error label not visible after validation" );
} );

test( "hide(): radio", function() {
	expect( 2 );
	var errorLabel = $( "#agreeLabel" ),
		element = $( "#agb" )[ 0 ],
		v;

	element.checked = true;
	v = $( "#testForm2" ).validate( { errorClass: "xerror" } );
	errorLabel.show();

	ok( errorLabel.is( ":visible" ), "Error label visible after validation" );
	v.element( element );
	ok( errorLabel.is( ":hidden" ), "Error label not visible after hiding it" );
} );

test( "hide(): errorWrapper", function() {
	expect( 2 );
	var errorLabel = $( "#errorWrapper" ),
		element = $( "#meal" )[ 0 ],
		v;

	element.selectedIndex = 1;
	errorLabel.show();

	ok( errorLabel.is( ":visible" ), "Error label visible after validation" );
	v = $( "#testForm3" ).validate( { wrapper: "li", errorLabelContainer: $( "#errorContainer" ) } );
	v.element( element );
	ok( errorLabel.is( ":hidden" ), "Error label not visible after hiding it" );
} );

test( "hide(): container", function() {
	expect( 4 );
	var errorLabel = $( "#errorContainer" ),
		v = $( "#testForm3" ).validate( { errorWrapper: "li", errorContainer: $( "#errorContainer" ) } );

	v.form();
	ok( errorLabel.is( ":visible" ), "Error label visible after validation" );
	$( "#meal" )[ 0 ].selectedIndex = 1;
	v.form();
	ok( errorLabel.is( ":hidden" ), "Error label not visible after hiding it" );
	$( "#meal" )[ 0 ].selectedIndex = -1;
	v.element( "#meal" );
	ok( errorLabel.is( ":visible" ), "Error label visible after validation" );
	$( "#meal" )[ 0 ].selectedIndex = 1;
	v.element( "#meal" );
	ok( errorLabel.is( ":hidden" ), "Error label not visible after hiding it" );
} );

test( "submitHandler keeps submitting button", function() {
	var button, event;

	$( "#userForm" ).validate( {
		debug: true,
		submitHandler: function( form ) {

			// Dunno how to test this better; this tests the implementation that uses a hidden input
			var hidden = $( form ).find( "input:hidden" )[ 0 ];
			deepEqual( hidden.value, button.value );
			deepEqual( hidden.name, button.name );
		}
	} );
	$( "#username" ).val( "bla" );
	button = $( "#userForm :submit" )[ 0 ];
	event = $.Event( "click" );
	event.preventDefault();
	$.event.trigger( event, null, button );
	$( "#userForm" ).submit();
} );

asyncTest( "validation triggered on radio/checkbox when using keyboard", function() {
    expect( 1 );
	var input, i, events, triggeredEvents = 0;

	$( "#form" ).validate( {
		onfocusin: function() {
			triggeredEvents++;
		},
		onfocusout: function() {
			triggeredEvents++;
		},
		onkeyup: function() {
			triggeredEvents++;
		}
	} );

	events = [
		$.Event( "focusin" ),
		$.Event( "focusout" ),
		$.Event( "keyup" )
	];

	input = $( "#form :radio:first" );
	for ( i = 0; i < events.length; i++ ) {
		input.trigger( events[ i ] );
	}

	input = $( "#form :checkbox:first" );
	for ( i = 0; i < events.length; i++ ) {
		input.trigger( events[ i ] );
	}

	setTimeout( function() {

		// Assert all event handlers fired
		equal( triggeredEvents, 6 );
		start();
	} );
} );

asyncTest( "validation triggered on radio/checkbox when using mouseclick", function() {
    expect( 1 );
	var input, i, events, triggeredEvents = 0;

	$( "#form" ).validate( {
		onclick: function() {
			triggeredEvents++;
		}
	} );

	events = [
		$.Event( "click" )
	];

	input = $( "#form :radio:first" );
	for ( i = 0; i < events.length; i++ ) {
		input.trigger( events[ i ] );
	}

	input = $( "#form :checkbox:first" );
	for ( i = 0; i < events.length; i++ ) {
		input.trigger( events[ i ] );
	}

	setTimeout( function() {

		// Assert all event handlers fired
		equal( triggeredEvents, 2 );
		start();
	} );
} );

test( "showErrors()", function() {
	expect( 4 );
	var errorLabel = $( "#errorFirstname" ).hide(),
		v = $( "#testForm1" ).validate();

	ok( errorLabel.is( ":hidden" ) );
	equal( $( "#lastname" ).next( ".error:not(input)" ).length, 0 );
	v.showErrors( { "firstname": "required", "lastname": "bla" } );
	equal( errorLabel.is( ":visible" ), true );
	equal( $( "#lastname" ).next( ".error:not(input)" ).is( ":visible" ), true );
} );

test( "showErrors(), allow empty string and null as default message", function() {
	$( "#userForm" ).validate( {
		rules: {
			username: {
				required: true,
				minlength: 3
			}
		},
		messages: {
			username: {
				required: "",
				minlength: "too short"
			}
		}
	} );
	ok( !$( "#username" ).valid() );
	equal( $( "#username" ).next( ".error:not(input)" ).text(), "" );

	$( "#username" ).val( "ab" );
	ok( !$( "#username" ).valid() );
	equal( $( "#username" ).next( ".error:not(input)" ).text(), "too short" );

	$( "#username" ).val( "abc" );
	ok( $( "#username" ).valid() );
	ok( $( "#username" ).next( ".error:not(input)" ).is( ":hidden" ) );
} );

test( "showErrors() - external messages", function() {
	expect( 4 );
	var methods = $.extend( {}, $.validator.methods ),
		messages = $.extend( {}, $.validator.messages ),
		form, v;

	$.validator.addMethod( "foo", function() { return false; } );
	$.validator.addMethod( "bar", function() { return false; } );
	equal( $( "#testForm4 #f1" ).next( ".error:not(input)" ).length, 0 );
	equal( $( "#testForm4 #f2" ).next( ".error:not(input)" ).length, 0 );

	form = $( "#testForm4" )[ 0 ];
	v = $( form ).validate( {
		messages: {
			f1: "Please!",
			f2: "Wohoo!"
		}
	} );
	v.form();
	equal( $( "#testForm4 #f1" ).next( ".error:not(input)" ).text(), "Please!" );
	equal( $( "#testForm4 #f2" ).next( ".error:not(input)" ).text(), "Wohoo!" );

	$.validator.methods = methods;
	$.validator.messages = messages;
} );

test( "showErrors() - custom handler", function() {
	expect( 5 );
	var v = $( "#testForm1" ).validate( {
		showErrors: function( errorMap, errorList ) {
			equal( v, this );
			equal( v.errorList, errorList );
			equal( v.errorMap, errorMap );
			equal( errorMap.firstname, "buga" );
			equal( errorMap.lastname, "buga" );
		}
	} );
	v.form();
} );

test( "option: (un)highlight, default", function() {
	$( "#testForm1" ).validate();
	var e = $( "#firstname" );
	ok( !e.hasClass( "error" ) );
	ok( !e.hasClass( "valid" ) );
	e.valid();
	ok( e.hasClass( "error" ) );
	ok( !e.hasClass( "valid" ) );
	e.val( "hithere" ).valid();
	ok( !e.hasClass( "error" ) );
	ok( e.hasClass( "valid" ) );
} );

test( "option: (un)highlight, nothing", function() {
	expect( 3 );
	$( "#testForm1" ).validate( {
		highlight: false,
		unhighlight: false
	} );
	var e = $( "#firstname" );
	ok( !e.hasClass( "error" ) );
	e.valid();
	ok( !e.hasClass( "error" ) );
	e.valid();
	ok( !e.hasClass( "error" ) );
} );

test( "option: (un)highlight, custom", function() {
	expect( 5 );
	$( "#testForm1clean" ).validate( {
		highlight: function( element, errorClass ) {
			equal( errorClass, "invalid" );
			$( element ).hide();
		},
		unhighlight: function( element, errorClass ) {
			equal( errorClass, "invalid" );
			$( element ).show();
		},
		ignore: "",
		errorClass: "invalid",
		rules: {
			firstnamec: "required"
		}
	} );
	var e = $( "#firstnamec" );
	ok( e.is( ":visible" ) );
	e.valid();
	ok( !e.is( ":visible" ) );
	e.val( "hithere" ).valid();
	ok( e.is( ":visible" ) );
} );

test( "option: (un)highlight, custom2", function() {
	expect( 6 );
	var e, l;
	$( "#testForm1" ).validate( {
		highlight: function( element, errorClass ) {
			$( element ).addClass( errorClass );
			$( element ).next( ".error:not(input)" ).addClass( errorClass );
		},
		unhighlight: function( element, errorClass ) {
			$( element ).removeClass( errorClass );
			$( element ).next( ".error:not(input)" ).removeClass( errorClass );
		},
		errorClass: "invalid"
	} );

	e = $( "#firstname" );
	l = $( "#errorFirstname" );

	ok( !e.is( ".invalid" ) );
	ok( !l.is( ".invalid" ) );
	e.valid();
	ok( e.is( ".invalid" ) );
	ok( l.is( ".invalid" ) );
	e.val( "hithere" ).valid();
	ok( !e.is( ".invalid" ) );
	ok( !l.is( ".invalid" ) );
} );

test( "option: focusCleanup default false", function() {
	var form = $( "#userForm" );
	form.validate();
	form.valid();
	ok( form.find( "#username" ).next( ".error:not(input)" ).is( ":visible" ) );
	$( "#username" ).focus();
	ok( form.find( "#username" ).next( ".error:not(input)" ).is( ":visible" ) );
} );

test( "option: focusCleanup true", function() {
	var form = $( "#userForm" );
	form.validate( {
		focusCleanup: true
	} );
	form.valid();
	ok( form.find( "#username" ).next( ".error:not(input)" ).is( ":visible" ) );
	$( "#username" ).focus().trigger( "focusin" );
	ok( !form.find( "#username" ).next( ".error:not(input)" ).is( ":visible" ) );
} );

test( "option: focusCleanup with wrapper", function() {
	var form = $( "#userForm" );
	form.validate( {
		focusCleanup: true,
		wrapper: "span"
	} );
	form.valid();
	ok( form.is( ":has(span:visible:has(.error#username-error))" ) );
	$( "#username" ).focus().trigger( "focusin" );
	ok( !form.is( ":has(span:visible:has(.error#username-error))" ) );
} );

test( "option: errorClass with multiple classes", function() {
	var form = $( "#userForm" );
	form.validate( {
		focusCleanup: true,
		wrapper: "span",
		errorClass: "error error1 error2"
	} );
	form.valid();
	ok( form.is( ":has(span:visible:has(.error#username-error))" ) );
	ok( form.is( ":has(span:visible:has(.error1#username-error))" ) );
	ok( form.is( ":has(span:visible:has(.error2#username-error))" ) );
	$( "#username" ).focus().trigger( "focusin" );
	ok( !form.is( ":has(span:visible:has(.error#username-error))" ) );
	ok( !form.is( ":has(span:visible:has(.error1#username-error))" ) );
	ok( !form.is( ":has(span:visible:has(.error2#username-error))" ) );
} );

test( "defaultMessage(), empty title is ignored", function() {
	var v = $( "#userForm" ).validate();
	equal( v.defaultMessage( $( "#username" )[ 0 ], { method: "required", parameters: true } ), "This field is required." );
} );

test( "#741: move message processing from formatAndAdd to defaultMessage", function() {
	var v = $( "#testForm22" ).validate();
	equal( v.defaultMessage( $( "#tF22Input" )[ 0 ], { method: "minlength", parameters: 5 } ),
		"You should enter at least 5 characters.", "defaultMessage() now format the messages" );

	$( "#tF22Input" ).val( "abc" );
	v.form();
	equal( v.errorList[ 0 ].message, "You should enter at least 5 characters." );
} );

test( "formatAndAdd", function() {
	expect( 4 );
	var v = $( "#form" ).validate(),
		fakeElement = { form: $( "#form" )[ 0 ], name: "bar" };

	v.formatAndAdd( fakeElement, { method: "maxlength", parameters: 2 } );
	equal( v.errorList[ 0 ].message, "Please enter no more than 2 characters." );
	equal( v.errorList[ 0 ].element.name, "bar" );

	v.formatAndAdd( fakeElement, { method: "range", parameters: [ 2, 4 ] } );
	equal( v.errorList[ 1 ].message, "Please enter a value between 2 and 4." );

	v.formatAndAdd( fakeElement, { method: "range", parameters: [ 0, 4 ] } );
	equal( v.errorList[ 2 ].message, "Please enter a value between 0 and 4." );
} );

test( "formatAndAdd2", function() {
	expect( 3 );
	var v = $( "#form" ).validate(),
		fakeElement = { form: $( "#form" )[ 0 ], name: "bar" };

	jQuery.validator.messages.test1 = function( param, element ) {
		equal( this, v );
		equal( param, 0 );
		return "element " + element.name + " is not valid";
	};
	v.formatAndAdd( fakeElement, { method: "test1", parameters: 0 } );
	equal( v.errorList[ 0 ].message, "element bar is not valid" );
} );

test( "formatAndAdd, auto detect substitution string", function() {
	var v = $( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: {
				required: true,
				rangelength: [ 5, 10 ]
			}
		},
		messages: {
			firstnamec: {
				rangelength: "at least ${0}, up to {1}"
			}
		}
	} );
	$( "#firstnamec" ).val( "abc" );
	v.form();
	equal( v.errorList[ 0 ].message, "at least 5, up to 10" );
} );

asyncTest( "option invalidHandler", function() {
	expect( 1 );
	$( "#testForm1clean" ).validate( {
		invalidHandler: function() {
			ok( true, "invalid-form event triggered called" );
			start();
		}
	} );
	$( "#usernamec" ).val( "asdf" ).rules( "add", { required: true, minlength: 5 } );
	$( "#testForm1clean" ).submit();
} );

test( "findByName()", function() {
	deepEqual(
		new $.validator( {}, document.getElementById( "form" ) )
			.findByName( document.getElementById( "radio1" ).name )
			.get(),
		$( "#form" ).find( "[name=radio1]" ).get()
	);
} );

test( "focusInvalid()", function() {

	// TODO when using custom focusin, this is triggered just once
	// TODO when using 1.4 focusin, triggered twice; fix once not testing against 1.3 anymore
	// expect( 1 );
	var inputs = $( "#testForm1 input" ).focus( function() {
			equal( this, inputs[ 0 ], "focused first element" );
		} ),
		v = $( "#testForm1" ).validate();

	v.form();
	v.focusInvalid();
} );

test( "focusInvalid() after validate a custom set of inputs", function() {
	var form = $( "#testForm1" ),
		validator = form.validate(),

		// It's important the order of Valid, Invalid, Valid so last active element it's a valid element before focus
		inputs = $( "#firstname, #lastname, #something" );

	$( "#firstname" ).val( "ok" );

	ok( !inputs.valid(), "just one invalid" );

	validator.focusInvalid();

	equal( form[ 0 ].ownerDocument.activeElement, $( "#lastname" )[ 0 ], "focused first element" );
} );

test( "findLastActive()", function() {
	expect( 3 );
	var v = $( "#testForm1" ).validate(),
		lastActive;

	ok( !v.findLastActive() );
	v.form();
	v.focusInvalid();
	equal( v.findLastActive(), $( "#firstname" )[ 0 ] );
	lastActive = $( "#lastname" ).trigger( "focus" ).trigger( "focusin" )[ 0 ];

	equal( v.lastActive, lastActive );
} );

test( "elementValue() finds radios/checkboxes only within the current form", function() {
	expect( 1 );
	var v = $( "#userForm" ).validate(), foreignRadio = $( "#radio2" )[ 0 ];

	ok( !v.elementValue( foreignRadio ) );
} );

test( "elementValue() returns the file input's name without the prefix 'C:\\fakepath\\' ", function() {
	var v = $( "#userForm" ).validate(),

		// A fake file input
		fileInput = {
			name: "fakeFile",
			type: "file",
			files: {},
			nodeName: "INPUT",
			value: "C:\\fakepath\\somefile.txt",
			form: $( "#userForm" )[ 0 ],
			hasAttribute: function() { return false; },
			getAttribute: function( name ) {
				if ( name === "type" ) {
					return "file";
				}

				return undefined;
			},
			setAttribute: function() {}
		};

	v.defaultShowErrors = function() {};
	v.validationTargetFor = function() {
		return fileInput;
	};

	equal( v.elementValue( fileInput ), "somefile.txt" );

	$( fileInput ).rules( "add", {
		minlength: 10
	} );

	ok( v.element( fileInput ), "The fake file input is valid (length = 12, minlength = 10)" );

	fileInput.value = "C:\\fakepath\\file.txt";
	ok( !v.element( fileInput ), "The fake file input is invalid (length = 8, minlength = 10)" );

	$( fileInput ).rules( "remove" );
	$( fileInput ).rules( "add", {
		maxlength: 10
	} );

	ok( v.element( fileInput ), "The fake file input is valid (length = 8, maxlength = 10)" );

	fileInput.value = "C:\\fakepath\\fakefile.txt";
	ok( !v.element( fileInput ), "The fake file input is invalid (length = 12, maxlength = 10)" );
} );

test( "", function() {
	var v = $( "#userForm" ).validate(),

		// A fake number input
		numberInput = {
			name: "fakeNumber",
			type: "number",
			nodeName: "INPUT",
			value: "",
			form: $( "#userForm" )[ 0 ],
			validity: {
				badInput: false
			},
			hasAttribute: function() { return false; },
			getAttribute: function( name ) {
				return this[ name ];
			},
			setAttribute: function() {}
		};

	v.defaultShowErrors = function() {};
	v.validationTargetFor = function() {
		return numberInput;
	};

	$( numberInput ).rules( "add", {
		required: true
	} );

	deepEqual( $( numberInput ).rules(), { required: true, number: true } );
	ok( !v.element( numberInput ), "The fake number input is invalid" );
	equal( v.errorList[ 0 ].message, $.validator.messages.required, "The error message should be the one of required rule." );

	numberInput.value = "Not A Number";
	numberInput.validity.badInput = true;
	ok( !v.element( numberInput ), "The fake number input is invalid" );
	equal( v.errorList[ 0 ].message, $.validator.messages.number, "The error message should be the one of number rule." );

	numberInput.value = "2015";
	numberInput.validity.badInput = false;
	ok( v.element( numberInput ), "The fake number input is valid" );
} );

test( "validating multiple checkboxes with 'required'", function() {
	expect( 3 );
	var checkboxes = $( "#form input[name=check3]" ).prop( "checked", false ),
		v;
	equal( checkboxes.length, 5 );

	v = $( "#form" ).validate( {
		rules: {
			check3: "required"
		}
	} );
	v.form();

	equal( v.size(), 1 );
	checkboxes.filter( ":last" ).prop( "checked", true );
	v.form();
	equal( v.size(), 0 );
} );

test( "dynamic form", function() {
	var counter = 0,
		v;
	function add() {
		$( "<input data-rule-required='true' name='list" + counter++ + "' />" ).appendTo( "#testForm2" );
	}
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}

	v = $( "#testForm2" ).validate();
	v.form();
	errors( 1 );
	add();
	v.form();
	errors( 2 );
	add();
	v.form();
	errors( 3 );
	$( "#testForm2 input[name=list1]" ).remove();
	v.form();
	errors( 2 );
	add();
	v.form();
	errors( 3 );
	$( "#testForm2 input[name^=list]" ).remove();
	v.form();
	errors( 1 );
	$( "#agb" ).attr( "disabled", true );
	v.form();
	errors( 0 );
	$( "#agb" ).attr( "disabled", false );
	v.form();
	errors( 1 );
} );

test( "idOrName()", function() {
	expect( 4 );
	var v = $( "#testForm1" ).validate();
	equal( v.idOrName( $( "#form8input" )[ 0 ] ), "form8input" );
	equal( v.idOrName( $( "#form6check1" )[ 0 ] ), "check" );
	equal( v.idOrName( $( "#agb" )[ 0 ] ), "agree" );
	equal( v.idOrName( $( "#form :button" )[ 0 ] ), "button" );
} );

test( "resetForm()", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	var v = $( "#testForm1" ).validate();
	v.form();
	errors( 2 );
	ok( $( "#firstname" ).hasClass( "error" ) );
	ok( $( "#something" ).hasClass( "valid" ) );
	$( "#firstname" ).val( "hiy" );
	v.resetForm();
	errors( 0 );
	ok( !$( "#firstname" ).hasClass( "error" ) );
	ok( !$( "#something" ).hasClass( "valid" ) );
	equal( $( "#firstname" ).val(), "", "form plugin is included, therefor resetForm must also reset inputs, not only errors" );
} );

test( "resetForm() clean styles when custom highlight function is used", function() {
	var form = $( "#testForm1clean" ),
		e = $( "#firstnamec" );
	form.validate( {
		highlight: function( element ) {
			$( element ).hide();
		},
		unhighlight: function( element ) {
			$( element ).show();
		},
		ignore: "",
		errorClass: "invalid",
		rules: {
			firstnamec: "required"
		}
	} );
	e.valid();
	ok( !e.is( ":visible" ) );
	form.validate().resetForm();
	ok( e.is( ":visible" ) );
} );

test( "message from title", function() {
	var v = $( "#withTitle" ).validate();
	v.checkForm();
	equal( v.errorList[ 0 ].message, "fromtitle", "title not used" );
} );

test( "ignoreTitle", function() {
	var v = $( "#withTitle" ).validate( { ignoreTitle: true } );
	v.checkForm();
	equal( v.errorList[ 0 ].message, $.validator.messages.required, "title used when it should have been ignored" );
} );

asyncTest( "ajaxSubmit", function() {
	expect( 1 );
	$( "#user" ).val( "Peter" );
	$( "#password" ).val( "foobar" );
	jQuery( "#signupForm" ).validate( {
		submitHandler: function( form ) {
			jQuery( form ).ajaxSubmit( {
				success: function( response ) {
					equal( response, "Hi Peter, welcome back." );
					start();
				}
			} );
		}
	} );
	jQuery( "#signupForm" ).triggerHandler( "submit" );
} );

test( "validating groups settings parameter", function() {
	var form = $( "<form>" ),
		validate = form.validate( {
			groups: {
				arrayGroup: [ "input one", "input-two", "input three" ],
				stringGroup: "input-four input-five input-six"
			}
		} );

	equal( validate.groups[ "input one" ], "arrayGroup" );
	equal( validate.groups[ "input-two" ], "arrayGroup" );
	equal( validate.groups[ "input three" ], "arrayGroup" );
	equal( validate.groups[ "input-four" ], "stringGroup" );
	equal( validate.groups[ "input-five" ], "stringGroup" );
	equal( validate.groups[ "input-six" ], "stringGroup" );
} );

test( "bypassing validation on form submission", function() {
	var form = $( "#bypassValidation" ),
		normalSubmission = $( "form#bypassValidation :input[id=normalSubmit]" ),
		bypassSubmitWithCancel = $( "form#bypassValidation :input[id=bypassSubmitWithCancel]" ),
		bypassSubmitWithNoValidate1 = $( "form#bypassValidation :input[id=bypassSubmitWithNoValidate1]" ),
		bypassSubmitWithNoValidate2 = $( "form#bypassValidation :input[id=bypassSubmitWithNoValidate2]" ),
		$v = form.validate( {
			debug: true
		} );

	bypassSubmitWithCancel.click();
	equal( $v.numberOfInvalids(), 0, "Validation was bypassed using CSS 'cancel' class." );
	$v.resetForm();

	bypassSubmitWithNoValidate1.click();
	equal( $v.numberOfInvalids(), 0, "Validation was bypassed using blank 'formnovalidate' attribute." );
	$v.resetForm();

	bypassSubmitWithNoValidate2.click();
	equal( $v.numberOfInvalids(), 0, "Validation was bypassed using 'formnovalidate=\"formnovalidate\"' attribute." );
	$v.resetForm();

	normalSubmission.click();
	equal( $v.numberOfInvalids(), 1, "Validation failed correctly" );
} );

test( "works on contenteditable fields", function( assert ) {
	var form = $( "#contenteditableForm" );
	form.valid();
	assert.hasError( $( "#contenteditableNumberInvalid" ), "Please enter a valid number." );
	assert.hasError( $( "#contenteditableRequiredInvalid" ), "This field is required." );
	assert.hasError( $( "#contenteditableInput" ), "Please enter a valid number." );
	assert.noErrorFor( $( "#contenteditableNumberValid" ) );
	assert.noErrorFor( $( "#contenteditableRequiredValid" ) );
} );

module( "misc" );

test( "success option", function() {
	expect( 7 );
	equal( $( "#firstname" ).val(), "" );
	var v = $( "#testForm1" ).validate( {
			success: "valid"
		} ),
		label = $( "#testForm1 .error:not(input)" );

	ok( label.is( ".error" ) );
	ok( !label.is( ".valid" ) );
	v.form();
	ok( label.is( ".error" ) );
	ok( !label.is( ".valid" ) );
	$( "#firstname" ).val( "hi" );
	v.form();
	ok( label.is( ".error" ) );
	ok( label.is( ".valid" ) );
} );

test( "success option2", function() {
	expect( 5 );
	equal( $( "#firstname" ).val(), "" );
	var v = $( "#testForm1" ).validate( {
			success: "valid"
		} ),
		label = $( "#testForm1 .error:not(input)" );

	ok( label.is( ".error" ) );
	ok( !label.is( ".valid" ) );
	$( "#firstname" ).val( "hi" );
	v.form();
	ok( label.is( ".error" ) );
	ok( label.is( ".valid" ) );
} );

test( "success option3", function() {
	expect( 5 );
	equal( $( "#firstname" ).val(), "" );
	$( "#errorFirstname" ).remove();
	var v = $( "#testForm1" ).validate( {
			success: "valid"
		} ),
		labels;

	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
	$( "#firstname" ).val( "hi" );
	v.form();
	labels = $( "#testForm1 .error:not(input)" );

	equal( labels.length, 3 );
	ok( labels.eq( 0 ).is( ".valid" ) );
	ok( !labels.eq( 1 ).is( ".valid" ) );
} );

test( "successlist", function() {
	var v = $( "#form" ).validate( { success: "xyz" } );
	v.form();
	equal( v.successList.length, 0 );
} );

test( "success isn't called for optional elements with no other rules", function() {
	expect( 4 );
	equal( $( "#firstname" ).removeAttr( "data-rule-required" ).removeAttr( "data-rule-minlength" ).val(), "" );
	$( "#something" ).remove();
	$( "#lastname" ).remove();
	$( "#errorFirstname" ).remove();
	var v = $( "#testForm1" ).validate( {
		success: function() {
			ok( false, "don't call success for optional elements!" );
		},
		rules: {
			firstname: { required: false }
		}
	} );
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
	v.form();
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
	$( "#firstname" ).valid();
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
} );

test( "success is called for optional elements with other rules", function() {
	expect( 1 );

	$.validator.addMethod( "custom1", function() {
		return true;
	}, "" );

	$( "#testForm1clean" ).validate( {
		success: function() {
			ok( true, "success called correctly!" );
		},
		rules: {
			firstnamec: {
				required: false,
				custom1: true
			}
		}
	} );

	$( "#firstnamec" ).valid();

	delete $.validator.methods.custom1;
} );

test( "success callback with element", function() {
	expect( 1 );
	var v = $( "#userForm" ).validate( {
		success: function( label, element ) {
			equal( element, $( "#username" ).get( 0 ) );
		}
	} );
	$( "#username" ).val( "hi" );
	v.form();
} );

test( "all rules are evaluated even if one returns a dependency-mistmatch", function() {
	expect( 6 );
	equal( $( "#firstname" ).removeAttr( "data-rule-required" ).removeAttr( "data-rule-minlength" ).val(), "" );
	$( "#lastname" ).remove();
	$( "#errorFirstname" ).remove();
	$.validator.addMethod( "custom1", function() {
		ok( true, "custom method must be evaluated" );
		return true;
	}, "" );
	var v = $( "#testForm1" ).validate( {
		rules: {
			firstname: {
				email: true,
				custom1: true
			}
		}
	} );
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
	v.form();
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );
	$( "#firstname" ).valid();
	equal( $( "#testForm1 .error:not(input)" ).length, 0 );

	delete $.validator.methods.custom1;
	delete $.validator.messages.custom1;
} );

test( "messages", function() {
	var m = jQuery.validator.messages;
	equal( m.maxlength( 0 ), "Please enter no more than 0 characters." );
	equal( m.minlength( 1 ), "Please enter at least 1 characters." );
	equal( m.rangelength( [ 1, 2 ] ), "Please enter a value between 1 and 2 characters long." );
	equal( m.max( 1 ), "Please enter a value less than or equal to 1." );
	equal( m.min( 0 ), "Please enter a value greater than or equal to 0." );
	equal( m.range( [ 1, 2 ] ), "Please enter a value between 1 and 2." );
	equal( m.step( 2 ), "Please enter a multiple of 2." );
} );

test( "jQuery.validator.format", function() {
	equal(
		jQuery.validator.format( "Please enter a value between {0} and {1}.", 0, 1 ),
		"Please enter a value between 0 and 1."
	);
	equal(
		jQuery.validator.format( "{0} is too fast! Enter a value smaller then {0} and at least {1}", 0, -15 ),
		"0 is too fast! Enter a value smaller then 0 and at least -15"
	);
	var template = jQuery.validator.format( "{0} is too fast! Enter a value smaller then {0} and at least {1}" );
	equal( template( 0, -15 ), "0 is too fast! Enter a value smaller then 0 and at least -15" );
	template = jQuery.validator.format( "Please enter a value between {0} and {1}." );
	equal( template( [ 1, 2 ] ), "Please enter a value between 1 and 2." );
	equal( $.validator.format( "{0}", "$0" ), "$0" );
} );

test( "option: ignore", function() {
	var v = $( "#testForm1" ).validate( {
		ignore: "[name=lastname]"
	} );
	v.form();
	equal( v.size(), 1 );
} );

test( "option: subformRequired", function() {
	jQuery.validator.addMethod( "billingRequired", function( value, element ) {
		if ( $( "#bill_to_co" ).is( ":checked" ) ) {
			return $( element ).parents( "#subform" ).length;
		}
		return !this.optional( element );
	}, "" );
	var v = $( "#subformRequired" ).validate();
	v.form();
	equal( v.size(), 1 );
	$( "#bill_to_co" ).attr( "checked", false );
	v.form();
	equal( v.size(), 2 );

	delete $.validator.methods.billingRequired;
	delete $.validator.messages.billingRequired;
} );

module( "expressions" );

test( "expression: :blank", function() {
	var e = $( "#lastname" )[ 0 ];
	equal( $( e ).filter( ":blank" ).length, 1 );
	e.value = " ";
	equal( $( e ).filter( ":blank" ).length, 1 );
	e.value = "   ";
	equal( $( e ).filter( ":blank" ).length, 1 );
	e.value = " a ";
	equal( $( e ).filter( ":blank" ).length, 0 );
} );

test( "expression: :filled", function() {
	var e = $( "#lastname" )[ 0 ];
	equal( $( e ).filter( ":filled" ).length, 0 );
	e.value = " ";
	equal( $( e ).filter( ":filled" ).length, 0 );
	e.value = "   ";
	equal( $( e ).filter( ":filled" ).length, 0 );
	e.value = " a ";
	equal( $( e ).filter( ":filled" ).length, 1 );
  e = $( "#meal" )[ 0 ];
  equal( $( e ).filter( ":filled" ).length, 0 );
	$( e ).val( "1" );
	equal( $( e ).filter( ":filled" ).length, 1 );
  e = $( "#selectf7" )[ 0 ];
  equal( $( e ).filter( ":filled" ).length, 0 );
	$( e ).val( [ "1", "2" ] );
	equal( $( e ).filter( ":filled" ).length, 1 );
} );

test( "expression: :unchecked", function() {
	var e = $( "#check2" )[ 0 ];
	equal( $( e ).filter( ":unchecked" ).length, 1 );
	e.checked = true;
	equal( $( e ).filter( ":unchecked" ).length, 0 );
	e.checked = false;
	equal( $( e ).filter( ":unchecked" ).length, 1 );
} );

module( "events" );

test( "validate on blur", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	function labels( expected ) {
		equal( v.errors().filter( ":visible" ).length, expected );
	}
	function blur( target ) {
		target.trigger( "blur" ).trigger( "focusout" );
	}
	$( "#errorFirstname" ).hide();
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate();

	$( "#something" ).val( "" );
	blur( e );
	errors( 0, "No value yet, required is skipped on blur" );
	labels( 0 );
	e.val( "h" );
	blur( e );
	errors( 1, "Required was ignored, but as something was entered, check other rules, minlength isn't met" );
	labels( 1 );
	e.val( "hh" );
	blur( e );
	errors( 0, "All is fine" );
	labels( 0 );
	e.val( "" );
	v.form();
	errors( 3, "Submit checks all rules, both fields invalid" );
	labels( 3 );
	blur( e );
	errors( 1, "Blurring the field results in emptying the error list first, then checking the invalid field: its still invalid, don't remove the error" );
	labels( 3 );
	e.val( "h" );
	blur( e );
	errors( 1, "Entering a single character fulfills required, but not minlength: 2, still invalid" );
	labels( 3 );
	e.val( "hh" );
	blur( e );
	errors( 0, "Both required and minlength are met, no errors left" );
	labels( 2 );
} );

test( "validate on keyup", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	function keyup( target ) {
		target.trigger( "keyup" );
	}
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate();

	keyup( e );
	errors( 0, "No value, no errors" );
	e.val( "a" );
	keyup( e );
	errors( 0, "Value, but not invalid" );
	e.val( "" );
	v.form();
	errors( 2, "Both invalid" );
	keyup( e );
	errors( 1, "Only one field validated, still invalid" );
	e.val( "hh" );
	keyup( e );
	errors( 0, "Not invalid anymore" );
	e.val( "h" );
	keyup( e );
	errors( 1, "Field didn't loose focus, so validate again, invalid" );
	e.val( "hh" );
	keyup( e );
	errors( 0, "Valid" );
} );

test( "validate on not keyup, only blur", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate( {
			onkeyup: false
		} );

	errors( 0 );
	e.val( "a" );
	e.trigger( "keyup" );
	e.keyup();
	errors( 0 );
	e.trigger( "blur" ).trigger( "focusout" );
	errors( 1 );
} );

test( "validate on keyup and blur", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate();

	errors( 0 );
	e.val( "a" );
	e.trigger( "keyup" );
	errors( 0 );
	e.trigger( "blur" ).trigger( "focusout" );
	errors( 1 );
} );

test( "validate email on keyup and blur", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate();

	v.form();
	errors( 2 );
	e.val( "a" );
	e.trigger( "keyup" );
	errors( 1 );
	e.val( "aa" );
	e.trigger( "keyup" );
	errors( 0 );
} );

test( "don't revalidate the field when pressing special characters", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}

	function triggerEvent( element, keycode ) {
		var event = $.Event( "keyup", { keyCode: keycode } );
		element.trigger( event );
	}

	var e = $( "#firstname" ),
		v = $( "#testForm1" ).validate(),
		excludedKeys = {
			"Shift": 16,
			"Ctrl": 17,
			"Alt": 18,
			"Caps lock": 20,
			"End": 35,
			"Home": 36,
			"Left arrow": 37,
			"Up arrow": 38,
			"Right arrow": 39,
			"Down arrow": 40,
			"Insert": 45,
			"Num lock": 144,
			"Alt GR": 225
		};

	// To make sure there is only one error, that one of #firstname field
	$( "#firstname" ).val( "" );
	$( "#lastname" ).val( "something" );
	$( "#something" ).val( "something" );

	// Validate the form
	v.form();
	errors( 1, "Validate manually" );

	// Check for special keys
	e.val( "aaa" );
	$.each( excludedKeys, function( key, keyCode ) {
		triggerEvent( e, keyCode );
		errors( 1, key + " key" );
	} );

	// Normal keyup
	e.val( "aaaaa" );
	e.trigger( "keyup" );
	errors( 0, "Normal keyup" );
} );

test( "#1508: Validation fails to trigger when next field is already filled out", function() {

	// The next field is already filled out.
	$( "#box2" ).val( "something" );

	var event   = $.Event( "keyup", { keyCode: 9 } ),
		element = $( "#box1" ),
		nextE   = $( "#box2" ),
		validator = $( "#testForm23" ).validate( {
			rules: {
				box1: {
					required: true
				},
				box2: {
					required: true
				}
			}
		} ),
		check = function( value ) {

			// Fill the first element
			element.val( "something" );

			// Tab to the next field
			element.blur();
			nextE.trigger( event );
			nextE.focus();

			// Tab back to element
			nextE.blur();
			element.trigger( event );
			element.focus();

			// Change the content
			element.val( value );
			element.trigger( "keyup" );
		},
		eq = function( expected, msg ) {
			equal( validator.numberOfInvalids(), expected, "There is only one invalid element." );
			equal( validator.invalidElements()[ 0 ], element[ 0 ], msg );
		};

	check( "" );
	eq( 1, "The box1 element should be invalid" );
} );

test( "[Remote rule] #1508: Validation fails to trigger when next field is already filled out", function( assert ) {
	assert.expect( 2 );

	// The next field is already filled out.
	$( "#val3" ).val( "something" );

	var event   = $.Event( "keyup", { keyCode: 9 } ),
		element = $( "#val2" ),
		nextE   = $( "#val3" ),
		done = assert.async(),
		validator = $( "#testForm24" ).validate( {
			rules: {
				val2: {
					remote: {
						url: "issue1508.php"
					}
				},
				val3: {
					required: true
				}
			}
		} ),
		check = function( value ) {

			// Fill the first element
			element.val( "something" );

			// Tab to the next field
			element.blur();
			nextE.trigger( event );
			nextE.focus();

			// Make sure all events will be called before the bellow code
			setTimeout( function() {

				// Tab back to element
				nextE.blur();
				element.trigger( event );
				element.focus();

				// Change the content
				element.val( value );
				element.trigger( "keyup" );

				setTimeout( function() {
					equal( validator.numberOfInvalids(), 1, "There is only one invalid element" );
					equal( validator.invalidElements()[ 0 ], element[ 0 ], "The val2 element should be invalid" );
					done();
				} );
			} );
		};

	check( "abc" );
} );

test( "validate checkbox on click", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	function trigger( element ) {
		element.click();

		// Triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e = $( "#check2" ),
		v = $( "#form" ).validate( {
			rules: {
				check2: "required"
			}
		} );

	trigger( e );
	errors( 0 );
	trigger( e );
	equal( v.form(), false );
	errors( 1 );
	trigger( e );
	errors( 0 );
	trigger( e );
	errors( 1 );
} );

test( "validate multiple checkbox on click", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	function trigger( element ) {
		element.click();

		// Triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $( "#check1" ).attr( "checked", false ),
		e2 = $( "#check1b" ),
		v = $( "#form" ).validate( {
			rules: {
				check: {
					required: true,
					minlength: 2
				}
			}
		} );

	trigger( e1 );
	trigger( e2 );
	errors( 0 );
	trigger( e2 );
	equal( v.form(), false );
	errors( 1 );
	trigger( e2 );
	errors( 0 );
	trigger( e2 );
	errors( 1 );
} );

test( "correct checkbox receives the error", function() {
	function trigger( element ) {
		element.click();

		// Triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $( "#check1" ).attr( "checked", false ),
		v;

	$( "#check1b" ).attr( "checked", false );
	v = $( "#form" ).find( "[type=checkbox]" ).attr( "checked", false ).end().validate( {
		rules: {
			check: {
				required: true,
				minlength: 2
			}
		}
	} );

	equal( v.form(), false );
	trigger( e1 );
	equal( v.form(), false );
	ok( v.errorList[ 0 ].element.id === v.currentElements[ 0 ].id, "the proper checkbox has the error AND is present in currentElements" );
} );

test( "validate radio on click", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	function trigger( element ) {
		element.click();

		// Triggered click event screws up checked-state in 1.4
		element.valid();
	}
	var e1 = $( "#radio1" ),
		e2 = $( "#radio1a" ),
		v = $( "#form" ).validate( {
			rules: {
				radio1: "required"
			}
		} );

	errors( 0 );
	equal( v.form(), false );
	errors( 1 );
	trigger( e2 );
	errors( 0 );
	trigger( e1 );
	errors( 0 );
} );

test( "validate input with no type attribute, defaulting to text", function() {
	function errors( expected, message ) {
		equal( v.size(), expected, message );
	}
	var v = $( "#testForm12" ).validate(),
		e = $( "#testForm12text" );

	errors( 0 );
	e.valid();
	errors( 1 );
	e.val( "test" );
	e.trigger( "keyup" );
	errors( 0 );
} );

module( "ignore hidden" );

test( "ignore hidden elements", function() {
	var form = $( "#userForm" ),
		validate = form.validate( {
			rules: {
				"username": "required"
			}
		} );

	form.get( 0 ).reset();
	ok( !validate.form(), "form should be initially invalid" );
	$( "#userForm [name=username]" ).hide();
	ok( validate.form(), "hidden elements should be ignored by default" );
} );

test( "ignore hidden elements at start", function() {
	var form = $( "#userForm" ),
		validate = form.validate( {
			rules: {
				"username": "required"
			}
		} );

	form.get( 0 ).reset();
	$( "#userForm [name=username]" ).hide();
	ok( validate.form(), "hidden elements should be ignored by default" );
	$( "#userForm [name=username]" ).show();
	ok( !validate.form(), "form should be invalid when required element is visible" );
} );

module( "configuration with attributes " );

test( "Specify error messages through data attributes", function() {
	var form = $( "#dataMessages" ),
		name = $( "#dataMessagesName" ),
		label;

	form.validate();

	form.get( 0 ).reset();
	name.valid();

	label = $( "#dataMessages .error:not(input)" );
	equal( label.text(), "You must enter a value here", "Correct error label" );
} );

test( "Updates pre-existing label if has error class", function() {
	var form = $( "#updateLabel" ),
		input = $( "#updateLabelInput" ),
		label = $( "#targetLabel" ),
		labelsBefore = form.find( ".error:not(input)" ).length,
		labelsAfter;

	form.validate();
	input.val( "" );
	input.valid();
	labelsAfter = form.find( ".error:not(input)" ).length;

	// 'label' was updated
	equal( label.text(), input.attr( "data-msg-required" ) );

	// New label wasn't created
	equal( labelsAfter, labelsBefore );
} );

test( "Min date set by attribute", function() {
	var form = $( "#rangesMinDateInvalid" ),
		name = $( "#minDateInvalid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#rangesMinDateInvalid .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 2012-12-21.", "Correct error label" );
} );

test( "Max date set by attribute", function() {
	var form = $( "#ranges" ),
		name = $( "#maxDateInvalid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value less than or equal to 2012-12-21.", "Correct error label" );
} );

test( "Min and Max date set by attributes greater", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeDateInvalidGreater" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value less than or equal to 2013-01-21.", "Correct error label" );
} );

test( "Min and Max date set by attributes less", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeDateInvalidLess" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 2012-11-21.", "Correct error label" );
} );

test( "Min date set by attribute valid", function() {
	var form = $( "#rangeMinDateValid" ),
		name = $( "#minDateValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#rangeMinDateValid .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Max date set by attribute valid", function() {
	var form = $( "#ranges" ),
		name = $( "#maxDateValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min and Max date set by attributes valid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeDateValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min and Max strings set by attributes greater", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeTextInvalidGreater" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
} );

test( "Min and Max strings set by attributes less", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeTextInvalidLess" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 200.", "Correct error label" );
} );

test( "Step string set by attribute invalid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeTextInvalidStep" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a multiple of 100.", "Correct error label" );
} );

test( "Min, Max and Step strings set by attributes valid", function() {
	var form = $( "#ranges" ),
		range = $( "#rangeTextValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	range.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min, Max and Step set by data-rule valid", function() {
	var form = $( "#ranges" ),
		range = $( "#rangeTextDataRuleValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	range.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Step attribute on element with unsupported input type", function() {
	var form = $( "#stepOnUnsupportedType" ),
		input = $( "#stepOnUnsupportedTypeInput" );

	throws(
		function() {
			form.validate();
			form.get( 0 ).reset();
			input.valid();
		},
		function( err ) {
			return err.message === "Step attribute on input type date is not supported.";
		},
		"Must throw an expected error to pass."
	);
} );

test( "calling blur on ignored element", function() {
	var form = $( "#ignoredElements" );

	form.validate( {
		ignore: ".ignore",
		submitHandler: $.noop,
		invalidHandler: function() {
			$( "#ss1" ).blur();
		}
	} );

	form.trigger( "submit" );
	equal( form.valid(), false, "valid() should return false" );
} );

test( "Min and Max type absent set by attributes greater", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeAbsentInvalidGreater" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
} );

test( "Min and Max type absent set by attributes less", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeAbsentInvalidLess" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 200.", "Correct error label" );
} );

test( "Step type absent set by attribute invalid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeAbsentInvalidStep" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a multiple of 100.", "Correct error label" );
} );

test( "Min, Max and Step type absent set by attributes valid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeAbsentValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min, Max and Step range set by attributes valid", function() {

	//
	// Cannot test for overflow:
	// When the element is suffering from an underflow,
	// the user agent must set the element"s value to a valid
	// floating-point number that represents the minimum.
	// http://www.w3.org/TR/html5/forms.html#range-state-%28type=range%29
	//
	var form = $( "#ranges" ),
		name = $( "#rangeRangeValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min and Max number set by attributes valid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeNumberValid" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Min and Max number set by attributes greater", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeNumberInvalidGreater" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
} );

test( "Min and Max number set by attributes less", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeNumberInvalidLess" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 50.", "Correct error label" );
} );

test( "Rules allowed to have a value of zero invalid", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeMinZeroInvalidLess" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "Please enter a value greater than or equal to 0.", "Correct error label" );
} );

test( "Rules allowed to have a value of zero valid equal", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeMinZeroValidEqual" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Rules allowed to have a value of zero valid greater", function() {
	var form = $( "#ranges" ),
		name = $( "#rangeMinZeroValidGreater" ),
		label;

	form.validate();
	form.get( 0 ).reset();
	name.valid();

	label = $( "#ranges .error:not(input)" );
	equal( label.text(), "", "Correct error label" );
} );

test( "Validation triggered on radio and checkbox via click", function() {
	expect( 2 );

	var form = $( "#radiocheckbox" );

	// Init validate
	form.validate();

	// Validate so we have errors
	ok( !form.valid(), "Form invalid" );

	// Simulate native click on first checkbox to trigger change-event
	$( "#radiocheckbox-0-1" ).simulate( "click" );

	// Simulate native click on first radio to trigger change-event
	$( "#radiocheckbox-1-1" ).simulate( "click" );

	// Test if there is no error anymore
	ok( form.find( "input.error" ).length === 0, "Form valid" );
} );

test( "destroy()", function() {
	expect( 6 );

	var form = $( "#testForm5" ),
		validate = form.validate();

	strictEqual( form.data( "validator" ), validate );

	form.valid();
	equal( $( "#x1", form ).hasClass( "validate-equalTo-blur" ), true, "The blur event should be bound to this element" );
	equal( $( "#x2", form ).hasClass( "validate-equalTo-blur" ), true, "The blur event should be bound to this element" );

	validate.destroy();
	strictEqual( form.data( "validator" ), undefined );
	equal( $( "#x1", form ).hasClass( "validate-equalTo-blur" ), false, "The blur event should be unbound from this element" );
	equal( $( "#x2", form ).hasClass( "validate-equalTo-blur" ), false, "The blur event should be unbound from this element" );
} );

test( "#1618: Errorlist containing more errors than it should", function() {
	var v = $( "#testForm24" ).validate( {
			rules: {
				val1: {
					required: true
				},
				val2: {
					required: true
				},
				val3: {
					required: true
				}
			}
		} ),
		inputList = $( "#val1, #val2, #val3" );

	inputList.valid();
	equal( v.errorList.length, 2, "There is only two errors" );

	inputList.valid();
	equal( v.errorList.length, 2, "There should be no change in errorList's content" );
} );

asyncTest( "addMethod, reusing remote in custom method", function() {
	expect( 7 );
	$.validator.addMethod( "workemail", function( value, element, param ) {
		return $.validator.methods.remote.call( this, value, element, {
			url: "workemail.php",
			data: { email: value, special: param }
		}, "workemail" );
	}, "work email custom message" );

	var e = $( "#add-method-username" ),
		v = $( "#add-method-remote" ).validate();

	$( document ).ajaxStop( function() {
		$( document ).unbind( "ajaxStop" );
		strictEqual( v.size(), 1, "There must be one error" );
		strictEqual( v.errorList[ 0 ].message, "work email custom message", "john.doe@gmail.com is not work email" );

		$( document ).ajaxStop( function() {
			$( document ).unbind( "ajaxStop" );
			strictEqual( v.size(), 0, "There must be no errors" );
			ok( v.element( e ), "john.doe@company.com is work email ;)" );
			start();
		} );
		e.val( "john.doe@company.com" );
		strictEqual( v.element( e ), true, "new value, new request; dependency-mismatch considered as valid though" );
	} );
	strictEqual( v.element( e ), false, "invalid element, nothing entered yet" );
	e.val( "john.doe@gmail.com" );
	strictEqual( v.element( e ), true, "still invalid, because remote validation must block until it returns; dependency-mismatch considered as valid though" );
} );

