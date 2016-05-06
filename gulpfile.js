var gulp = require("gulp")
var sass = require("gulp-sass")

gulp.task("default", function() {
	gulp.src("./client/sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./client/css"));
})