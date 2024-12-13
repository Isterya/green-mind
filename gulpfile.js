/* 
  Build gulp without minification. For easy development without minification of production code.
  Most often used for submitting school projects.
*/

const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('icons', function () {
  return gulp
    .src('src/icons/**/*')
    .pipe(gulp.dest('dist/icons'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp
    .src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
  gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
  gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});

gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'server',
    'styles',
    'scripts',
    'icons',
    'html',
    'images'
  )
);
