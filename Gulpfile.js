var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-htmlmin');
var minifyCss = require('gulp-cssnano');
var sass = require('gulp-sass');

gulp.task('static', function() {
  return gulp.src(['./static/**/*', './static/**/.*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('compileJsx', function() {
	return gulp.src([
		'src/jsx/CheckboxInput.jsx',
		'src/jsx/LongTextInput.jsx',
		'src/jsx/TextInput.jsx',
		'src/jsx/SelectInput.jsx',
		'src/jsx/ErrorMessage.jsx',
		'src/jsx/FlashMessage.jsx',
		'src/jsx/LoginPage.jsx',
		'src/jsx/UnitResponse.jsx',
		'src/jsx/AlertRow.jsx',
		'src/jsx/AlertTable.jsx',
		'src/jsx/AlertPage.jsx',
		'src/jsx/Application.jsx'
	]).pipe(babel())
		.pipe(concat('jsx.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('minifyJs', [ 'concatJs' ], function() {
	return gulp.src('dist/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('concatJs', [ 'compileJsx', 'bower' ], function() {
	return gulp.src([
		'src/js/*',
		'build/react.js',
		'build/react-dom.js',
		'build/jsx.js'
	]).pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
	return gulp.src([
		'./bower_components/react/react.js',
		'./bower_components/react/react-dom.js',
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

gulp.task('minifyCss', [ 'bower', 'sass' ], function() {
	return gulp.src([
    'build/primer.css',
    'build/customcss/**/*.css'
  ])
		.pipe(concat('app.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/customcss'));
});

gulp.task('build', [ 'static', 'minifyJs', 'minifyHtml', 'minifyCss' ]);

gulp.task('buildDev', [ 'static', 'concatJs', 'minifyHtml', 'minifyCss' ]);
