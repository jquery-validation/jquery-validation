QUnit.module( "aria" );

QUnit.test( "Invalid field adds aria-invalid=true", function( assert ) {
	var ariaInvalidFirstName = $( "#ariaInvalidFirstName" ),
		form = $( "#ariaInvalid" );

	form.validate( {
		rules: {
			ariaInvalidFirstName: "required"
		}
	} );
	ariaInvalidFirstName.val( "" );
	ariaInvalidFirstName.valid();
	assert.equal( ariaInvalidFirstName.attr( "aria-invalid" ), "true" );
} );

QUnit.test( "Valid field adds aria-invalid=false", function( assert ) {
	var ariaInvalidFirstName = $( "#ariaInvalidFirstName" ),
		form = $( "#ariaInvalid" );

	form.validate( {
		rules: {
			ariaInvalidFirstName: "required"
		}
	} );
	ariaInvalidFirstName.val( "not empty" );
	ariaInvalidFirstName.valid();
	assert.equal( ariaInvalidFirstName.attr( "aria-invalid" ), "false" );
	assert.equal( $( "#ariaInvalid [aria-invalid=false]" ).length, 1 );
} );

QUnit.test( "resetForm(): removes all aria-invalid attributes", function( assert ) {
	var ariaInvalidFirstName = $( "#ariaInvalidFirstName" ),
		form = $( "#ariaInvalid" ),
		validator = form.validate( {
			rules: {
				ariaInvalidFirstName: "required"
			}
		} );

	ariaInvalidFirstName.val( "not empty" );
	ariaInvalidFirstName.valid();
	validator.resetForm();
	assert.equal( $( "#ariaInvalid [aria-invalid]" ).length, 0, "resetForm() should remove any aria-invalid attributes" );
} );

QUnit.test( "Static required field adds aria-required", function( assert ) {
	var ariaRequiredStatic = $( "#ariaRequiredStatic" ),
		form = $( "#ariaRequired" );

	form.validate();
	assert.equal( ariaRequiredStatic.attr( "aria-required" ), "true" );
} );

QUnit.test( "Data required field adds aria-required", function( assert ) {
	var ariaRequiredData = $( "#ariaRequiredData" ),
		form = $( "#ariaRequired" );

	form.validate();
	assert.equal( ariaRequiredData.attr( "aria-required" ), "true" );
} );

QUnit.test( "Class required field adds aria-required", function( assert ) {
	var ariaRequiredClass = $( "#ariaRequiredClass" ),
		form = $( "#ariaRequired" );

	form.validate();
	assert.equal( ariaRequiredClass.attr( "aria-required" ), "true" );
} );

QUnit.test( "Dynamically required field adds aria-required after valid()", function( assert ) {
	var ariaRequiredDynamic = $( "#ariaRequiredDynamic" ),
		form = $( "#ariaRequired" );

	form.resetForm();
	form.validate( {
		rules: {
			ariaRequiredDynamic: "required"
		}
	} );
	ariaRequiredDynamic.valid();
	assert.equal( ariaRequiredDynamic.attr( "aria-required" ), "true" );
} );
