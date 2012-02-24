/*global config:true, task:true*/
config.init({
  pkg: '<json:package.json>',
  meta: {
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= template.today("m/d/yyyy") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
      '* Copyright (c) <%= template.today("yyyy") %> <%= pkg.author.name %>;' +
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
        'demo/**/*',
        'lib/**/*',
        'localization/**/*',
        'test/**/*'
      ],
      dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
    }
  },
  qunit: {
    files: ['test/index.html']
  },
  lint: {
    files: ['jquery.validate.js']
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
      console: true
    }
  }
});

task.registerBasicTask('zip', 'Create a zip file for release', function(data) {
  var files = file.expand(data.src);
  log.writeln("Creating zip file " + data.dest);

  var done = this.async();

  var zipstream = require('zipstream');
  var fs = require('fs');

  var out = fs.createWriteStream(data.dest);
  var zip = zipstream.createZip({ level: 1 });

  zip.pipe(out);

  function addFile() {
    if (!files.length) {
      zip.finalize(function(written) {
        log.writeln(written + ' total bytes written');
        done();
      });
      return;
    }
    var file = files.shift();
    log.verbose.writeln('Zipping ' + file);
    zip.addFile(fs.createReadStream(file), { name: file }, addFile);
  }
  addFile();
});

task.registerTask('default', 'lint qunit');
task.registerTask('release', 'default concat min zip');
