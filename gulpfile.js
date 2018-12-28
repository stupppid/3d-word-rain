const gulp = require('gulp')
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

// babel
gulp.task('babel', async function () {
  await gulp.src('js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
})

// browserify
gulp.task('browserify', function () {
  return browserify({
    entries: 'dist/js/index.js'
  }).bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('watch', function () {
  return gulp.watch('js/*.js', gulp.series('babel'))
})

gulp.task('default', gulp.series('babel', 'browserify', 'watch'))
