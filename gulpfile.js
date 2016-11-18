var gulp = require('gulp');
var pump = require('pump');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function (cb) {
	pump([
			gulp.src([
				'bower_components/google-page-speed-scores/google-page-speed-scores.package.min.js',
				'src/js/fetch-all.js'
			]),
			uglify(),
			concat('app.min.js'),
			gulp.dest('assets/js')
		],
		cb
	);
});

gulp.task('default', [
	'build'
]);