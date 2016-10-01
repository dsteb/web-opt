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

gulp.task('serve', function() {
	browserSync({
		port: portVal,
		open: false,
		server: {
			baseDIr: ''
		}
	});
});

gulp.task('ngrok-url', function(cb) {
	return ngrok.connect(portVal, function(err, url) {
		site = url.replace('https', 'http');
		console.log('serving your tunnel from: ' + site);
		cb();
	});
});

gulp.task('psi-desktop', function(cb) {
	console.log('Start PageSpeed Insight with ' + site)
	psi.output(site, {
		nokey: 'true',
		strategy: 'desktop',
		threshold: 90
	}, cb);
});

gulp.task('psi-mobile', function(cb) {
	psi.output(site, {
		nokey: 'true',
		strategy: 'mobile',
		threshold: 90
	}, cb);
});

gulp.task('psi-seq', function(cb) {
	return sequence(
		'images',
		'serve',
		'ngrok-url',
		'psi-desktop',
		'psi-mobile',
		cb
	);
});

gulp.task('psi-desktop-seq', function(cb) {
	return sequence(
		'images',
		'serve',
		'ngrok-url',
		'psi-desktop',
		cb
	);
});

gulp.task('psi-mobile-seq', function(cb) {
	return sequence(
		'images',
		'serve',
		'ngrok-url',
		'psi-mobile',
		cb
	);
});


gulp.task('images', function() {
	return [
		gulp.src('img/profilepic.jpg')
		.pipe(imageResize({
			quality: 0.7,
			imageMagick: true
		}))
		.pipe(gulp.dest('img/auto')),

		gulp.src('views/images/pizzeria.jpg')
			.pipe(imageResize({
				quality: 0.7,
				imageMagick: true
			}))
			.pipe(gulp.dest('views/images/auto')),

		gulp.src('views/images/pizzeria.jpg')
			.pipe(imageResize({
				quality: 0.7,
				width: 100,
				imageMagick: true
			}))
			.pipe(rename(function(path) { path.basename += '-100w'}))
			.pipe(gulp.dest('views/images/auto'))
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

