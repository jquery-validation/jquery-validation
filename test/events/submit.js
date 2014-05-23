module( "submit" );

test( "bypassing validation on form submission",function () {
	var form = $( "#bypassValidation" ),
		normalSubmission = $( "form#bypassValidation :input[id=normalSubmit]" ),
		bypassSubmitWithCancel = $( "form#bypassValidation :input[id=bypassSubmitWithCancel]" ),
		bypassSubmitWithNoValidate1 = $( "form#bypassValidation :input[id=bypassSubmitWithNoValidate1]" ),
		bypassSubmitWithNoValidate2 = $( "form#bypassValidation :input[id=bypassSubmitWithNoValidate2]" ),
		$v = form.validate({
			debug : true
		});

	bypassSubmitWithCancel.click();
	equal($v.numberOfInvalids(), 0, "Validation was bypassed using CSS 'cancel' class." );
	$v.resetForm();

	bypassSubmitWithNoValidate1.click();
	equal($v.numberOfInvalids(), 0, "Validation was bypassed using blank 'formnovalidate' attribute." );
	$v.resetForm();

	bypassSubmitWithNoValidate2.click();
	equal($v.numberOfInvalids(), 0, "Validation was bypassed using 'formnovalidate=\"formnovalidate\"' attribute." );
	$v.resetForm();

	normalSubmission.click();
	equal($v.numberOfInvalids(), 1, "Validation failed correctly" );
});

asyncTest( "ajaxSubmit", function() {
	expect( 1 );
	$( "#user" ).val( "Peter" );
	$( "#password" ).val( "foobar" );
	jQuery( "#signupForm" ).validate({
		submitHandler: function( form ) {
			jQuery( form ).ajaxSubmit({
				success: function( response ) {
					equal( "Hi Peter, welcome back.", response );
					start();
				}
			});
		}
	});
	jQuery( "#signupForm" ).triggerHandler( "submit" );
});
