//Include gulp
var gulp = require('gulp');

//Include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('clean-css');
var uglifyjs = require('uglify-js');
var uglify = require('gulp-uglify');
var relateurl = require('relateurl');
var jsonminify = require('gulp-jsonminify');
var minifyCss = require('gulp-minify-css');
var vulcanize = require('gulp-vulcanize');


//JS Hint Task
gulp.task('jshint', function(){
   gulp.src('./app/scripts/*.js')
   .pipe(jshint())
   .pipe(jshint.reporter('default')); 
});

//minify JS
gulp.task('minifyscripts', function(){
   gulp.src(['./app/scripts/*.js'])
   .pipe(uglify())
   .pipe(gulp.dest('./build/scripts/')); 
});

//minify new images
gulp.task('imagemin', function(){
   var imgSrc = './app/images/**/*',
       imgDst = './build/images';
   gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));   
});

//html minifier for index
gulp.task('minifyhtml-index', function(){
    return gulp.src('app/*.html')
    .pipe(htmlmin({
        removeComments: true,
        collapseWhiteSpace: true,
        customAttrAssign: [/\$=/],
        removeTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: false}))
        .pipe(gulp.dest('./build'))
});

//html minifier for elements
gulp.task('minifyhtml-elements', function(){
    return gulp.src('app/elements/*.html')
    .pipe(htmlmin({
        removeComments: true,
        collapseWhiteSpace: true,
        customAttrAssign: [/\$=/],
        removeTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: false}))
        .pipe(gulp.dest('./build/elements'))
});

//Minify json data
gulp.task('minifyjson', function () {
    return gulp.src(['app/data/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./build/data'));
});

//Minify CSS
gulp.task('minifycss', function() {
  return gulp.src('app/styles/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('.build/styles'));
});

//Minify bower_components
gulp.task('minifybower', function(){
   return gulp.src('app/bower_components/*.html')
});

//Default gulp tasks
gulp.task('default', ['imagemin','minifyhtml-index','minifyhtml-elements','minifyjson','minifycss','minifyscripts'], function(){
    //Watch for index.html or test.html changes
    gulp.watch('./app/*.html',function(){
        gulp.run('minifyhtml-index');
    });
    //Watch for any element *.html changes
    gulp.watch('./app/elements/*.html',function(){
        gulp.run('minifyhtml-elements');
    });
    //Watch for JS changes
    gulp.watch('./app/scripts/*.js',function(){
        gulp.run('jshint','minifyscripts');
    });
    //Watch for CSS changes
    gulp.watch('.app/styles/*.css', function(){
        gulp.run('minifycss');
    });
    //Watch for JSON data changes
    gulp.watch('.app/data/*.json', function(){
        gulp.run('minifyjson');
    });
    //Watch for images changes
    gulp.watch('.app/images/*', function(){
        gulp.run('imagemin');
    });
})