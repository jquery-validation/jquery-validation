module("extension");

test("extension", function() {
	var method = methodTest("extension"),
		v;
	ok( method( "picture.gif" ), "Valid default accept type" );
	ok( method( "picture.jpg" ), "Valid default accept type" );
	ok( method( "picture.jpeg" ), "Valid default accept type" );
	ok( method( "picture.png" ), "Valid default accept type" );
	ok(!method( "picture.pgn" ), "Invalid default accept type" );

	v = jQuery("#form").validate();
	method = function(value, param) {
		return $.validator.methods.extension.call(v, value, $("#text1")[0], param);
	};
	ok( method( "picture.doc", "doc" ), "Valid custom accept type" );
	ok( method( "picture.pdf", "doc|pdf" ), "Valid custom accept type" );
	ok( method( "picture.pdf", "pdf|doc" ), "Valid custom accept type" );
	ok(!method( "picture.pdf", "doc" ), "Invalid custom accept type" );
	ok(!method( "picture.doc", "pdf" ), "Invalid custom accept type" );

	ok( method( "picture.pdf", "doc,pdf" ), "Valid custom accept type, comma separated" );
	ok( method( "picture.pdf", "pdf,doc" ), "Valid custom accept type, comma separated" );
	ok(!method( "picture.pdf", "gop,top" ), "Invalid custom accept type, comma separated" );
});
