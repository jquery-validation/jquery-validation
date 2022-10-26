$.validator.addMethod( "greaterThanEqual", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-greaterThanEqual-blur" ).length ) {
        target.addClass( "validate-greaterThanEqual-blur" ).on( "blur.validate-greaterThanEqual", function() {
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
    return value >= val;
}, "Please enter a greater value." );
