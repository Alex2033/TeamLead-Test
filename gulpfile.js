// Подключение пакетов
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
// var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var del = require('del');
var runSequence = require('run-sequence');
var njkRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');

gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server',  function() {
    browserSync.init({
    	server: {baseDir: './build/'}
    });

    gulp.watch('src/nunjucks/**/*.*', gulp.parallel('nunjucks'));
    gulp.watch('src/less/**/*.less', gulp.parallel('less'));
    // gulp.watch('src/scss/**/*.scss', ['scss']);

    gulp.watch('src/js/**/*.js', gulp.parallel('copy:js'));
    gulp.watch('src/libs/**/*.*', gulp.parallel('copy:libs'));
    gulp.watch('src/img/**/*', gulp.parallel('copy:img'));
});

gulp.task('copy:js', function() {
    return gulp.src('src/js/**/*.*')
    	.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('copy:libs', function() {
    return gulp.src('src/libs/**/*.*')
    	.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
});

gulp.task('copy:fonts', function() {
    return gulp.src('src/fonts/**/*.*')
    	.pipe(gulp.dest('./build/fonts'))
		.pipe(browserSync.stream());
});

gulp.task('copy:img', function() {
    return gulp.src('src/img/**/*')
    	.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
});

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
	    .pipe(plumber({
	    	errorHandler: notify.onError(function(err){
	    		return {
	    			title: 'Styles',
	    			message: err.message
	    		}
	    	})
	    }))
	    .pipe(sourcemaps.init())
    	.pipe(less())
    	.pipe( autoprefixer({
    		browsers: ['last 6 versions'],
    		cascade: false
    	}) )
	    .pipe(sourcemaps.write())
    	.pipe(gulp.dest('./build/css'))
    	.pipe(browserSync.stream());
});

// gulp.task('scss', function() {
//     return gulp.src('./src/scss/main.scss')
// 	    .pipe(plumber({
// 	    	errorHandler: notify.onError(function(err){
// 	    		return {
// 	    			title: 'Styles',
// 	    			message: err.message
// 	    		}
// 	    	})
// 	    }))
// 	    .pipe(sourcemaps.init())
// 	    .pipe(scss())
// 	    .pipe( autoprefixer({
// 	    	browsers: ['last 6 versions'],
// 	    	cascade: false
// 	    }))
// 	    .pipe(sourcemaps.write())
// 	    .pipe(gulp.dest('./build/css'))
// 	    .pipe(browserSync.stream());
// });


gulp.task('nunjucks', function() {
	return gulp.src('./src/nunjucks/pages/**/*.njk')
		.pipe(njkRender())
		.pipe(prettify({
			indent_size : 4 // размер отступа - 4 пробела
		})
		.pipe(gulp.dest('./build')))
		.pipe(browserSync.stream());
});


gulp.task('default', gulp.series('clean:build', 'less', 'nunjucks', 'copy:js', 'copy:libs', 'copy:img', 'copy:fonts', 'server'));
