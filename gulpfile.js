const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const html = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Sass Compile
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: ['compressed'] }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 10 versions'] }))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.stream());
});
//  Obs Sass 
gulp.task('obsSass', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
});
// Javascript Compress
gulp.task('compressJs', function() {
    return gulp.src('./www/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./www/js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/js/dist'));
});

// Html Compress
gulp.task('compressHtml', function() {
    return gulp.src('./templates/*.html')
        .pipe(html({ collapseWhitespace: 'true' }))
        .pipe(gulp.dest('./www'));
});

// Obs Html 
gulp.task('obsHtml', function() {
    gulp.watch('./templates/*.html', ['compressHtml']);
});

// Image Compression
gulp.task('img-compression', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./www/img'))
});

// Live Server
gulp.task('live-server', ['sass', 'compressJs'], function() {

    browserSync.init({
        server: "./www"
    });
    gulp.watch({ cwd: './www/' }, browserSync.reload);
});

// Watch on everything
gulp.task('default', function() {
    gulp.start('live-server');
    gulp.watch("./scss/**/*.scss", ['obsSass'], ['sass']);
    gulp.watch("./www/js/*.js", ['compressJs']).on('change', browserSync.reload);
    gulp.watch("./templates/*.html", ['obsHtml'], ['compressHtml']).on('change', browserSync.reload);
});