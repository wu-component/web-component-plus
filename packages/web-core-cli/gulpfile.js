const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task("babel", function () {
    return gulp.src("./src/**/*.js")
        .pipe(babel({
            "presets": [
                "@babel/preset-env"
            ],
            "plugins": [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime"
            ]
        }))
        .pipe(gulp.dest("cli_dist"))
})
gulp.task("copy-config", function () {
    return gulp.src(["./src/cli/config/*.json"])
        .pipe(gulp.dest("./cli_dist/cli/config"))
})

gulp.task("copy-template", function () {
    return gulp.src(["./template/**"])
        .pipe(gulp.dest("./cli_dist/cli/template"))
})


gulp.task('default', gulp.series('babel', 'copy-config', 'copy-template'));
