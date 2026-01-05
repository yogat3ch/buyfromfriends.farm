const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const header = require("gulp-header");
const rename = require("gulp-rename");
const jshint = require("gulp-jshint");
const del = require("del");

const paths = {
  scss: "./src/css/custom.scss",
  tailwind: "./src/css/tailwind.css",
  js: "./src/js/*.js",
  temp: "./src/temp",
  dist: "./dist"
};

const banner = `/**
 * Build Date: ${new Date().toLocaleString()}
 */\n`;

// 1. Compile SCSS to CSS in temp folder
function compileScss() {
  return src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(paths.temp));
}

// 2. Process Tailwind CSS to temp folder
function processTailwind() {
  return src(paths.tailwind)
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(rename({ suffix: ".temp" }))
    .pipe(dest(paths.temp));
}

// 3. Concatenate custom.css (from SCSS) and tailwind.temp.css
function concatStyles() {
    // Note: custom.css is produced by compileScss
    return src([`${paths.temp}/custom.css`, `${paths.temp}/tailwind.temp.css`], { allowEmpty: true })
        .pipe(concat("custom.css"))
        .pipe(dest(paths.temp));
}

// 4. Delete temporary/concatenated files as requested (logic clarification: deleting original custom.css after merge)
// The instructions say: "The @custom.css file should be deleted after it is concatenated with the @tailwind.css file."
// I will delete tailwind.temp.css after concatenation to keep temp clean.
function cleanTempStyles() {
    return del([`${paths.temp}/tailwind.temp.css`]);
}

// 5. Minify CSS and save to dist/css
function minifyStyles() {
    return src(`${paths.temp}/custom.css`, { allowEmpty: true })
        .pipe(postcss([cssnano()]))
        .pipe(header(banner))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(`${paths.dist}/css`));
}

// 6. Lint and Concatenate JS to temp folder
function processScripts() {
    return src(paths.js, { allowEmpty: true })
        .pipe(jshint({ esversion: 6 }))
        .pipe(jshint.reporter("default"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(concat("custom.js"))
        .pipe(dest(paths.temp));
}

// 7. Minify JS and save to dist/js
function minifyScripts() {
    return src(`${paths.temp}/custom.js`, { allowEmpty: true })
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(`${paths.dist}/js`));
}

// Task 1: Compile - All steps prior to minification
const compile = series(
    parallel(compileScss, processTailwind, processScripts),
    concatStyles,
    cleanTempStyles
);

// Task 2: Minify - Minification steps
const minify = parallel(minifyStyles, minifyScripts);

// Task 3: Build - All steps
const build = series(compile, minify);

// Watch task
function watchFiles() {
    watch(["./src/css/**/*", "./src/js/**/*", "./src/html/**/*"], build);
}

// Export tasks
exports.compile = compile;
exports.minify = minify;
exports.build = build;
exports.watch = watchFiles;
exports.default = build;
