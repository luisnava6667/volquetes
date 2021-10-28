const { src, dest, watch, series, parallel } = require('gulp');
//SCSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
//Imagenes
const imagemin = require('gulp-imagemin');



function css(done){
    //compilar sass
    src('src/scss/app.scss')
         .pipe(sourcemaps.init())
         .pipe(sass())
         .pipe(postcss([autoprefixer(), cssnano()]))
         .pipe(sourcemaps.write('.'))
         .pipe(dest('build/css'))
    
    done();
}
function imagenes(done){
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    
    done();
}

function dev(){
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;

exports.default = series( css, dev);

//series inicia y finaliza 
//parallel inicia todas al mismo tiempo 
