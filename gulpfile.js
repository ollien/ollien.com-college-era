var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var gulpif = require("gulp-if");
var clean_css = require("gulp-clean-css");
var yargs = require("yargs");

gulp.task("default", ["sass"]);

//Write scss to file. Use prod flog to minify css, or the dest flag to set the destination of the build
gulp.task("sass", function() {
	let dest = yargs.argv.hasOwnProperty("dest") ? yargs.argv.dest : "./";
	return gulp.src("./index.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: [
				"last 2 versions",
				"ie >= 11"
			],
			cascade: false
		}))
		.pipe(gulpif(yargs.argv.hasOwnProperty("prod"), clean_css()))
		.pipe(gulp.dest(dest));
});

gulp.task("watch", function() {
	var sassWatch = gulp.watch("./index.scss", ["sass"])
	sassWatch.on("change", function (event) {
		console.log("Event '"+ event.type + "' detected on " + event.path + ". Running sass.");
	});
});
