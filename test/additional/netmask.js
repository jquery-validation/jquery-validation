QUnit.test( "netmask", function( assert ) {
    var netmask_list = [ "255.255.255.0", "255.255.0.0", "255.0.0.0",
                         "255.255.128.0", "255.255.248.0", "254.0.0.0",
                         "128.0.0.0", "255.248.0.0", "255.252.0.0" ];
    var non_netmask_list = [ "255.255.255.22", "255.1.0.255", "255.1.0.0",
                             "255.255.0.1", "254.255.0.0", "256.1.2.12",
                             "252.1.128.0", "252.255.1.0", "248.255.0.0" ];
    var method = methodTest( "netmask" );

    for ( var i = 0; i < netmask_list.length; i++ ) {
        assert.ok( method( netmask_list[ i ] ), netmask_list[ i ] +
            " is a valid netmask" );
    }

    for ( i = 0; i < non_netmask_list.length; i++ ) {
        assert.ok( !method( non_netmask_list[ i ] ), non_netmask_list[ i ] +
            " is not a valid netmask" );
    }
} );
