const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile Sass & Inject into Browser
gulp.task('sass', () => {
  return gulp
    .src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss',
      'src/scss/abstracts/*.scss',
      'src/scss/base/*.scss',
      'src/scss/components/*.scss',
      'src/scss/layout/*.scss',
      'src/scss/pages/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Move JS to src
gulp.task('js', () => {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

//Watch Sass & Serve
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'index.html'
    }
  });
  gulp.watch(
    [
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss',
      'src/scss/abstracts/*.scss',
      'src/scss/base/*.scss',
      'src/scss/components/*.scss',
      'src/scss/layout/*.scss',
      'src/scss/pages/*.scss'
    ],
    ['sass']
  );
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

//Move fonts to src
gulp.task('fonts', () => {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

//Move Font Awesome CSS to src/css
gulp.task('fa', () => {
  return gulp
    .src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
