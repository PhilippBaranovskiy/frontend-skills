var gulp = require('gulp');
var pump = require('pump');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('js', function (cb) {
	pump([
			gulp.src([
				'bower_components/google-page-speed-scores/google-page-speed-scores.package.min.js',
				'src/js/*.js'
			]),
			uglify(),
			concat('app.min.js'),
			gulp.dest('assets/js')
		],
		cb
	);
});
gulp.task('css', function (cb) {
	pump([
			gulp.src([
				'bower_components/skeleton/css/normalize.css',
				'bower_components/skeleton/css/skeleton.css',
				'src/css/*.css'
			]),
			cleanCSS(),
			concat('app.min.css'),
			gulp.dest('assets/css')
		],
		cb
	);
});

gulp.task('default', [
	'js',
	'css'
]);