var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("sass", function() {
	return gulp.src("./index.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./"))
});

gulp.task("watch", function() {
	var sassWatch = gulp.watch("./index.scss", ["sass"])
	sassWatch.on("change", function (event) {
		console.log("Event '"+ event.type + "' detected on " + event.path + ". Running sass.");
	});
});
