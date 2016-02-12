module( "rules" );

test( "rules() - internal - input", function() {
	var element = $( "#firstname" );

	$( "#testForm1" ).validate();

	deepEqual( element.rules(), { required: true, minlength: 2 } );
} );

test( "rules(), ignore method:false", function() {
	var element = $( "#firstnamec" );

	$( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: { required: false, minlength: 2 }
		}
	} );

	deepEqual( element.rules(), { minlength: 2 } );
} );

test( "rules() HTML5 required (no value)", function() {
	var element = $( "#testForm11text1" );

	$( "#testForm11" ).validate();

	deepEqual( element.rules(), { required: true } );
} );

test( "rules() - internal - select", function() {
	var element = $( "#meal" );

	$( "#testForm3" ).validate();

	deepEqual( element.rules(), { required: true } );
} );

test( "rules() - external", function() {
	var element = $( "#text1" );

	$( "#form" ).validate( {
		rules: {
			action: { date: true, min: 5 }
		}
	} );

	deepEqual( element.rules(), { date: true, min: 5 } );
} );

test( "rules() - external - complete form", function() {
	expect( 1 );

	var methods = $.extend( {}, $.validator.methods ),
		messages = $.extend( {}, $.validator.messages ),
		v;

	$.validator.addMethod( "verifyTest", function() {
		ok( true, "method executed" );
		return true;
	} );
	v = $( "#form" ).validate( {
		rules: {
			action: { verifyTest: true }
		}
	} );
	v.form();

	$.validator.methods = methods;
	$.validator.messages = messages;
} );

test( "rules() - internal - input", function() {
	var element = $( "#form8input" );

	$( "#testForm8" ).validate();

	deepEqual( element.rules(), { required: true, number: true, rangelength: [ 2, 8 ] } );
} );

test( "rules(), merge min/max to range, minlength/maxlength to rangelength", function() {
	jQuery.validator.autoCreateRanges = true;

	$( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: {
				min: -15,
				max: 0
			},
			lastname: {
				minlength: 0,
				maxlength: 10
			}
		}
	} );

	deepEqual( $( "#firstnamec" ).rules(), { range: [ -15, 0 ] } );
	deepEqual( $( "#lastnamec" ).rules(), { rangelength: [ 0, 10 ] } );

	jQuery.validator.autoCreateRanges = false;
} );

test( "rules(), guarantee that required is at front", function() {
	$( "#testForm1" ).validate();
	var v = $( "#v2" ).validate();
	$( "#subformRequired" ).validate();
	function flatRules( element ) {
		var result = [];
		jQuery.each( $( element ).rules(), function( key ) { result.push( key ); } );
		return result.join( " " );
	}
	equal( flatRules( "#firstname" ), "required minlength" );
	equal( flatRules( "#v2-i6" ), "required minlength maxlength" );
	equal( flatRules( "#co_name" ), "required maxlength" );

	QUnit.reset();
	jQuery.validator.autoCreateRanges = true;
	v = $( "#v2" ).validate();
	equal( flatRules( "#v2-i6" ), "required rangelength" );

	$( "#subformRequired" ).validate( {
		rules: {
			co_name: "required"
		}
	} );
	$( "#co_name" ).removeClass();
	equal( flatRules( "#co_name" ), "required maxlength" );
	jQuery.validator.autoCreateRanges = false;
} );

test( "rules(), evaluate dynamic parameters", function() {
	expect( 2 );

	$( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: {
				min: function( element ) {
					equal( $( "#firstnamec" )[ 0 ], element );
					return 12;
				}
			}
		}
	} );

	deepEqual( $( "#firstnamec" ).rules(), { min: 12 } );
} );

test( "rules(), class and attribute combinations", function() {

	$.validator.addMethod( "customMethod1", function() {
		return false;
	}, "" );
	$.validator.addMethod( "customMethod2", function() {
		return false;
	}, "" );

	$( "#v2" ).validate( {
		rules: {
			"v2-i7": {
				required: true,
				minlength: 2,
				customMethod: true
			}
		}
	} );

	deepEqual( $( "#v2-i1" ).rules(), { required: true } );
	deepEqual( $( "#v2-i2" ).rules(), { required: true, email: true } );
	deepEqual( $( "#v2-i3" ).rules(), { url: true } );
	deepEqual( $( "#v2-i4" ).rules(), { required: true, minlength: 2 } );
	deepEqual( $( "#v2-i5" ).rules(), { required: true, minlength: 2, maxlength: 5, customMethod1: "123" } );
	jQuery.validator.autoCreateRanges = true;
	deepEqual( $( "#v2-i5" ).rules(), { required: true, customMethod1: "123", rangelength: [ 2, 5 ] } );
	deepEqual( $( "#v2-i6" ).rules(), { required: true, customMethod2: true, rangelength: [ 2, 5 ] } );
	jQuery.validator.autoCreateRanges = false;
	deepEqual( $( "#v2-i7" ).rules(), { required: true, minlength: 2, customMethod: true } );

	delete $.validator.methods.customMethod1;
	delete $.validator.messages.customMethod1;
	delete $.validator.methods.customMethod2;
	delete $.validator.messages.customMethod2;
} );

test( "rules(), dependency checks", function() {
	var v = $( "#testForm1clean" ).validate( {
			rules: {
				firstnamec: {
					min: {
						param: 5,
						depends: function( el ) {
							return ( /^a/ ).test( $( el ).val() );
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
		} ),
		rules = $( "#firstnamec" ).rules();

	equal( v.objectLength( rules ), 0 );

	$( "#firstnamec" ).val( "ab" );
	deepEqual( $( "#firstnamec" ).rules(), { min: 5 } );

	deepEqual( $( "#lastnamec" ).rules(), { max: 12, email: true } );
} );

test( "rules(), add and remove", function() {
	$.validator.addMethod( "customMethod1", function() {
		return false;
	}, "" );
	$( "#v2" ).validate();
	$( "#v2-i5" ).removeClass( "required" ).removeAttr( "minlength maxlength" );
	deepEqual( $( "#v2-i5" ).rules(), { customMethod1: "123" } );

	$( "#v2-i5" ).addClass( "required" ).attr( {
		minlength: 2,
		maxlength: 5
	} );
	deepEqual( $( "#v2-i5" ).rules(), { required: true, minlength: 2, maxlength: 5, customMethod1: "123" } );

	$( "#v2-i5" ).addClass( "email" ).attr( { min: 5 } );
	deepEqual( $( "#v2-i5" ).rules(), { required: true, email: true, minlength: 2, maxlength: 5, min: 5, customMethod1: "123" } );

	$( "#v2-i5" ).removeClass( "required email" ).removeAttr( "minlength maxlength customMethod1 min" );
	deepEqual( $( "#v2-i5" ).rules(), {} );

	delete $.validator.methods.customMethod1;
	delete $.validator.messages.customMethod1;
} );

test( "rules(), add and remove static rules", function() {

	$( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: "required date"
		}
	} );

	deepEqual( $( "#firstnamec" ).rules(), { required: true, date: true } );

	$( "#firstnamec" ).rules( "remove", "date" );
	deepEqual( $( "#firstnamec" ).rules(), { required: true } );
	$( "#firstnamec" ).rules( "add", "email" );
	deepEqual( $( "#firstnamec" ).rules(), { required: true, email: true } );

	$( "#firstnamec" ).rules( "remove", "required" );
	deepEqual( $( "#firstnamec" ).rules(), { email: true } );

	deepEqual( $( "#firstnamec" ).rules( "remove" ), { email: true } );
	deepEqual( $( "#firstnamec" ).rules(), {} );

	$( "#firstnamec" ).rules( "add", "required email" );
	deepEqual( $( "#firstnamec" ).rules(), { required: true, email: true } );

	deepEqual( $( "#lastnamec" ).rules(), {} );
	$( "#lastnamec" ).rules( "add", "required" );
	$( "#lastnamec" ).rules( "add", {
		minlength: 2
	} );
	deepEqual( $( "#lastnamec" ).rules(), { required: true, minlength: 2 } );

	var removedRules = $( "#lastnamec" ).rules( "remove", "required email" );
	deepEqual( $( "#lastnamec" ).rules(), { minlength: 2 } );
	$( "#lastnamec" ).rules( "add", removedRules );
	deepEqual( $( "#lastnamec" ).rules(), { required: true, minlength: 2 } );
} );

test( "rules(), add messages", function() {
	$( "#firstnamec" ).attr( "title", null );
	var v = $( "#testForm1clean" ).validate( {
		rules: {
			firstnamec: "required"
		}
	} );
	$( "#testForm1clean" ).valid();
	$( "#firstnamec" ).valid();
	deepEqual( v.settings.messages.firstname, undefined );

	$( "#firstnamec" ).rules( "add", {
		messages: {
			required: "required"
		}
	} );

	$( "#firstnamec" ).valid();
	deepEqual( v.errorList[ 0 ] && v.errorList[ 0 ].message, "required" );

	$( "#firstnamec" ).val( "test" );
	$( "#firstnamec" ).valid();
	equal( v.errorList.length, 0 );
} );

test( "rules(), rangelength attribute as array", function() {
	$( "#testForm13" ).validate();
	deepEqual( $( "#cars-select" ).rules(), {
		required: true,
		rangelength: [ 2, 3 ]
	} );
} );

test( "rules(), normalizer", function() {
	var username = $( "#usernamec" ),
		urlc = $( "#urlc" ),
		lastname = $( "#lastnamec" ),
		v;

	username.val( "\t\t \r" );
	urlc.val( "" );

	v = $( "#testForm1clean" ).validate( {
		rules: {
			username: {
				required: true,

				// Using the normalizer to trim the value of the element
				// before validating it.
				normalizer: function( value ) {
					equal( this, username[ 0 ], "`this` in the normalizer should be the username element." );

					// Trim the value of the input
					return $.trim( value );
				}
			},
			urlc: {
				required: true,
				url: true,

				// Using the normalizer to append https:// if it's not
				// present on the input value
				normalizer: function( value ) {
					equal( this, urlc[ 0 ], "`this` in the normalizer should be the urlc element." );

					var url = value;

					// Check if it doesn't start with http:// or https:// or ftp://
					if ( url && url.substr( 0, 7 ) !== "http://" &&
						url.substr( 0, 8 ) !== "https://" &&
						url.substr( 0, 6 ) !== "ftp://" ) {

						// Then prefix with http:// or even https://
						url = "https://" + url;
					}

					// Return the new url
					return url;
				}
			},
			lastname: {
				required: true,

				// Using the normalizer to trim the value of the element
				// before validating it.
				normalizer: function( value ) {
					equal( this, lastname[ 0 ], "`this` in the normalizer should be the lastname element." );

					// Return null in order to make sure a exception is thrown
					// when normalizer returns a non string value.
					value = null;

					return value;
				}
			}
		}
	} );

	// Validate only the username and the url elements.
	username.valid();
	equal( v.invalidElements()[ 0 ], username[ 0 ], "The username should be invalid" );

	urlc.valid();
	equal( v.invalidElements()[ 0 ], urlc[ 0 ], "The url should be invalid" );

	equal( v.numberOfInvalids(), 2, "There is two invalid elements" );

	username.val( "something" );
	urlc.val( "google.com" );

	username.trigger( "keyup" );
	urlc.trigger( "keyup" );

	equal( v.numberOfInvalids(), 0, "All elements are valid" );
	equal( v.size(), 0, "All elements are valid" );

	// Validate the lastname element, which will throw an exception
	throws( function() {
		v.check( lastname[ 0 ] );
	}, function( err ) {
		return err.name === "TypeError" && err.message === "The normalizer should return a string value.";
	}, "This should throw a TypeError exception." );
} );

test( "rules() - on empty jquery set #1706", function() {
	var element = $( "#firstname .mynonexistantclass" );

	var result = element.rules( "add", "whatever" );
	strictEqual( result, undefined, "can work on an empty set without a js error" );
} );
