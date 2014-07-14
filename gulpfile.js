var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    cssmin       = require('gulp-cssmin'),
    watch        = require('gulp-watch'),
    livereload   = require('gulp-livereload')
 
var exec = require('child_process').exec;
var gutil = require('gulp-util');


// Compiling and refining the CSS

gulp.task('sass', function() {
    gulp.src('./source/style.scss')
        .pipe(sass())
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build'));
});
 

// Executing the jekyll build into _site

gulp.task('jekyll', function (){
exec('jekyll build', function(err, stdout, stderr) {
        console.log(stdout);
    });
});


// Serving the local jekyll server: localhost:4000

gulp.task('serve', function (){
exec('jekyll serve', function(err, stdout, stderr) {
        console.log(stdout);
    });
});


// Configuring combining task
 
gulp.task('watch', ['serve'], function() {
    livereload.listen();
    gulp.watch('./source/**/*.scss', ['sass', 'jekyll']).on('change', livereload.changed);
    gulp.watch('./_posts/**/*.html', ['jekyll']).on('change', livereload.changed);
});