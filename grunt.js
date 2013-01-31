/*global config:true, task:true*/
module.exports = function(grunt) {

grunt.initConfig({
	pkg: '<json:package.json>',
	meta: {
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("m/d/yyyy") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
	},
	concat: {
		'dist/jquery.validate.js': ['<banner>', '<file_strip_banner:jquery.validate.js>'],
		'dist/additional-methods.js': ['<banner>', '<file_strip_banner:additional-methods.js>']
	},
	min: {
		'dist/jquery.validate.min.js': ['<banner>', 'dist/jquery.validate.js'],
		'dist/additional-methods.min.js': ['<banner>', 'dist/additional-methods.js']
	},
	zip: {
		dist: {
			src: [
				'dist/additional-methods.js',
				'dist/additional-methods.min.js',
				'dist/jquery.validate.js',
				'dist/jquery.validate.min.js',
				'README.md',
				'changelog.txt',
				'grunt.js',
				'package.json',
				'demo/**/*.*',
				'lib/**/*.*',
				'localization/**/*.*',
				'test/**/*.*'
			],
			dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
		}
	},
	qunit: {
		files: ['test/index.html']
	},
	lint: {
		files: [
			'jquery.validate.js',
			'additional-methods.js',
			'localization/*.js'
		],
		test: [
			'test/test.js',
			'test/rules.js',
			'test/messages.js',
			'test/methods.js'
		]
	},
	jshint: {
		options: {
			curly: true,
			eqeqeq: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			sub: true,
			undef: true,
			eqnull: true,
			browser: true
		},
		globals: {
			jQuery: true,
			$: true,
			console: true,
			/* TODO only allows these for tests (grunt 0.4) */
			QUnit: true,
			module: true,
			test: true,
			start: true,
			stop: true,
			expect: true,
			ok: true,
			equal: true,
			deepEqual: true,
			strictEqual: true
		}
	}
});

grunt.registerMultiTask('zip', 'Create a zip file for release', function() {
	var files = grunt.file.expand(this.file.src);
	// grunt.log.writeln(require('util').inspect(files));
	grunt.log.writeln("Creating zip file " + this.file.dest);

	var done = this.async();

	var zipstream = require('zipstream');
	var fs = require('fs');

	var out = fs.createWriteStream(this.file.dest);
	var zip = zipstream.createZip({ level: 1 });

	zip.pipe(out);

	function addFile() {
		if (!files.length) {
			zip.finalize(function(written) {
				grunt.log.writeln(written + ' total bytes written');
				done();
			});
			return;
		}
		var file = files.shift();
		grunt.log.verbose.writeln('Zipping ' + file);
		zip.addFile(fs.createReadStream(file), { name: file }, addFile);
	}
	addFile();
});

grunt.registerTask('default', 'lint qunit');
grunt.registerTask('release', 'default concat min zip');

};