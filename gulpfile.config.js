var SRC_DIR = './src/'; // 源文件目录  
var DIST_DIR = './dist/'; // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {
        src: SRC_DIR + 'html/**/*.html',
        dist: DIST_DIR + 'html'
    },
    lib: {
        src: SRC_DIR + 'lib/**/*.*', // lib目录：./src/lib  
        dist: DIST_DIR + 'lib' // lib文件build后存放的目录：./dist/lib  
    },
    sass: {
        src: SRC_DIR + 'sass/**/*.scss', // SASS目录：./src/sass/  
        dist: DIST_DIR + 'css' // SASS文件生成CSS后存放的目录：./dist/css  
    },
    js: {
        src: SRC_DIR + 'js/**/*.js', // JS目录：./src/js/  
        dist: DIST_DIR + 'js', // JS文件build后存放的目录：./dist/js    
    },
    img: {
        src: SRC_DIR + 'img/*.*', // img目录：./src/img/  
        dist: DIST_DIR + 'img' // img文件build后存放的目录：./dist/img  
    }
};

module.exports = Config;