QUnit.module( "placement" );

QUnit.test( "elements() order", function( assert ) {
	var container = $( "#orderContainer" ),
		v = $( "#elementsOrder" ).validate( {
			errorLabelContainer: container,
			wrap: "li"
		} );

	assert.deepEqual(
		v.elements().map( function() {
			return $( this ).attr( "id" );
		} ).get(),
		[
			"order1",
			"order2",
			"order3",
			"order4",
			"order5",
			"order6"
		],
		"elements must be in document order"
	);

	v.form();
	assert.deepEqual(
		container.children().map( function() {
			return $( this ).attr( "id" );
		} ).get(),
		[
			"order1-error",
			"order2-error",
			"order3-error",
			"order4-error",
			"order5-error",
			"order6-error"
		],
		"labels in error container must be in document order"
	);
} );

QUnit.test( "error containers, simple", function( assert ) {
	assert.expect( 14 );
	var container = $( "#simplecontainer" ),
		v = $( "#form" ).validate( {
			errorLabelContainer: container,
			showErrors: function() {
				container.find( "h3" ).html( jQuery.validator.format( "There are {0} errors in your form.", this.size() ) );
				this.defaultShowErrors();
			}
		} );

	v.prepareForm();
	assert.ok( v.valid(), "form is valid" );
	assert.equal( container.find( ".error:not(input)" ).length, 0, "There should be no error labels" );
	assert.equal( container.find( "h3" ).html(), "" );

	v.prepareForm();
	v.errorList = [
		{
			message: "bar",
			element: {
				name: "foo"
			}
		},
		{
			message: "necessary",
			element: {
				name: "required"
			}
		}
	];

	assert.ok( !v.valid(), "form is not valid after adding errors manually" );
	v.showErrors();
	assert.equal( container.find( ".error:not(input)" ).length, 2, "There should be two error labels" );
	assert.ok( container.is( ":visible" ), "Check that the container is visible" );
	container.find( ".error:not(input)" ).each( function() {
		assert.ok( $( this ).is( ":visible" ), "Check that each label is visible" );
	} );
	assert.equal( container.find( "h3" ).html(), "There are 2 errors in your form." );

	v.prepareForm();
	assert.ok( v.valid(), "form is valid after a reset" );
	v.showErrors();
	assert.equal( container.find( ".error:not(input)" ).length, 2, "There should still be two error labels" );
	assert.ok( container.is( ":hidden" ), "Check that the container is hidden" );
	container.find( ".error:not(input)" ).each( function() {
		assert.ok( $( this ).is( ":hidden" ), "Check that each label is hidden" );
	} );
} );

QUnit.test( "error containers, with labelcontainer I", function( assert ) {
	assert.expect( 16 );
	var container = $( "#container" ),
		labelcontainer = $( "#labelcontainer" ),
		v = $( "#form" ).validate( {
			errorContainer: container,
			errorLabelContainer: labelcontainer,
			wrapper: "li"
		} );

	assert.ok( v.valid(), "form is valid" );
	assert.equal( container.find( ".error:not(input)" ).length, 0, "There should be no error labels in the container" );
	assert.equal( labelcontainer.find( ".error:not(input)" ).length, 0, "There should be no error labels in the labelcontainer" );
	assert.equal( labelcontainer.find( "li" ).length, 0, "There should be no lis labels in the labelcontainer" );

	v.errorList = [
		{
			message: "bar",
			element: {
				name: "foo"
			}
		},
		{
			name: "required",
			message: "necessary",
			element: {
				name: "required"
			}
		}
	];

	assert.ok( !v.valid(), "form is not valid after adding errors manually" );
	v.showErrors();
	assert.equal( container.find( ".error:not(input)" ).length, 0, "There should be no error label in the container" );
	assert.equal( labelcontainer.find( ".error:not(input)" ).length, 2, "There should be two error labels in the labelcontainer" );
	assert.equal( labelcontainer.find( "li" ).length, 2, "There should be two error lis in the labelcontainer" );
	assert.ok( container.is( ":visible" ), "Check that the container is visible" );
	assert.ok( labelcontainer.is( ":visible" ), "Check that the labelcontainer is visible" );
	labelcontainer.find( ".error:not(input)" ).each( function() {
		assert.ok( $( this ).is( ":visible" ), "Check that each label is visible1" );
		assert.equal( $( this ).parent()[ 0 ].tagName.toLowerCase(), "li", "Check that each label is wrapped in an li" );
		assert.ok( $( this ).parent( "li" ).is( ":visible" ), "Check that each parent li is visible" );
	} );
} );

QUnit.test( "errorcontainer, show/hide only on submit", function( assert ) {
	assert.expect( 14 );
	var container = $( "#container" ),
		labelContainer = $( "#labelcontainer" ),
		v = $( "#testForm1" ).bind( "invalid-form.validate", function() {
			assert.ok( true, "invalid-form event triggered called" );
		} ).validate( {
			errorContainer: container,
			errorLabelContainer: labelContainer,
			showErrors: function() {
				container.html( jQuery.validator.format( "There are {0} errors in your form.", this.numberOfInvalids() ) );
				assert.ok( true, "showErrors called" );
				this.defaultShowErrors();
			}
		} );

	assert.equal( container.html(), "", "must be empty" );
	assert.equal( labelContainer.html(), "", "must be empty" );

	// Validate whole form, both showErrors and invalidHandler must be called once
	// preferably invalidHandler first, showErrors second
	assert.ok( !v.form(), "invalid form" );
	assert.equal( labelContainer.find( ".error:not(input)" ).length, 2 );
	assert.equal( container.html(), "There are 2 errors in your form." );
	assert.ok( labelContainer.is( ":visible" ), "must be visible" );
	assert.ok( container.is( ":visible" ), "must be visible" );

	$( "#firstname" ).val( "hix" ).keyup();
	$( "#testForm1" ).triggerHandler( "keyup", [
			jQuery.event.fix( {
				type: "keyup",
				target: $( "#firstname" )[ 0 ]
			} )
		] );
	assert.equal( labelContainer.find( ".error:visible" ).length, 1 );
	assert.equal( container.html(), "There are 1 errors in your form." );

	$( "#lastname" ).val( "abc" );
	assert.ok( v.form(), "Form now valid, trigger showErrors but not invalid-form" );
} );

QUnit.test( "test label used as error container", function( assert ) {
	assert.expect( 8 );
	var form = $( "#testForm16" ),
		field = $( "#testForm16text" );

	form.validate( {
		errorPlacement: function( error, element ) {

			// Append error within linked label
			$( "label[for='" + element.attr( "id" ) + "']" ).append( error );
		},
		errorElement: "span"
	} );

	assert.ok( !field.valid() );
	assert.equal( field.next( "label" ).contents().first().text(), "Field Label", "container label isn't disrupted" );
	assert.hasError( field, "missing" );
	assert.ok( !field.attr( "aria-describedby" ), "field does not require aria-describedby attribute" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.equal( field.next( "label" ).contents().first().text(), "Field Label", "container label isn't disrupted" );
	assert.ok( !field.attr( "aria-describedby" ), "field does not require aria-describedby attribute" );
	assert.noErrorFor( field );
} );

QUnit.test( "test error placed adjacent to descriptive label", function( assert ) {
	assert.expect( 8 );
	var form = $( "#testForm16" ),
		field = $( "#testForm16text" );

	form.validate( {
		errorElement: "span"
	} );

	assert.ok( !field.valid() );
	assert.equal( form.find( "label" ).length, 1 );
	assert.equal( form.find( "label" ).text(), "Field Label", "container label isn't disrupted" );
	assert.hasError( field, "missing" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.equal( form.find( "label" ).length, 1 );
	assert.equal( form.find( "label" ).text(), "Field Label", "container label isn't disrupted" );
	assert.noErrorFor( field );
} );

QUnit.test( "test descriptive label used alongside error label", function( assert ) {
	assert.expect( 8 );
	var form = $( "#testForm16" ),
		field = $( "#testForm16text" );

	form.validate( {
		errorElement: "label"
	} );

	assert.ok( !field.valid() );
	assert.equal( form.find( "label.title" ).length, 1 );
	assert.equal( form.find( "label.title" ).text(), "Field Label", "container label isn't disrupted" );
	assert.hasError( field, "missing" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.equal( form.find( "label.title" ).length, 1 );
	assert.equal( form.find( "label.title" ).text(), "Field Label", "container label isn't disrupted" );
	assert.noErrorFor( field );
} );

QUnit.test( "test custom errorElement", function( assert ) {
	assert.expect( 4 );
	var form = $( "#userForm" ),
		field = $( "#username" );

	form.validate( {
		messages: {
			username: "missing"
		},
		errorElement: "label"
	} );

	assert.ok( !field.valid() );
	assert.hasError( field, "missing", "Field should have error 'missing'" );
	field.val( "foo" );
	assert.ok( field.valid() );
	assert.noErrorFor( field, "Field should not have a visible error" );
} );

QUnit.test( "test existing label used as error element", function( assert ) {
	assert.expect( 4 );
	var form = $( "#testForm14" ),
		field = $( "#testForm14text" );

	form.validate( { errorElement: "label" } );

	assert.ok( !field.valid() );
	assert.hasError( field, "required" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.noErrorFor( field );
} );

QUnit.test( "test existing non-label used as error element", function( assert ) {
	assert.expect( 4 );
	var form = $( "#testForm15" ),
		field = $( "#testForm15text" );

	form.validate( { errorElement: "span" } );

	assert.ok( !field.valid() );
	assert.hasError( field, "required" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.noErrorFor( field );
} );

QUnit.test( "test aria-describedby with input names contains CSS-selector meta-characters", function( assert ) {
	var form = $( "#testForm21" ),
		field = $( "#testForm21\\!\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\`\\{\\|\\}\\~" );

	assert.equal( field.attr( "aria-describedby" ), undefined );

	form.validate( {
		errorElement: "span",
		errorPlacement: function() {

			// Do something
		}
	} );

	// Validate the element
	assert.ok( !field.valid() );
	assert.equal( field.attr( "aria-describedby" ), "testForm21!#$%&'()*+,./:;<=>?@[\\]^`{|}~-error" );

	// Re-run validation
	field.val( "some" );
	field.trigger( "keyup" );

	field.val( "something" );
	field.trigger( "keyup" );

	assert.equal( field.attr( "aria-describedby" ), "testForm21!#$%&'()*+,./:;<=>?@[\\]^`{|}~-error", "`aria-describedby` should remain the same as before." );

	// Re-run validation
	field.val( "something something" );
	field.trigger( "keyup" );

	assert.ok( field.valid() );
	assert.equal( field.attr( "aria-describedby" ), "testForm21!#$%&'()*+,./:;<=>?@[\\]^`{|}~-error", "`aria-describedby` should remain the same as before." );
} );

QUnit.test( "test existing non-error aria-describedby", function( assert ) {
	assert.expect( 8 );
	var form = $( "#testForm17" ),
		field = $( "#testForm17text" );

	assert.equal( field.attr( "aria-describedby" ), "testForm17text-description" );
	form.validate( { errorElement: "span" } );

	assert.ok( !field.valid() );
	assert.equal( field.attr( "aria-describedby" ), "testForm17text-description testForm17text-error" );
	assert.hasError( field, "required" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.noErrorFor( field );

	assert.strictEqual( $( "#testForm17text-description" ).text(), "This is where you enter your data" );
	assert.strictEqual( $( "#testForm17text-error" ).text(), "", "Error label is empty for valid field" );
} );

QUnit.test( "test pre-assigned non-error aria-describedby", function( assert ) {
	assert.expect( 7 );
	var form = $( "#testForm17" ),
		field = $( "#testForm17text" );

	// Pre-assign error identifier
	field.attr( "aria-describedby", "testForm17text-description testForm17text-error" );
	form.validate( { errorElement: "span" } );

	assert.ok( !field.valid() );
	assert.equal( field.attr( "aria-describedby" ), "testForm17text-description testForm17text-error" );
	assert.hasError( field, "required" );

	field.val( "foo" );
	assert.ok( field.valid() );
	assert.noErrorFor( field );

	assert.strictEqual( $( "#testForm17text-description" ).text(), "This is where you enter your data" );
	assert.strictEqual( $( "#testForm17text-error" ).text(), "", "Error label is empty for valid field" );
} );

QUnit.test( "test id/name containing brackets", function( assert ) {
	var form = $( "#testForm18" ),
		field = $( "#testForm18\\[text\\]" );

	form.validate( {
		errorElement: "span"
	} );

	form.valid();
	field.valid();
	assert.hasError( field, "required" );
} );

QUnit.test( "test id/name containing $", function( assert ) {
	var form = $( "#testForm19" ),
		field = $( "#testForm19\\$text" );

	form.validate( {
		errorElement: "span"
	} );

	field.valid();
	assert.hasError( field, "required" );
} );

QUnit.test( "test id/name containing single quotes", function( assert ) {
	var v = $( "#testForm20" ).validate(),
		textElement = $( "#testForm20\\[\\'textinput\\'\\]" ),
		checkboxElement = $( "#testForm20\\[\\'checkboxinput\\'\\]" ),
		radioElement = $( "#testForm20\\[\\'radioinput\\'\\]" );

	v.form();

	assert.equal( v.numberOfInvalids(), 3, "There is three invalid elements" );
	assert.equal( v.invalidElements()[ 0 ], textElement[ 0 ], "The element should be invalid" );
	assert.equal( v.invalidElements()[ 1 ], checkboxElement[ 0 ], "The text element should be invalid" );
	assert.equal( v.invalidElements()[ 2 ], radioElement[ 0 ], "The text element should be invalid" );
} );

QUnit.test( "#1632: Error hidden, but input error class not removed", function( assert ) {
	var v = $( "#testForm23" ).validate( {
			rules: {
				box1: {
					required: {
						depends: function() {
							return !!$( "#box2" ).val();
						}
					}
				},
				box2: {
					required: {
						depends: function() {
							return !!$( "#box1" ).val();
						}
					}
				}
			}
		} ),
		box1 = $( "#box1" ),
		box2 = $( "#box2" );

	box1.val( "something" );
	v.form();
	assert.equal( v.numberOfInvalids(), 1, "There is only one invlid element" );
	assert.equal( v.invalidElements()[ 0 ], box2[ 0 ], "The box2 element should be invalid" );

	box1.val( "" );
	v.form();
	assert.equal( v.numberOfInvalids(), 0, "There is no error" );
	assert.equal( box2.hasClass( "error" ), false, "Box2 should not have an error class" );
} );
