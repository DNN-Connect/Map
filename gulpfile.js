var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('js/src/map.js')
        .pipe(browserify({ transform: 'reactify', ignore: 'react'  }))
        .pipe(gulp.dest('js/'));
});

// watch files for live reload
gulp.task('watch', function() {
    //gulp.watch('app/dist/js/*.js', ['js']);
    //gulp.watch('app/index.html', ['html']);
    gulp.watch('js/src/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);
