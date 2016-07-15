/**
 * Compile JSX files to JavaScript.
 *
 * ---------------------------------------------------------------
 *
 * Compiles jsx files from `assest/js` into Javascript and places them into
 * `.tmp/public/js` directory.
 *
 */
module.exports = function(grunt) {

  grunt.config.set('babel', {
    dev: {
      options: {
        presets: ['react', 'es2015']
      },
      files: [{
        expand: true,
        cwd: 'assets/views/',
        src: ['**/*.jsx'],
        dest: '.tmp/public/js/react-views',
        ext: '.js'
      },
      {
        expand: true,
        cwd: 'assets/js/languages',
        src: ['**/*.js'],
        dest: '.tmp/public/js/languages',
        ext: '.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-babel');
};
