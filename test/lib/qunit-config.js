QUnit.config.urlConfig.push({
	id: "jquery",
	label: "jQuery version",
	value: [ "1.7.2", "1.8.3", "1.9.1", "git" ],
	tooltip: "What jQuery Core version to test against"
});

// Asserts that there is a visible error with the given text for the specified element
QUnit.assert.hasError = function( element, text, message ) {
	var errors = $( element ).closest( "form" ).validate().errorsFor( element[ 0 ] ),
		actual = ( errors.length === 1 && errors.is( ":visible" ) ) ? errors.text() : "";
	QUnit.push( actual, actual, text, message );
};

// Asserts that there is no visible error for the given element
QUnit.assert.noErrorFor = function( element, message ) {
	var errors = $( element ).closest( "form" ).validate().errorsFor( element[ 0 ] ),
		hidden = ( errors.length === 0 ) || errors.is( ":hidden" ) || ( errors.text() === "" );
	QUnit.push( hidden, hidden, true, message );
};
