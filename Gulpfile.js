var gulp = require('gulp');

gulp.task('static', function() {
  return gulp.src(['./static/**/*', './static/**/.*'])
    .pipe(gulp.dest('./dist'));
});
gulp.task('bower', function() {
	return gulp.src(['./bower_components/ember/ember.min.js', 
					'./bower_components/jquery/dist/jquery.min.js'])
	.pipe(gulp.dest('./dist'));
});

gulp.task('build', [ 'static', 'bower' ]);
