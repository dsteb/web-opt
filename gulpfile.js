'use strict';

var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var ngrok = require('ngrok');
var psi = require('psi');
var site = '';
var portVal = 8000;

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
		'serve',
		'ngrok-url',
		'psi-desktop',
		'psi-mobile',
		cb
	);
});

gulp.task('psi-desktop-seq', function(cb) {
	return sequence(
		'serve',
		'ngrok-url',
		'psi-desktop',
		cb
	);
});

gulp.task('psi-mobile-seq', function(cb) {
	return sequence(
		'serve',
		'ngrok-url',
		'psi-mobile',--
		cb
	);
});

gulp.task('psi', ['psi-seq'], function() {
	process.exit();
});

gulp.task('desktop', ['psi-desktop-seq'], function() {
	process.exit();
});

gulp.task('mobile', ['psi-mobile-seq'], function() {
	process.exit();
});

gulp.task('default', ['desktop'], function() {
	console.log('starting')
});

