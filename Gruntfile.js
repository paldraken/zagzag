var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //server
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
            less: {
                files: 'src/**/*.less',
                tasks: ['less']
            },
            jade: {
                files: 'src/**/*.jade',
                tasks: ['jade']
            },
            img: {
                files: 'src/img/**/*.{png,jpg,gif}',
                task: ['img']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['copy:js']
            },
            css: {
                files: ['source/css/**/*.css'],
                tasks: ['copy:css']
            }
        },
        // less
        less: {
            production: {
                options: {
                    patch: ['public/css'],
                    cleancss: false
                },
                files: {
                    'public/css/site.css': 'src/less/site.less'
                }
            }
        },
        // jade
        jade: {
            compile: {
                files: [{
                    cwd: 'src',
                    src: ['**/*.jade', '!partials/**/*.jade'],
                    dest: 'public',
                    expand: true,
                    ext: '.html'
                    }],
                options: {
                    pretty: true,
                    debug: false
                }
            }
        },
        // imagemin
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/'
                }]
            }
        },
        copy: {
            css: {
                files: [{
                    cwd: 'src/css',
                    src: ['**/*.css'],
                    dest: 'public/css',
                    expand: true
                }]
            },
            js: {
                files: [{
                    cwd: 'src/js',
                    src: ['**/*.js'],
                    dest: 'public/js',
                    expand: true
                }]
            },
            vendor: {
                files: [{
                    cwd: 'src/lib',
                    src: ['**/*.{js,css}'],
                    dest: 'public/lib',
                    expand: true
                }]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'src/lib',
                    layout: 'byType',
                    install: true,
                    verbose: true,
                    cleanTargetDir: false,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
            }
        },
        requirejs: {
            mainJS: {
                options: {
                    baseUrl: "public/js/",
                    paths: {
                        "app": "app/config/Init"
                    },
                    wrap: true,
                    name: "libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/app/config/Init.js",
                    include: ["app"],
                    out: "public/js/app/config/Init.min.js"
                }
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

    grunt.registerTask('build', ['jade', 'less', 'copy', 'imagemin']);
    grunt.registerTask('lib', ['bower']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('html', ['jade']);

};