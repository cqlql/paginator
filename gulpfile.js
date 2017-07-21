var gulp = require('gulp');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('postcss-scss');


gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('w', function () {
    gulp.start('css');

    gulp.watch('src/css/*', function () {
        gulp.start('css');
    });
});

gulp.task('p', function () {


});

gulp.task('default', function () {

});


