$.validator.addMethod( "lessThan", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-lessThan-blur" ).length ) {
        target.addClass( "validate-lessThan-blur" ).on( "blur.validate-lessThan", function() {
            $( element ).valid();
        } );
    }
	var val = target.val(), normalizer, rules;
	if ( rules = target.rules() ) {
		if ( typeof rules.normalizer === "function" ) {
			normalizer = rules.normalizer;
		} else if (	typeof this.settings.normalizer === "function" ) {
			normalizer = this.settings.normalizer;
		}
		if ( normalizer ) {
			val = normalizer.call( element, val );
		}
	}
    return value < val;
}, "Please enter a lesser value." );
