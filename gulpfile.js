/*
 -- Gulp Top Level Functions --

    gulp.task   -   Defines Task
    gulp.src    -   Points to files begin used
    gulp.dest   -   Point to folder to output
    gulp.watch  -   Watches files and folder for changes       

*/

// Bring in dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglifycss = require('gulp-uglifycss');

const { series } = require('gulp');

// Log Message
async function message() {
  return console.log('Gulp is running...');
}

// Compile all HTML files into dist
async function distHtml() {
  return gulp.src('src/*.html').pipe(gulp.dest('./dist'));
}

// Compile all SASS files into dist
async function distStyle() {
  return (
    gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(
        uglifycss({
          uglyComments: true,
        })
      )
      .pipe(gulp.dest('./dist/css'))
      // Stream css changes to all browsers
      .pipe(browserSync.stream())
  );
}

// Compile all JS files into dist
async function distJS() {
  return gulp.src('src/js/**/*.js').pipe(gulp.dest('./dist/js'));
}

// Compile all the Images into dist
async function distImg() {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

// Watch & Server
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('src/scss/**/*.scss', distStyle);
  gulp.watch('src/*.html', distHtml).on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js', distJS).on('change', browserSync.reload);
  gulp.watch('src/images/*', distImg).on('change', browserSync.reload);
}

exports.default = message;
exports.default = distHtml;
exports.default = distStyle;
exports.default = distJS;
exports.default = distImg;
exports.default = watch;

exports.default = series(message, distHtml, distStyle, distJS, distImg, watch);
