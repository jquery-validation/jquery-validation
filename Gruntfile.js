/*jshint node:true*/
module.exports = function(grunt) {

"use strict";

grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	concat: {
		options: {
			banner: "/*!\n" +
				" * jQuery Validation Plugin v<%= pkg.version %>\n" +
				" *\n" +
				" * <%= pkg.homepage  %>\n" +
				" *\n" +
				" * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
				" * Released under the <%= _.pluck(pkg.licenses, 'type').join(', ') %> license\n" +
				" */\n"
		},
		// used to copy to dist folder
		dist: {
			files: {
				"dist/jquery.validate.js": ["src/core.js", "src/*.js"],
				"dist/additional-methods.js": ["src/additional/additional.js", "src/additional/*.js"]
			}
		}
	},
	uglify: {
		options: {
			preserveComments: false,
			banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
				"<%= grunt.template.today('m/d/yyyy') %>\n" +
				" * <%= pkg.homepage  %>\n" +
				" * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
				" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n"
		},
		all: {
			files: {
				"dist/jquery.validate.min.js": ["dist/jquery.validate.js"],
				"dist/additional-methods.min.js": ["dist/additional-methods.js"]
			}
		}
	},
	compress: {
		dist: {
			options: {
				mode: "zip",
				level: 1,
				archive: "dist/<%= pkg.name %>-<%= pkg.version %>.zip",
				pretty: true
			},
			src: [
				"dist/*.js",
				"README.md",
				"changelog.txt",
				"Gruntfile.js",
				"package.json",
				"demo/**/*.*",
				"lib/**/*.*",
				"src/localization/**/*.*",
				"test/**/*.*"
			]
		}
	},
	qunit: {
		files: ["test/index.html"]
	},
	jshint: {
		options: {
			jshintrc: true
		},
		files: [
			"src/**/*.js"
		],
		test: {
			files: {
				src: [
					"test/*.js"
				]
			}
		},
		grunt: {
			files: {
				src: [
					"Gruntfile.js"
				]
			}
		}
	},
	watch: {
		gruntfile: {
			files: "Gruntfile.js",
			tasks: ["jshint:grunt"]
		},
		src: {
			files: "<%= jshint.files %>",
			tasks: ["concat", "qunit"]
		},
		test: {
			files: ["<%= jshint.test.files.src %>", "test/index.html"],
			tasks: ["jshint:test"]
		}
	},
	jscs: {
		all: {
			options: {
				preset: "jquery"
			},
			src: "src/**/*.*"
		}
	}
});

grunt.loadNpmTasks("grunt-contrib-jshint");
grunt.loadNpmTasks("grunt-contrib-qunit");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks("grunt-contrib-compress");
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-jscs-checker");

grunt.registerTask("default", ["concat", "jscs", "jshint", "qunit"]);
grunt.registerTask("release", ["default", "uglify", "compress"]);
grunt.registerTask("start", ["concat", "watch"]);

};
