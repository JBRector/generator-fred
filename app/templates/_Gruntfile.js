module.exports = function(grunt) {
    'use strict';

    <% if (use_PHP) { %>var phpMiddleware = require('connect-php');<% } %>

    var paths = {
        src: 'src',
        build: 'release'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: paths,

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9', 'ie 8']
            },

            non_ie: {
                src: '<%%= project.src %>/assets/css/main.css',
                dest: '<%%= project.build %>/assets/css/main.css'
            },

            ie: {
                src: '<%%= project.build %>/assets/css/ie.css'
            }
        },

        bowercopy: {
            libs: {
                options: {
                    destPrefix:'<%%= project.src %>/assets/js/vendor'
                },
                files: {
                    'modernizr.js': 'modernizr/modernizr.js',
                    <% if (include_jQuery) { %>'jquery.min.js': 'jquery/dist/jquery.min.js',<% } %>
                    <% if (include_jPanelMenu) { %>'jquery.jpanelmenu.min.js': 'jpanelmenu/jquery.jpanelmenu.min.js',<% } %>
                    <% if (include_jRespond) { %>'jRespond.js': 'jRespond/index.js',<% } %>
                    <% if (include_Mustache) { %>'mustache.js': 'mustache/mustache.js',<% } %>
                    <% if (include_Handlebars) { %>'handlebars.js': 'handlebars/handlebars.js',<% } %>
                    <% if (include_Underscore) { %>'underscore.js': 'underscore/underscore.js',<% } %>
                    <% if (include_Cookie) { %>'jquery.cookie.js': 'jquery-cookie/jquery.cookie.js',<% } %>
                    <% if (include_Respond) { %>'respond.js': 'respond/dest/respond.min.js'<% } %>
                }
            }<% if (include_Bootstrap) { %>,
            bootstrap: {
                files: {
                    '<%%= project.src %>/assets/js/vendor/bootstrap.js': 'bootstrap-sass-official/assets/javascripts/bootstrap.js',
                    '<%%= project.src %>/assets/scss/bootstrap': 'bootstrap-sass-official/assets/stylesheets/bootstrap',
                    '<%%= project.src %>/assets/scss/bootstrap.scss': 'bootstrap-sass-official/assets/stylesheets/_bootstrap.scss',
                    '<%%= project.src %>/assets/fonts': 'bootstrap-sass-official/assets/fonts/bootstrap'
                }
            }<% } %>
        },

        clean: ['<%%= project.build %>'],

        <% if (use_PHP) { %>
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%%= project.src %>',
                    hostname: 'localhost',
                    open: true,
                    livereload:true,
                    middleware: function(connect, options) {
                        // Same as in grunt-contrib-connect
                        var middlewares = [];
                        var directory = options.directory ||
                        options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Here comes the PHP middleware
                        middlewares.push(phpMiddleware(directory));

                        // Same as in grunt-contrib-connect
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }
                }
            }
        },
        <% } else { %>
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%%= project.src %>',
                    hostname: 'localhost',
                    open: true,
                    livereload:true
                }
            }
        },
        <% } %>

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['<%%= project.src %>/assets/fonts/**'],
                        dest: '<%%= project.build %>/assets/fonts/'
                    },
                    {
                        expand:true,
                        cwd: '<%%= project.src %>/assets/images/',
                        src: '**/*.{png,jpg,jpeg,gif}',
                        dest:'<%%= project.build %>/assets/images/'
                    },<% if (include_Respond) { %>
                    {
                        expand:true,
                        filter: 'isFile',
                        flatten:true,
                        src:'<%%= project.src %>/assets/js/vendor/respond.js',
                        dest:'<%%= project.build %>/assets/js/vendor/'
                    },<% }; if (use_PHP) { %>
                    {
                        expand:true,
                        filter: 'isFile',
                        flatten:true,
                        src:'<%%= project.src %>/*.php',
                        dest:'<%%= project.build %>'
                    },
                    {
                        expand:true,
                        filter: 'isFile',
                        flatten:true,
                        src:'<%%= project.src %>/includes/*.php',
                        dest:'<%%= project.build %>/includes/'
                    }<% } else { %>
                    {
                        expand:true,
                        filter: 'isFile',
                        flatten:true,
                        src:'<%%= project.src %>/*.html',
                        dest:'<%%= project.build %>/'
                    }
                    <% } %>
                ]
            }
        },

        imageoptim: {
            main: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['<%%= project.build %>/assets/images/**/*.{png,jpg,jpeg,gif}']
            }
        },

        jshint: {
            files: ['<%%= project.src %>/assets/js/*.js']
        },

        livereload: {
            // 35729 Default livereload listening port.
            port: 9001
        },

        modernizr: {
            dist: {
                'devFile': '<%%= project.src %>/assets/js/vendor/modernizr.js',
                'outputFile': '<%%= project.build %>/assets/js/vendor/modernizr.js',
                'extra': {
                    'shiv': true,
                    'printshiv': false,
                    'load': false,
                    'mq': false,
                    'cssclasses': true
                },
                'parsefiles': false,
                'files': {
                    'src':['<%%= project.build %>/assets/js/site.js', '<%%= project.build %>/assets/css/main.css']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%%= project.src %>/assets/css/main.css' : '<%%= project.src %>/assets/scss/main.scss'
                }
            },
            dev: {
                files: {
                    '<%%= project.src %>/assets/css/main.css' : '<%%= project.src %>/assets/scss/main.scss'
                }
            }
        },

        split_styles: {
            ie: {
                options: {
                    pattern: /\.lt-ie[8|9]/,
                    output:'<%%= project.build %>/assets/css/ie.css'
                },
                files: {
                    '<%%= project.src %>/assets/css/main.css': '<%%= project.src %>/assets/css/main.css'
                }
            }
        },

        svg2png: {
            all: {
                files: [{
                    cwd: '<%%= project.src %>/assets/images/',
                    src: ['**/*.svg'],
                    dest: '<%%= project.src %>/assets/images/png/'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },               // don't remove the viewbox atribute from the SVG
                    { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
                    { removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= project.src %>/assets/images',
                    src: ['**/*.svg'],
                    dest: '<%%= project.build %>/assets/images/',
                    ext: '.png'
                }]
            }
        },

        uncss: {
            dist: {
                files: {
                    <% if (use_PHP) { %>'<%%= project.build %>/assets/css/main.css': ['<%%= project.build %>/**/*.php']<% } else { %>'<%%= project.build %>/assets/css/main.css': ['<%%= project.build %>/*.html']<% } %>
                }
            }
        },

        useminPrepare: {
            html: <% if (use_PHP) { %>['<%%= project.src %>/includes/_footer.php']<% } else { %>['<%%= project.src %>/*.html']<% } %>,
            options: {
                dest: '<%%= project.build %>'
            }
        },

        usemin: {
            html: <% if (use_PHP) { %>['<%%= project.build %>/includes/_footer.php']<% } else { %>['<%%= project.build %>/*.html']<% } %>
        },

        watch: {
            sass: {
                files: <% if (include_Bootstrap) { %>['<%%= project.src %>/assets/scss/*', '<%%= project.src %>/assets/scss/bootstrap/*', '<%%= project.src %>/assets/scss/bootstrap/mixins/*'],<% } else { %>['<%%= project.src %>/assets/scss/*', '<%%= project.src %>/assets/scss/base/*', '<%%= project.src %>/assets/scss/global/*', '<%%= project.src %>/assets/scss/modules/*', '<%%= project.src %>/assets/scss/pages/*'],<% } %>
                tasks: ['sass:dev']
            },

            options: {
                livereload:true
            },

            livereload: {
                files: [
                    <% if (use_PHP) { %>'<%%= project.src %>/**/*.php'<% } else { %>'<%%= project.src %>/*.html'<% } %>,
                    '<%%= project.src %>/assets/js/{,*/}*.js',
                    '<%%= project.src %>/assets/images/{,*/}*.{png,jpg,jpeg,webp,gif}']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('bowerclean', [
        'bowercopy'
    ]);

    // Run grunt server to start a local development server with node
    grunt.registerTask('server', [
        'sass:dev',
        'connect',
        'livereload-start',
        'watch'
    ]);

    // Use default task for compiling production files
    grunt.registerTask('default', [
        'clean',
        'sass:dist',
        'split_styles:ie',
        'autoprefixer',
        'jshint',
        'copy',
        'svg2png',
        'svgmin',
        <% if (include_Imageoptim) { %>'imageoptim',<% } else { %> /*'imageoptim',*/ <% } %>
        'useminPrepare',
        'concat',
        'uglify',
        'usemin',
        <% if (include_Uncss) { %>'uncss',<% } else { %> /*'uncss',*/ <% } %>
        'modernizr'
    ]);

};
