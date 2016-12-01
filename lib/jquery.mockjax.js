(function() {

var parts = document.location.search.slice( 1 ).split( "&" ),
	length = parts.length,
	scripts = document.getElementsByTagName("script"),
	src = scripts[ scripts.length - 1].src,
	i = 0,
	current,
	version = "2.2.1",
	file = "../lib/jquery.mockjax-2.2.1.js";

for ( ; i < length; i++ ) {
	current = parts[ i ].split( "=" );
	if ( current[ 0 ] === "jquery.mockjax" ) {
		version = current[ 1 ];
		break;
	}
}

if (version != "git" || version < "3") {
	file = src.replace(/jquery.mockjax\.js$/, "jquery.mockjax-" + version + ".js");
}


document.write( "<script src='" + file + "'></script>" );

})();
