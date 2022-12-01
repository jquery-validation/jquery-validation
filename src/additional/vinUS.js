/**
 * Return true, if the value is a valid vehicle identification number (VIN).
 *
 * Works with all kind of text inputs.
 *
 * @example <input type="text" size="20" name="VehicleID" class="{required:true,vinUS:true}" />
 * @desc Declares a required input element whose value must be a valid vehicle identification number.
 *
 * @name $.validator.methods.vinUS
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
$.validator.addMethod( "vinUS", function( v ) {
    if ( v.length !== 17 ) {
        return false;
    }

    var LL = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
        VL = [ 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9 ],
        FL = [ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ],
        rs = 0,
        i, n, d, f, cd, cdv;

    for ( i = 0; i < 17; i++ ) {
        f = FL[ i ];
        d = v.slice( i, i + 1 );
        if ( isNaN( d ) ) {
            d = d.toUpperCase();
            n = VL[ LL.indexOf( d ) ];
        } else {
            n = parseInt( d, 10 );
        }
        if ( i === 8 )
        {
            cdv = n;
            if ( d === "X" ) {
                cdv = 10;
            }
        }
        rs += n * f;
    }
    cd = rs % 11;
    if ( cd === cdv ) {
        return true;
    }
    return false;
}, "The specified vehicle identification number (VIN) is invalid." );
