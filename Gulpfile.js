var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

gulp.task('static', function() {
  return gulp.src(['./static/**/*', './static/**/.*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('compileJsx', function() {
	return gulp.src('src/jsx/*.jsx')
		.pipe(babel())
		.pipe(concat('jsx.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('minifyJs', [ 'compileJsx', 'bower' ], function() {
	return gulp.src([
		'src/js/*',
		'build/react.min.js',
		'build/jsx.js'
	]).pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
	return gulp.src([
		'./bower_components/react/react.min.js',
		'./bower_components/primer-css/css/primer.css'
	]).pipe(gulp.dest('build'));
});

gulp.task('minifyHtml', function() {
	return gulp.src('src/html/*')
		.pipe(minifyHtml({
			quotes: true,
			empty: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minifyCss', [ 'bower' ], function() {
	return gulp.src('build/primer.css')
		.pipe(concat('app.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist'));
});

gulp.task('build', [ 'static', 'minifyJs', 'minifyHtml', 'minifyCss' ]);
