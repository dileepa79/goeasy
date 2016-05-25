var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssMin = require('gulp-css');


gulp.task('appScripts', function() {
    gulp.src([
        './node_modules/@angular/common/common.umd.js',
        './node_modules/@angular/core/core.umd.js',
        './node_modules/@angular/http/http.umd.js',
        './node_modules/@angular/platform-browser/platform-browser.umd.umd.js',
        './node_modules/@angular/platform-browser-dynamic/platform-browser-dynamic.umd.js',
        './node_modules/@angular/router/router.umd.js'
    ]).pipe(concat('angular.js')).pipe(gulp.dest('./node_modules/@angular-minified'));
});

gulp.task('default', ['appScripts']);
