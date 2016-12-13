"use strict";

require("babel-register");

const gulp = require("gulp");

require('require-dir')('build/tasks');

gulp.task('default', ['build']);