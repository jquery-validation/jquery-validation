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

task.registerTask('zip', 'Create a zip file for release', function() {
  var folder = config('pkg').name + '-' + config('pkg').version;
  var target = 'dist/' + folder + '.zip';
  log.writeln('Zipping into ' + target);

  var done = this.async();

  var zipstream = require('zipstream');
  var fs = require('fs');

  var out = fs.createWriteStream(target);
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
    log.writeln('Zipping ' + file.file);
    zip.addFile(fs.createReadStream(file.file), { name: folder + '/' + file.name }, addFile);
  }

  // TODO use the concat results instead of copying the original source files
  // or don't use grunt's banner support, replace @VERSION instead
  var files = [{
    file: 'dist/additional-methods.min.js',
    name: 'additional-methods.min.js'
  },
  {
    file: 'dist/jquery.validate.min.js',
    name: 'jquery.validate.min.js'
  }];
  file.recurse('.', function(name) {
    if (/^(:?node_modules|dist|\.|build)/.test(name)) {
      return;
    }
    files.push({
      file: name,
      name: name
    });
  });
  addFile();
});

task.registerTask('default', 'lint qunit');
task.registerTask('release', 'default concat min zip');
