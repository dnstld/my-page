var gulp = require("gulp"),
	less = require("gulp-less");

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(less())
		.pipe(gulp.dest("dist/css"))
});

gulp.task("default", ["compile-less"]);