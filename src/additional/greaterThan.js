$.validator.addMethod( "greaterThan", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
        target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
            $( element ).valid();
        } );
    }
	var val = target.val(), normalizer;
	if (rules = target.rules()) {
		if ( typeof rules.normalizer === "function" ) {
			normalizer = rules.normalizer;
		} else if (	typeof this.settings.normalizer === "function" ) {
			normalizer = this.settings.normalizer;
		}
		if ( normalizer ) {
			val = normalizer.call( element, val );
		}
	}
    return value > val;
}, "Please enter a greater value." );
