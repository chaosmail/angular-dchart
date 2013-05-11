var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
             '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      options: {
        reporter: 'dot'
      },
      all: { src: ['test/unit/*.js'] }
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
      minify: {
        files: {
          'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
        }
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      my_target: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/*.js']
        }
      }
    },
    copy: {
      copyLibs: {
        files: {
          'lib/angular.js': 'components/angular/angular.js',
          'lib/angular.min.js': 'components/angular/angular.min.js',
          'lib/angular-mocks.js': 'components/angular-mocks/angular-mocks.js',
          'lib/d3.js': 'components/d3/d3.js',
          'lib/d3.min.js': 'components/d3/d3.min.js'
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
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task(s).
  grunt.registerTask('default', ['simplemocha', 'concat', 'cssmin','uglify']);
  grunt.registerTask('lib', ['copy']);
};