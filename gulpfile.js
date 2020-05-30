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

// Logs Message
async function message() {
  return console.log('Gulp is running...');
}

// Compile all HTML files into dist
async function distHtml() {
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
}

// Compile all SASS files into dist
async function distStyle() {
  return (
    gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      // Stream css changes to all browsers
      .pipe(browserSync.stream())
  );
}

// Compil all JS files into dist
async function distJS() {
  return gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
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
}

exports.message = message;
exports.distHtml = distHtml;
exports.style = distStyle;
exports.distJS = distJS;
exports.watch = watch;
