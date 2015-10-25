var fileinclude = require('gulp-file-include'),
  markdown = require('marked'),
  gulp = require('gulp');

gulp.task('compile', function() {
  markdown.setOptions({
    langPrefix: 'hljs '
  });
  gulp.src(['docsrc/*.html'])
    .pipe(fileinclude({
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('docsrc/*.*', ['compile']);
});
