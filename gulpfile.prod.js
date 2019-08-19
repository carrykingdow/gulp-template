var gulp = require('gulp'),
    Config = require('./gulpfile.config.js'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    gulpSequence = require('gulp-sequence'),
    imagemin = require('gulp-imagemin');
// 开发环境下
function prod() {

    // 清空dist
    gulp.task('clean', function(cb) {
        return del(['./rev', Config.dist_files], cb);
    });
    // js task
    gulp.task('convertJs', function() {
        return gulp.src(Config.js.src)
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify()) //压缩
            .pipe(rev())
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/js'))

    });

    //css task
    gulp.task('convertCss', function() {
        //postcss plugin
        var plugins = [
            autoprefixer({ browsers: ['last 3 version'], cascade: false })
        ];
        return gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
            .pipe(minifyCss())
            .pipe(rev())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/css'))
    });



    //html task
    gulp.task('convertHtml', ['convertJs', 'convertCss'], function() {
        return gulp.src(["./rev/**/*.json", Config.html.src])
            //执行文件内引用名的替换
            .pipe(revCollector({
                replaceReved: true
            }))
            .pipe(gulp.dest(Config.html.dist))
    });


    //img task
    gulp.task('convertImg', function() {
        gulp.src(Config.img.src)
            .pipe(imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]))
            .pipe(gulp.dest(Config.img.dist))
    })


    // copy lib下的所有文件
    gulp.task('copylib', function() {
        gulp.src(Config.lib.src)
        .pipe(gulp.dest(Config.lib.dist))
    })
    gulp.task('build', ['convertJs', 'convertImg', 'copylib', 'convertCss'], function() {
        gulp.start('convertHtml');
        console.log("生产环境包 打包完成！")
    });

}

//======= gulp prod 开发环境下 ===============
module.exports = prod;