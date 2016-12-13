const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');

gulp.task('test', ['build'], () => {
    gulp.src('dist/**/*[Ss]pec.js')
        .pipe(jasmine());
});