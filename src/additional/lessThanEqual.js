$.validator.addMethod( "lessThanEqual", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-lessThanEqual-blur" ).length ) {
        target.addClass( "validate-lessThanEqual-blur" ).on( "blur.validate-lessThanEqual", function() {
            $( element ).valid();
        } );
    }

    return value <= target.val();
}, "Please enter a lesser value." );
