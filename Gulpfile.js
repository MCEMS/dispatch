var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('static', function() {
  return gulp.src(['./static/**/*', './static/**/.*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
	return gulp.src('src/jsx/**/*.jsx')
		.pipe(babel())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
	return gulp.src(['./bower_components/react/react.min.js', 
					'./bower_components/primer-css/css/primer.css'])
	.pipe(gulp.dest('./dist'));
});

gulp.task('build', [ 'static', 'bower', 'js' ]);
