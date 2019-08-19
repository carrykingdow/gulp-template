var gulp = require('gulp'),
    Config = require('./gulpfile.config'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
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

    // js task
    gulp.task('convertJs:dev', function() {
        gulp.src(Config.js.src)
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(livereload());

    });

    //css task
    gulp.task('convertCss:dev', function() {
        //postcss plugin
        var plugins = [
            autoprefixer({ browsers: ['last 3 version'], cascade: false })
        ];
        gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(livereload());
    });

    //html task
    gulp.task('convertHtml:dev', function() {
        gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist))
            .pipe(livereload());

    });


    //img task
    gulp.task('convertImg:dev', function() {
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


    gulp.task('dev', ['webserver', 'convertHtml:dev', 'convertJs:dev', 'convertImg:dev', 'copylib:dev', 'convertCss:dev'], function() {
        livereload.listen();
        gulp.watch(Config.js.src, ['convertJs:dev']); //监听js文件
        gulp.watch(Config.sass.src, ['convertCss:dev']); //监听 css
        gulp.watch(Config.html.src, ['convertHtml:dev']); //监听html
        gulp.watch(Config.img.src, ['convertImg:dev']); //监听img
        gulp.watch(Config.lib.src, ['copylib:dev']); //监听lib
        console.log("--------开发环境包打包完成------------")
    });

}

//======= gulp dev 开发环境下 ===============
module.exports = dev;