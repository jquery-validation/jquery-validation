module( "postalCodeCA", {
	setup: function() {
		var $fixture = $( "#qunit-fixture" ),
			$form = $fixture.append( "<form id='form_postalCodeCA'></form>" );

		$form.append("<label for='test_postalCodeCA'>Canadian Postal Code</label><input id='test_postalCodeCA' name='test_postalCodeCA' type='text'>");
	},
	teardown: function() {
		$( "#form_postalCodeCA" ).remove();
	}
});

test( "Valid Canadian Postal Codes", function() {
	var method = methodTest( "postalCodeCA" );
	ok( method( "H0H 0H0" ), "Valid CA Postal Code; Single space" );
});

test( "Invalid Canadian Postal Codes", function() {
	var method = methodTest( "postalCodeCA" );
	ok( !method( "H0H0H0" ), "Inalid CA Postal Code; No space" );
	ok( !method( "H0H-0H0" ), "Invalid CA Postal Code; Single dash" );
	ok( !method( "H0H 0H" ), "Invalid CA Postal Code; Too Short" );
	ok( !method( "Z0H 0H" ), "Invalid CA Postal Code; Only 'ABCEGHJKLMNPRSTVXY' are valid starting characters" );
	ok( !method( "h0h 0h0" ), "Invalid CA Postal Code; Only upper case characters" );
});
