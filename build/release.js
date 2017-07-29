/* Release checklist
- Run `git changelog` and edit to match previous output (this should make use of jquey-release instead)
- pull latest https://github.com/jquery/jquery-release
- disable _generateChangelog task in release.js (BOOOO)
- run
	node release.js --remote=jquery-validation/jquery-validation
- Wait a while, verify and confirm each step
- Create GitHub release: Pick the new tag, add changelog, upload zip
- Upload to NPM
    git fetch --tags jzaefferer
    git checkout tags/X.YY.Z
    npm publish
- Update MS CDN (Ping Chris Sfanos)
- Check jsdelivr CDN: new git tags are automatically pulled, tested & merged via https://github.com/jsdelivr/jsdelivr/pulls
- Check cdnjs CDN: new git tags are automatically committed into https://github.com/cdnjs/cdnjs/commits/master or ping @cdnjs
- Update validation-content/pages/index.html (may have to hold off on CDN updates until available)
- Write blog post: Some highlights, changelog, download links
*/

/*jshint node:true */
module.exports = function( Release ) {

function today() {
	return new Date().toISOString().replace(/T.+/, "");
}

// also add version property to this
Release._jsonFiles.push( "validation.jquery.json" );

Release.define({
	issueTracker: "github",
	changelogShell: function() {
		return Release.newVersion + " / " + today() + "\n==================\n\n";
	},

	generateArtifacts: function( done ) {
		Release.exec( "grunt release", "Grunt command failed" );
		done([
			"dist/additional-methods.js",
			"dist/additional-methods.min.js",
			"dist/jquery.validate.js",
			"dist/jquery.validate.min.js"
		]);
	},

	cdnPublish: false,
	npmPublish: true,

	// disable authors check
	_checkAuthorsTxt: function() {}
});

};
