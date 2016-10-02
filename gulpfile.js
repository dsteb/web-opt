'use strict';

var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var ngrok = require('ngrok');
var psi = require('psi');
var site = '';
var portVal = 8000;
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var fs = require('fs');
var clean = require('gulp-clean');
var htmlmin = require('gulp-html-minifier');
var uglifycss = require('gulp-uglifycss');

gulp.task('serve', function() {
	browserSync({
		port: portVal,
		open: false,
		server: {
			baseDir: 'build'
		}
	});
});

gulp.task('clean', function() {
	return gulp.src(['build', 'tmp'], {read: false}).pipe(clean());
});

gulp.task('copy', function() {
	return gulp.src(['./**/*', '!index.html', '!node_modules', '!node_modules/**', '!gulpfile.js', '!LICENSE', '!package.json', '!build', '!build/**'])
		.pipe(gulp.dest('build'));
});

gulp.task('minify-css', function() {
	return gulp.src('css/style.css')
		.pipe(uglifycss({
			maxLineLen: 80,
			uglyComments: true
		}))
		.pipe(gulp.dest('tmp'));
});

gulp.task('inline-css', function() {
	var regexp = new RegExp('<link href="css/style.css"[^>]*>', 'g');
	return gulp.src('index.html')
		.pipe(replace(regexp, function(s) {
			var style = fs.readFileSync('tmp/style.css', 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest('tmp'));
});

gulp.task('minify-html', function() {
	return gulp.src('tmp/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('ngrok-url', function(cb) {
	return ngrok.connect(portVal, function(err, url) {
		site = url.replace('https', 'http');
		console.log('serving your tunnel from: ' + site);
		cb();
	});
});

gulp.task('psi-desktop', function(cb) {
	console.log('Start Desktop PageSpeed Insight with ' + site);
	psi(site, {
		nokey: 'true',
		strategy: 'desktop',
		threshold: 90
	}, cb);
});

gulp.task('psi-mobile', function(cb) {
	console.log('Start Mobile PageSpeed Insight with ' + site);
	psi(site, {
		nokey: 'true',
		strategy: 'mobile',
		threshold: 90
	}, cb);
});

gulp.task('psi-seq', function(cb) {
	return sequence(
		'clean',
		'copy',
		'images',
		'minify-css',
		'inline-css',
		'minify-html',
		'serve',
		'ngrok-url',
		'psi-desktop',
		'psi-mobile',
		cb
	);
});

gulp.task('psi-desktop-seq', function(cb) {
	return sequence(
		'clean',
		'copy',
		'images',
		'minify-css',
		'inline-css',
		'minify-html',
		'serve',
		'ngrok-url',
		'psi-desktop',
		cb
	);
});

gulp.task('psi-mobile-seq', function(cb) {
	return sequence(
		'clean',
		'copy',
		'images',
		'minify-css',
		'inline-css',
		'minify-html',
		'serve',
		'ngrok-url',
		'psi-mobile',
		cb
	);
});


gulp.task('images', function() {
	return [
		gulp.src('/img/profilepic.jpg')
		.pipe(imageResize({
			quality: 0.7,
			imageMagick: true
		}))
		.pipe(gulp.dest('build/img/')),

		gulp.src('views/images/pizzeria.jpg')
			.pipe(imageResize({
				quality: 0.7,
				imageMagick: true
			}))
			.pipe(gulp.dest('build/views/images')),

		gulp.src('views/images/pizzeria.jpg')
			.pipe(imageResize({
				quality: 0.7,
				width: 100,
				imageMagick: true
			}))
			.pipe(rename(function(path) { path.basename += '-100w'}))
			.pipe(gulp.dest('build/views/images'))
	];
});

gulp.task('desktop', ['psi-desktop-seq'], function() {
	process.exit();
});

gulp.task('mobile', ['psi-mobile-seq'], function() {
	process.exit();
});

gulp.task('default', ['psi-seq'], function() {
	process.exit();
});

