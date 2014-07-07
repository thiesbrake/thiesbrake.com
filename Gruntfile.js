'use strict';
module.exports = function(grunt) {

    grunt.initConfig({

        // Serve Localhost
        connect: {
            server: {
            options: {
                port: 4000,
                base: './_site'
             }
            }
        },

        // style (Sass) compilation via Compass
        compass: {
            dist: {
                options: {
                    sassDir: 'source',
                    cssDir: 'build',
                    imagesDir: 'images',
                    images: 'images',
                    javascriptsDir: 'javascripts/build',
                    fontsDir: 'fonts',
                    environment: 'production',
                    outputStyle: 'compressed',
                    relativeAssets: true,
                    noLineComments: true,
                    force: true
                }
            }
        },

        // Jekyll with drafts
        jekyll: {
          dist: {
            options: {
              drafts: true
            }
          }
        },

        // Watch files for changes
        watch: {

          compass: {
                files: [
                    'source/*',
                    'source/**/*'
                ],
                tasks: ['compass', 'jekyll']
          }
        }
    
    });

    // load tasks
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // register task
    grunt.registerTask('default', [
        'jekyll',
        'compass',
        'watch'
    ]);

};