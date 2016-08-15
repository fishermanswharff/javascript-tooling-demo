'use strict';

let path = require('path'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    browserSync = require('browser-sync').create('chuck norris'),
    sass = require('gulp-ruby-sass'),
    del = require('del'),
    webpack = require('gulp-webpack'),
    babel = require('gulp-babel'),
    historyApiFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload,
    Server = require('karma').Server,
    $ = require('gulp-load-plugins')();

// set variable via $ gulp --type production
let environment = $.util.env.type || 'development';
let isProduction = environment === 'production';
let webpackConfig = require('./webpack.config.js').getConfig(environment);
let port = $.util.env.port || 8080;

let paths = {
  html: 'app/**/*.html',
  styles: '',
  scripts: ['app/js/**/*.jsx', 'app/js/**/*.js'],
  vendors: '',
  tests: '',
  images: '',
  tmp: '',
  destRoot: 'dist',
  destjs: 'dist/js'
};

gulp.task('serve', ['minify-html', 'scripts', 'watch'], () => {
  browserSync.init({
    server: {
      baseDir: paths.destRoot,
      index: 'index.html',
      middleware: [ historyApiFallback() ]
    },
    port: port,
    ui: {
      port: 8081
    }
  });
  gulp.watch(['*.html', 'js/**/*.js', 'js/**/*.jsx'], {cwd: 'app'}, reload);
});

gulp.task('scripts', () => {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(paths.destjs))
    .pipe(reload({ stream: true }))
    .on('error', (err) => {
      console.log('ERROR: ', err.toString(), err.stack);
      this.emit('end');
    })
})

gulp.task('minify-html', () => {
  return gulp.src(paths.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.destRoot));
});

gulp.task('watch', () => {
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(paths.scripts, ['scripts']);
});
