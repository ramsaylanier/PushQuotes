var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');


var paths = {
	sass: ['../packages/pushquotes-theme/assets/scss/**/*.scss']
}

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4'))
        .pipe(gulp.dest('../client/assets/css'))
});

gulp.task('default', ['sass'], function () {
    gulp.watch(paths.sass, ['sass']);
});