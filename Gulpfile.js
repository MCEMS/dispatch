var gulp = require('gulp');

gulp.task('static', function() {
  return gulp.src(['./static/**/*', './static/**/.*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', [ 'static' ]);
