const spawn = require("cross-spawn");
const ora = require("ora");
const which = require("which");

module.exports = function(mirror, done) {
	let registry,
		resolved,
		pkgtool = "npm";
	mirror = mirror.toLowerCase();
	if (mirror === "yarn" || mirror === "cnpm") {
		try {
			resolved = which.sync(mirror);
			if (resolved) pkgtool = mirror;
		} catch (e) {
			console.log(e);
			return secede(spawn(pkgtool, ["install"], { stdio: "inherit" }), done);
		}
	} else if (mirror !== "default") {
		registry = ["--registry", require("../config/mirror")[mirror]];
	}
	return secede(
		spawn(pkgtool, registry ? [].concat(["install"], registry) : ["install"], {
			stdio: "inherit"
		}), done
	);
};

function secede(line, done) {
	line.on("close", function(code) {
		done && typeof done === 'function' && done();
		process.exit(code);
	});

	line.on("error", function(reason) {
		console.log("An error occured while executing the NPM command.", reason);
	});
}
