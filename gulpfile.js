//https://github.com/babel/gulp-babel

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';
const prod = mode === 'production';
var started = false;

//const path = require('path');
//const fs = require('fs');
var gulp = require('gulp');
//var clean = require('gulp-clean'); // outdate
const del = require('del');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rollup = require('gulp-better-rollup');
var browserSync = require('browser-sync').create();
//const babel = require('gulp-babel');

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
    //.pipe(rollup(require('./rollup.config.js'), 'umd'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/'));
}
exports.frontrollup_build = frontrollup_build;
function lib_test(){
    return gulp.src('src/client/gunjstrustsharekey.js')
    //.pipe(rollup(frontrollupconfig, 'umd'))
    //.pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/'));
}
exports.lib_test = lib_test;

//===============================================
//
//===============================================
function backend_build(){
    return gulp.src('./app.js')
		//.pipe(babel({
            //presets: ['@babel/preset-env', { modules: false }],
            //presets: ['@babel/preset-env'],
            //plugins: [
                //["add-module-exports"],
                //["@babel/plugin-syntax-dynamic-import"]
            //]
        //}))
        .pipe(rename('backend.js'))
		.pipe(gulp.dest('./'))
}
exports.backend_build = backend_build;
async function cleanbundle(done){
    //return gulp.src(['public/bundle.js','public/bundle.js.map'], {read: false, allowEmpty:true})
        //.pipe(clean());
    //del
    del.sync([ 'public/bundle.js','public/bundle.js.map','public/gunjstrustsharekey.js' ]);
    return done();
}
exports.cleanbundle = cleanbundle;
function serve(done){
    var stream = nodemon({
        //nodemon: require('nodemon'),
        script: 'backend.js',
        //watch:['src/client'],
        watch:['public/'],
        ext: 'js svelte',
        ignore: ['backend.js','gulpfile.js','rollup.config.js','node_modules/','data/'],
        //tasks: ['cleanscript'],
        done: done,
	}).on('start', function () {
        console.log('===================================');
        console.log('started!');
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			done();
			started = true; 
        } 
        console.log('started END=========!');
    }).on('restart', function () {
        console.log('===================================');
        console.log('restarted!');
        //cleanscript();
        if(browserSync){
            browserSync.reload();
        }
    }).on('crash', function() {
        console.log('===================================');
        console.error('Application has crashed!\n');
        stream.emit('restart', 5);  // restart the server in 5 seconds
    });
    return stream;
}
exports.serve = serve;
function refreshbrowser(cb){
    browserSync.reload();
    return cb();
}
exports.refreshbrowser = refreshbrowser;
function watch(done) {
    gulp.watch(['./server.js','./src/server/**/*.*'], gulp.series(backend_build));
    //gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontrollup_build, lib_test, refreshbrowser));
    gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontrollup_build, lib_test));
    return done();
}
exports.watch = watch;
function browser_sync(done){
    browserSync.init({
        proxy: "localhost:8080"
        ,files:['pulbic/**/*.*']
        //,browser: 'chrome'
        //,browser: 'firefox'
    });
    return done();
}
exports.browser_sync = browser_sync;
function copy_html(){
    return gulp.src('src/client/index.html')
        .pipe(gulp.dest('public/'));
}
exports.copy_html = copy_html;
function copy_css(){
    return gulp.src('src/client/global.css')
        .pipe(gulp.dest('public/'));
}
exports.copy_css = copy_css;
function copy_svg(){
    return gulp.src('src/client/icons/*.svg')
        .pipe(gulp.dest('public/'));
}
exports.copy_svg = copy_svg;

const build = gulp.series(
    frontrollup_build, 
    backend_build, 
    copy_css, copy_html, 
    copy_svg, 
    watch, 
    serve, 
    //browser_sync,
    lib_test
);

const cleanscript = gulp.series(cleanbundle, frontrollup_build, lib_test);
//const cleanscript = gulp.series(cleanbundle);
exports.cleanscript = cleanscript;

const buildscript = gulp.series( frontrollup_build, backend_build, copy_css, copy_svg, copy_html, lib_test);
exports.buildscript = buildscript;

/*
 * Export a default task
 */
exports.default  = build;











