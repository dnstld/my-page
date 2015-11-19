var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	deleteLines = require("gulp-delete-lines"),
	insertLines = require("gulp-insert-lines"),
	connect = require("gulp-connect-php"),

	// scripts
	jquery = "vendor/jquery/dist/jquery.js",
	slickCarousel = "vendor/slick-carousel/slick/slick.js",
	jqueryValidate = "vendor/jquery-validation/dist/jquery.validate.js",
	mainJs = "dev/js/main.js";

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(minify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(reload({
			stream: true
		}))
});

gulp.task("scripts", function() {
	gulp.src([
			jquery,
			slickCarousel,
			jqueryValidate,
			mainJs
		])
		.pipe(plumber())
		.pipe(concat("main.js"))
		.pipe(uglify().on("error", function() {
			console.log(err);
		}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/js/"))
		.pipe(reload({
			stream: true
		}))
});

gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "./",
			directory: true,
			browser: "google chrome"
		},
		files: [
			"index.html",
			"dev/less/**/*.less",
			"dev/js/main.js",
			"php/*php"
		]
	});
});

gulp.task("connect", function() {
	connect.server({
		root: "php",
	    base: 'http://localhost',
	    port: 3000,
	    livereload: true
	});
});

gulp.task("production", function() {
	gulp.src("index.html")
		.pipe(plumber())
		.pipe(deleteLines({
			"filters": [
				/<link\s+rel=/i
			]
		}))
		.pipe(insertLines({
			"before": /<\/head>$/,
			"lineBefore": '        <link rel="stylesheet" type="text/css" href="dist/css/main.min.css">',
	    }))
		.pipe(deleteLines({
			"filters": [
				/<script\s+src=/i
			]
		}))
	    .pipe(insertLines({
			"before": /<\/body>$/,
			"lineBefore": '        <script src="dist/js/main.min.js"></script>'
	    }))
		.pipe(rename({
			suffix: ".production"
		}))
		.pipe(gulp.dest("./"))
});

gulp.task("default", ["compile-less", "scripts", "connect", "browserSync"]);