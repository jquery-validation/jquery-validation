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
				'src/localization/*.js',
				'test/**/*.*'
			],
			dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
		},
		options: {
			zlib: {
				level: 1
			}
		}
	},
	qunit: {
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
					'test/test.js',
					'test/rules.js',
					'test/messages.js',
					'test/methods.js'
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
			tasks: ['default']
		},
		test: {
			files: '<%= jshint.test.files.src %>',
			tasks: ['jshint:test', 'qunit']
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-zipstream');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['concat', 'jshint', 'qunit']);
grunt.registerTask('release', ['default', 'uglify', 'zip']);

};