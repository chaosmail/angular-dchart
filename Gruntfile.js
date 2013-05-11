var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
             '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'build/<%= pkg.name %>.css'
      },
      js: {
        src: ['src/js/<%= pkg.name %>.js','src/js/<%= pkg.name %>.*.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      minify: {
        files: {
          'build/<%= pkg.name %>.min.css': ['build/<%= pkg.name %>.css']
        }
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      my_target: {
        files: {
          'build/<%= pkg.name %>.min.js': ['build/*.js']
        }
      }
    },
    copy: {
      copyLibs: {
        files: {
          'libs/angular.js': 'components/angular/angular.js',
          'libs/angular.min.js': 'components/angular/angular.min.js',
          'libs/jquery.js': 'components/jquery/jquery.js',
          'libs/jquery.min.js': 'components/jquery/jquery.min.js',
          'libs/d3.js': 'components/d3/d3.js',
          'libs/d3.min.js': 'components/d3/d3.min.js',
          'libs/bootstrap.js': 'components/bootstrap/bootstrap/js/bootstrap.js',
          'libs/bootstrap.min.js': 'components/bootstrap/bootstrap/js/bootstrap.min.js',
          'libs/bootstrap.css': 'components/bootstrap/bootstrap/css/bootstrap.css',
          'libs/bootstrap.min.css': 'components/bootstrap/bootstrap/css/bootstrap.min.css'
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

  // Default task(s).
  grunt.registerTask('default', ['concat', 'cssmin','uglify']);
  grunt.registerTask('libs', ['copy']);
};