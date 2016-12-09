const gulp = require("gulp");
const ts = require("gulp-typescript");
const browerserify = require("gulp-browserify");
const rename = require("gulp-rename");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", () => {
    gulp.watch("src/*.ts", ["ts-compile", "browserify"]);
});

gulp.task("ts-compile", () => {
    return gulp.src("src/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("js/"));
});

gulp.task("browserify", ["ts-compile"], () => {
    return gulp.src("js/index.js")
        .pipe(browerserify())
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("js/"));
});