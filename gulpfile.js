const path = require('path');
//const fs = require('fs');
var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var webpack = require('webpack');
const webpackStream = require('webpack-stream');
const nodeExternals = require('webpack-node-externals');
var nodemon = require('gulp-nodemon');

const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rollup = require('gulp-better-rollup');

//var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create();
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';
const prod = mode === 'production';
var started = false;

const commonModule = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    //presets: ['babel-preset-env'],
                },
            },
        },
    ],
};

/* BACK-END CONFIG */
var backWebpackConfig = {
    mode: "development",
    target : 'node',
    entry: "./server.js",
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "backend.js"
    },
    //watch:true,
    watchOptions : {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    plugins: [
    ],
    module : commonModule,
    target: 'node',
    externals: [nodeExternals()],
}

//===============================================
// Rollup
//===============================================
var frontrollupconfig = {
    //input: 'src/main.js',
    plugins: [
        svelte({
			dev: !dev,
			css: css => {
				css.write('public/bundle.css');
			}
        }),
        resolve(),
		commonjs(),
    ]
}

function frontrollup_build(){
    return gulp.src('src/client/main.js')
    .pipe(rollup(frontrollupconfig, 'umd'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/'));
}
//===============================================
//
//===============================================
function backend_build(){
    return gulp.src('./server.js')
        //.pipe(webpackStream(backWebpackConfig))
        .pipe(webpackStream(backWebpackConfig), webpack)
        .pipe(gulp.dest('./'));
}

async function cleanbundle(done){
    return gulp.src(['public/bundle.js','public/bundle.js.map'], {read: false, allowEmpty:true})
        .pipe(clean());
    //await timeout(5000);
    //return done();
}

function serve(cb){
    return nodemon({
		script: 'backend.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
}

function refreshbrowser(cb){
    browserSync.reload();
    return cb();
}

function watch(done) {
    gulp.watch(['./server.js','./src/server/**/*.*'], gulp.series(backend_build));
    gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontrollup_build, copy_html, copy_css, refreshbrowser));
    return done();
}

function browser_sync(done){
    browserSync.init({
        proxy: "localhost:8080"
        ,files:['pulbic/**/*.*']
        //,browser: 'chrome'
        //,browser: 'firefox'
    });
    return done();
}

function copy_html(){
    return gulp.src('src/client/index.html')
        .pipe(gulp.dest('public/'));
}

function copy_css(){
    return gulp.src('src/client/global.css')
        .pipe(gulp.dest('public/'));
}

exports.copy_html = copy_html;
exports.copy_css = copy_css;

exports.cleanbundle = cleanbundle;
exports.frontrollup_build = frontrollup_build;
exports.backend_build = backend_build;
exports.serve = serve;
exports.refreshbrowser = refreshbrowser;

exports.watch = watch;
exports.browser_sync = browser_sync;

const build = gulp.series(frontrollup_build, backend_build, copy_css, copy_html, watch, serve, browser_sync);

const buildscript = gulp.series( frontrollup_build, backend_build, copy_css, copy_html);
exports.buildscript = buildscript;

/*
 * Export a default task
 */
exports.default  = build;











