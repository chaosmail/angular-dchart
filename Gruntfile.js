var banner = '/** <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today() %>\n' +
             ' *  (c) 2013 Christoph Körner, office@chaosmail.at, http://chaosmail.at\n' +
             ' *  License: MIT\n' +
             ' */\n';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'config/karma.unit.conf.js'
      }
    },
    clean: {
      dist: {
        src: ["dist/"]
      },
      lib: {
        src: ["components/","lib/"]
      },
      demo: {
        src: ["demo/js/","demo/css/"]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      },
      js: {
        src: ['src/js/<%= pkg.name %>.js','src/js/<%= pkg.name %>.*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
        }
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/*.js']
        }
      }
    },
    copy: {
      demo: {
        files: {
          'demo/js/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.js',
          'demo/js/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.min.js',
          'demo/css/<%= pkg.name %>.css': 'dist/<%= pkg.name %>.css',
          'demo/css/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.min.css'
        }
      },
      libs: {
        files: {
          'lib/angular.js': 'components/angular/angular.js',
          'lib/angular.min.js': 'components/angular/angular.min.js',
          'lib/angular-mocks.js': 'components/angular-mocks/angular-mocks.js',
          'lib/d3.js': 'components/d3/d3.js',
          'lib/d3.min.js': 'components/d3/d3.min.js'
        }
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'components/',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/css/*.css', 'src/js/*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['karma', 'clean:dist', 'concat', 'cssmin', 'uglify', 'clean:demo', 'copy:demo']);
  grunt.registerTask('dist', ['clean:dist', 'concat', 'cssmin', 'uglify', 'clean:demo', 'copy:demo']);
  grunt.registerTask('lib', ['clean:lib', 'bower', 'copy:libs']);
};