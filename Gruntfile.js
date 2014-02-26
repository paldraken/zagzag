var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //server
        connect: { 
            server: {
                options: {
                    port: 9999,
                    base: 'public'
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
                files: ['src/css/**/*.css'],
                tasks: ['copy:css']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            }
        },
        // less
        less: {
            production: {
                options: {
                    patch: ['public/css'],
                    cleancss: false,
                    sourceMap: true,
                    sourceMapFilename: 'public/css/site.css.map',
                    sourceMapURL: 'http://127.0.0.1:9999/css/site.css.map'
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
            },
            html: {
                files: [{
                    cwd: 'src/',
                    src: ['**/*.html'],
                    dest: 'public/',
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
                        "app": "app/app"
                    },
                    wrap: true,
                    name: "../lib/almond/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/config.js",
                    include: ["app"],
                    out: "public/js/app/init.min.js"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        clean: ["public", "!public/.gitignore"]
    });


    var gruntModules = fs.readdirSync('./node_modules');
    gruntModules.forEach(function(path) {
        if (/grunt/.test(path) && path !== 'grunt') {
            grunt.loadNpmTasks(path);
        }
    });


    grunt.registerTask('default', ['server', 'watch']);

    grunt.registerTask('build', ['clean','jade', 'less', 'copy', 'imagemin', 'requirejs:mainJS']);

    grunt.registerTask('hint', ['clean','jade', 'less', 'copy', 'imagemin', 'jshint']);

    grunt.registerTask('lib', ['bower']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('html', ['jade']);

};