/*jshint node:true*/
module.exports = function(grunt) {

"use strict";

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: {
		// used to copy to dist folder
		dist: {
			files: {
				'dist/jquery.validate.js': ['src/core.js', 'src/*.js'],
				'dist/additional-methods.js': ['src/additional/additional.js', 'src/additional/*.js']
			}
		}
	},
	uglify: {
		options: {
			preserveComments: false,
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("m/d/yyyy") %>\\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		all: {
			files: {
				'dist/jquery.validate.min.js': ['dist/jquery.validate.js'],
				'dist/additional-methods.min.js': ['dist/additional-methods.js']
			}
		}
	},
	compress: {
		dist: {
			options: {
				mode: 'zip',
				level: 1,
				archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip',
				pretty: true
			},
			src: [
				'dist/*.js',
				'README.md',
				'changelog.txt',
				'Gruntfile.js',
				'package.json',
				'demo/**/*.*',
				'lib/**/*.*',
				'src/localization/**/*.*',
				'test/**/*.*'
			]
		}
	},
	qunit: {
		options: {
			inject: 'test/qunit/bridge.js'
		},
		files: ['test/index.html']
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
			browser: true,
			globals: {
				jQuery: true,
				$: true,
				console: true
			}
		},
		files: [
			'src/**/*.js'
		],
		test: {
			options: {
				globals: {
					jQuery: true,
					$: true,
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
			},
			files: {
				src: [
					'test/*.js'
				]
			}
		},
		grunt: {
			files: {
				src: [
					'Gruntfile.js'
				]
			}
		}
	},
	watch: {
		gruntfile: {
			files: 'Gruntfile.js',
			tasks: ['jshint:grunt']
		},
		src: {
			files: '<%= jshint.files %>',
			tasks: ['concat', 'qunit']
		},
		test: {
			files: ['<%= jshint.test.files.src %>', 'test/index.html'],
			tasks: ['jshint:test']
		}
	},
	coverage: {}
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['concat', 'jshint', 'qunit']);
grunt.registerTask('release', ['default', 'uglify', 'compress']);
grunt.registerTask('start', ['concat', 'watch']);


grunt.registerTask("coverage", "Grunt task for coverage; which will parse your source code and generate an instrumented version allowing testing tools to generate code coverage reports", function() {

	var jscoverage = require('jscoverage');
	var validate = grunt.file.read('dist/jquery.validate.js', 'utf-8');
	if (validate.indexOf('_$jscoverage') === -1) {
		grunt.log.writeln('Adding jscoverage to `jquery.validate`');
		jscoverage.processFile('dist/jquery.validate.js', 'dist/jquery.validate.js');
	}
	var additional = grunt.file.read('dist/additional-methods.js', 'utf-8');
	if (additional.indexOf('_$jscoverage') === -1) {
		grunt.log.writeln('Adding jscoverage to `additional-methods`');
		jscoverage.processFile('dist/additional-methods.js', 'dist/additional-methods.js');
	}

	grunt.event.on('qunit.coverage', function(cov) {
		/* jshint loopfunc: true */
		var lcovResults = '';
		var coveralls = require('coveralls').handleInput;
		var data;
		for (var filename in cov) {
			data = cov[filename];
			lcovResults += 'SF:' + filename + '\n';

			if (!data.source) {
				continue;
			}

			data.source.forEach(function(line, num) {
				// increase the line number, as JS arrays are zero-based
				num++;

				if (data[num] !== undefined) {
					lcovResults += 'DA:' + num + ',' + data[num] + '\n';
				}
			});

			lcovResults += 'end_of_record\n';
		}

		// Restore file contents
		grunt.file.write('dist/jquery.validate.js', validate);
		grunt.file.write('dist/additional-methods.js', additional);

		coveralls(lcovResults);
	});

	grunt.task.run('qunit');
});

};
