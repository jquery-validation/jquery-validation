QUnit.module( "messages" );

QUnit.test( "predefined message not overwritten by addMethod( a, b, undefined )", function( assert ) {
	var message = "my custom message";
	$.validator.messages.custom = message;
	$.validator.addMethod( "custom", function() {} );
	assert.deepEqual( $.validator.messages.custom, message );
	delete $.validator.messages.custom;
	delete $.validator.methods.custom;
} );

QUnit.test( "group error messages", function( assert ) {
	$.validator.addClassRules( {
		requiredDateRange: { required: true, date: true, dateRange: true }
	} );

	$.validator.addMethod( "dateRange", function() {
		return new Date( $( "#fromDate" ).val() ) < new Date( $( "#toDate" ).val() );
	}, "Please specify a correct date range." );

	var form = $( "#dateRangeForm" );
	form.validate( {
		errorElement: "span",
		groups: {
			dateRange: "fromDate toDate"
		},
		errorPlacement: function( error ) {
			form.find( ".errorContainer" ).append( error );
		}
	} );

	assert.ok( !form.valid() );
	assert.equal( form.find( ".errorContainer *" ).length, 1 );
	assert.equal( form.find( ".errorContainer .error:not(input)" ).text(), "Please enter a valid date." );

	$( "#fromDate" ).val( "12/03/2006" );
	$( "#toDate" ).val( "12/01/2006" );
	assert.ok( !form.valid() );
	assert.equal( form.find( ".errorContainer .error:not(input)" ).text(), "Please specify a correct date range." );

	$( "#toDate" ).val( "12/04/2006" );
	assert.ok( form.valid() );
	assert.ok( form.find( ".errorContainer .error:not(input)" ).is( ":hidden" ) );
} );
QUnit.test( "error messages set for group ", function( assert ) {
	var email = $( "#groupMessagesEmail" ),
		form = $( "#groupMessages" ),
		emailRequiredMessage = "Required message for the email field that overrides the message for the group.",
		groupRequiredMessage = "Required message for the contactInfo group.";

	$( "#groupMessages" ).validate( {
		rules: {
			groupMessagesMiddle: {
				required: false
			},
			groupMessagesEmail: {
				email: true
			}
		},
		messages: {
			groupMessagesEmail: {
				required: emailRequiredMessage
			}
		},
		groups: {
			contactInfo: {
				fields: "groupMessagesFirst groupMessagesMiddle groupMessagesLast groupMessagesEmail",
				rules: {
					required: true,
					minlength: 2
				},
				messages: {
					required: groupRequiredMessage,
					minlength: jQuery.validator.format( "Minimum length is {0}", 2 )

				}
			}

		},
		errorPlacement: function( error, element ) {
			if ( element.closest( ".group" ).length ) {
				error.appendTo( element.closest( ".group" ) );
			} else {
				error.insertAfter( element );
			}
		}
	} );

	assert.ok( !form.valid() );
	assert.equal( form.find( "#contactInfo-error" ).length, 1 );
	assert.equal( form.find( "#contactInfo-error" ).text(), emailRequiredMessage );
	email.val( "test@sfhsuidfhiusdfs.test" );
	email.trigger( "blur" );
	assert.equal( form.find( "#contactInfo-error" ).text(), groupRequiredMessage );

} );
QUnit.test( "read messages from metadata", function( assert ) {
	var form = $( "#testForm9" ),
		e, g;

	form.validate();
	e = $( "#testEmail9" );
	e.valid();
	assert.equal( form.find( "#testEmail9" ).next( ".error:not(input)" ).text(), "required" );
	e.val( "bla" ).valid();
	assert.equal( form.find( "#testEmail9" ).next( ".error:not(input)" ).text(), "email" );

	g = $( "#testGeneric9" );
	g.valid();
	assert.equal( form.find( "#testGeneric9" ).next( ".error:not(input)" ).text(), "generic" );
	g.val( "bla" ).valid();
	assert.equal( form.find( "#testGeneric9" ).next( ".error:not(input)" ).text(), "email" );
} );

QUnit.test( "read messages from metadata, with meta option specified, but no metadata in there", function( assert ) {
	var form = $( "#testForm1clean" );
	form.validate( {
		meta: "validate",
		rules: {
			firstnamec: "required"
		}
	} );
	assert.ok( !form.valid(), "not valid" );
} );
