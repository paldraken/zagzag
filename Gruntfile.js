var _ = require('underscore');
var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: { 
            server: {
                options: {
                    port: 9999,
                    base: 'app'
                }
                
            }
        },
        // watch
        watch: {
            css: {
                files: 'src/**/*.less',
                tasks: ['less']
            },
            haml: {
                files: 'src/views/**/*.haml',
                tasks: ['haml']
            },
            img: {
                files: 'src/img/**/*.{png,jpg,gif}',
                task: ['img']
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
                options: {
                    language: 'ruby',
                    rubyHamlCommand: 'haml'
                },
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
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**/*.{png,jpg,gif}'],
                    dest: 'app/'
                }]
            }
        }
    });


    var gruntModules = fs.readdirSync('./node_modules');
    gruntModules.forEach(function(path) {
        if (/grunt/.test(path) && path !== 'grunt') {
            grunt.loadNpmTasks(path)
        }
    });  


    grunt.registerTask('default', ['server', 'watch']);

    grunt.registerTask('server', ['connect']);
    grunt.registerTask('html', ['haml']);
    grunt.registerTask('build', ['haml', 'less']);
    grunt.registerTask('img', ['imagemin']);

};