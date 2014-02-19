var _ = require('underscore');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // watch
        watch: {
            css: {
                files: 'src/**/*.less',
                tasks: ['less']
            },
            haml: {
                files: 'src/views/**/*.haml',
                tasks: ['haml']
            }
        },
        // less
        less: {
            production: {
                options: {
                    patch: ['app/css'],
                    cleancss: true
                },
                files: {
                    'app/css/site.css': 'src/less/site.less'
                }
            }
        },
        // haml
        haml: {
            all: {
                files: (function() {
                    var files = grunt.file.expandMapping(['src/views/**/*.haml'], 'app/', {
                        rename: function(base, path) {
                            path = path.replace('src\/views\/', '');
                            return base + path.replace(/\.haml$/, '.html');
                        }
                    });
                    var exclude = /\/Modules\//;
                    files = _.filter(files, function(path) {
                        return !exclude.test(path.src[0]);
                    });
                    return files;
                })()
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-haml');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('html', ['haml']);

    grunt.registerTask('build', ['haml', 'less']);

};