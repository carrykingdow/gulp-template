var gulp = require('gulp'),
    Config = require('./gulpfile.config'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect');

// 开发环境下
function dev() {
    // 清空dist
    gulp.task('clean', function(cb) {
        return del(['./rev', Config.dist_files], cb);
    });

    //web服务器
    gulp.task('webserver', function() {
        connect.server({ livereload: true });
    });

    // 压缩js
    gulp.task('uglifyRename:dev', function() {
        gulp.src(Config.js.src)
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(concat("all.js"))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(livereload());

    });

    //编译sass并且压缩
    gulp.task('sass2css:dev', function() {
        //postcss plugin
        var plugins = [
            autoprefixer({ browsers: ['last 3 version'], cascade: false })
        ];
        gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(concat("all.css"))
            .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(livereload());
    });

    //copy html 文件
    gulp.task('copyHtml:dev', function() {
        gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist))
            .pipe(livereload());

    });


    //copy img 文件
    gulp.task('copyImg:dev', function() {
        gulp.src(Config.img.src)
            .pipe(gulp.dest(Config.img.dist))
            .pipe(livereload());

    })


    // copy lib下的所有文件
    gulp.task('copylib:dev', function() {
        gulp.src(Config.lib.src)
            .pipe(gulp.dest(Config.lib.dist))
            .pipe(livereload());

    })


    gulp.task('dev', ['webserver', 'copyHtml:dev', 'uglifyRename:dev', 'copyImg:dev', 'copylib:dev', 'sass2css:dev'], function() {
        livereload.listen();
        gulp.watch(Config.js.src, ['uglifyRename:dev']); //监听js文件
        gulp.watch(Config.sass.src, ['sass2css:dev']); //监听 css
        gulp.watch(Config.html.src, ['copyHtml:dev']); //监听html
        gulp.watch(Config.img.src, ['copyImg:dev']); //监听img
        gulp.watch(Config.lib.src, ['copylib:dev']); //监听lib
        console.log("--------开发环境包打包完成------------")
    });

}

//======= gulp dev 开发环境下 ===============
module.exports = dev;