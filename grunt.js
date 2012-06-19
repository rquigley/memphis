module.exports = function(grunt) {
    grunt.initConfig({
        min: {
            dist: {
                src: ['memphis.js'],
                dest: 'memphis.min.js'
            }
        },
        lint: {
            files: ['memphis.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {

            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true
            },
            globals: {
                define: true
            }
        }
    });

  grunt.registerTask('default', 'lint');
};
