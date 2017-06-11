var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');
var imagemin = require('imagemin');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminPngquant = require('imagemin-pngquant');

gulp.task('scss',function(){
   gulp.src("./scss/**/*.scss")
       .pipe(sass())
       .on('error', sass.logError)
       .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
       .pipe(gulp.dest("./css/"))
       .pipe(connect.reload());
});

gulp.task('html',function(){
   gulp.src("*.html")
       .pipe(connect.reload());
});

gulp.task('connect',function() {
  connect.server({
    livereload: true
  });
});

gulp.task('minify-css',function() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('scss:watch',function(){
	gulp.watch("./scss/**/*.scss", ["scss"])
	gulp.watch("*.html", ["html"])
});

gulp.task('img',function() {
	imagemin(['img/*.{jpg,png}'], 'dist/img', {
		plugins: [
			imageminJpegtran(),
			imageminPngquant({quality: '65-80'})
		]
	});
});

gulp.task('default', ['connect', 'scss:watch','html','img']);