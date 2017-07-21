var gulp = require('gulp');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('postcss-scss');
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

gulp.task('css', function () {
    var postPlugins = [require('postcss-smart-import')({
        path: ['E:/_work/Dropbox/github/modules/base-libs/css']
    }),
        // require('postcss-calc'),
        require('postcss-apply'),
        require('autoprefixer')({
            remove: false
        }),
        // require('postcss-custom-properties'),
        require('postcss-nested'),
        require('postcss-css-variables')]

    return gulp.src('src/**/*.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss(postPlugins))
        // .pipe(sourcemaps.write('.'))
        // .pipe(gulp.dest('dist'))

        .pipe(gulp.dest('dist'))
        .pipe(cleanCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('w', function () {
    gulp.start('css');

    gulp.watch('src/css/*', function () {
        gulp.start('css');
    });
});

gulp.task('p', function () {


});

gulp.task('build', ['def','min','css']);

gulp.task('def', async function () {
    const bundle = await rollup.rollup({
        entry: './src/paginator.js',
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            babel({
                exclude: ['node_modules/**'],
            }),
            uglify(),   // 加入压缩代码
            commonjs()
        ]
    });

    await bundle.write({
        format: 'umd',
        moduleName: 'Paginator',
        dest: 'dist/paginator.js',
    });
});

gulp.task('min', async function () {
    const bundle = await rollup.rollup({
        entry: './src/paginator.js',
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            babel({
                exclude: ['node_modules/**'],
            }),
            uglify(),   // 加入压缩代码
            commonjs()
        ]
    });

    await bundle.write({
        format: 'umd',
        moduleName: 'Paginator',
        dest: 'dist/paginator.min.js', // equivalent to --output
        // sourceMap: true
    });
});

gulp.task('default', function () {

});