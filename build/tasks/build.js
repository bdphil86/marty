var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var ts = require('gulp-typescript');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

gulp.task('typescript', () => {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      module: "amd"
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task("transpile", () => {
  return gulp.src(["dist/idhsm.js", "dist/stoplight.js", "dist/test.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['minify-es2015']
    }))
    .pipe(concat("example.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

// Basic usage 
gulp.task('build:example', ['typescript', 'transpile'], () => {
  gulp.src(["dist/marty.js", "dist/stoplight.js", "dist/test.js"])
    .pipe(gulpWebpack({
      output: {
        filename: 'example.js'
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()]
    }, webpack))
    .pipe(gulp.dest('dist'));
});

// Basic usage 
gulp.task('build', ['typescript', 'transpile', 'build:example'], () => {
  gulp.src(["dist/marty.js"])
    .pipe(gulpWebpack({
      output: {
        filename: 'marty.js'
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()]
    }, webpack))
    .pipe(gulp.dest('dist'));
});