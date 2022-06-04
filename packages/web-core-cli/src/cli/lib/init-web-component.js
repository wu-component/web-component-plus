const path = require("path");
const join = path.join;
const basename = path.basename;
const fs = require("fs");
const vfs = require("vinyl-fs");
const renameSync = fs.renameSync;
const existsSync = fs.existsSync;
const chalk = require("chalk");
const through = require("through2");
const emptyDir = require("empty-dir");
const info = require("../utils/logger").info;
const error = require("../utils/logger").error;
const success = require("../utils/logger").success;
const isCnFun = require("../utils/utils").isCnFuc;
const isSafeToCreateProjectIn = require("../utils/utils").isSafeToCreateProjectIn;

function init(args) {
  const tCli = chalk.bold.cyan("t-cli");
  const isCn = isCnFun(args.language);
  const customPrjName = args.project || "";
  const tpl = join(__dirname, "../template/webComponent");
  const dest = join(process.cwd(), customPrjName);
  const componentName = basename(dest);
  const mirror = args.mirror;

  console.log();
  console.log(tCli + (!isCn ? " is booting... " : " 正在启动..."));
  console.log(
    tCli +
    (!isCn ? " will execute init command... " : " 即将执行 init 命令...")
  );
  if (existsSync(dest) && !emptyDir.sync(dest)) {
    if (!isSafeToCreateProjectIn(dest, componentName)) {
      process.exit(1);
    }
  }

  createApp();

  function createApp() {
    console.log();
    console.log(
      chalk.bold.cyan("T-Cli") +
      (!isCn
        ? " will creating a new app in "
        : " 即将创建一个新的应用在 ") +
      dest
    );

    vfs
      .src(["**/*", "!node_modules/**/*"], {
        cwd: tpl,
        cwdbase: true,
        dot: true,
      })
      .pipe(template(dest, tpl))
      .pipe(vfs.dest(dest))
      .on("end", function () {
        try {
          // rename gitignore file as .gitignore if `gitignore` exist
          // (this was actually exist in app-ts-old)
          if (existsSync(join(dest, "gitignore"))) {
            info("Rename", "gitignore -> .gitignore");
            renameSync(join(dest, "gitignore"), join(dest, ".gitignore"));
          }

          if (existsSync(join(dest, "package.json"))) {

            replaceSync(join(dest, "package.json"), {
              files_to_be_replace: 'files',
              counter_to_be_replace: componentName,
            });
          }

          if (customPrjName) {
            try {
              process.chdir(customPrjName);
            } catch (err) {
              console.log(error(err));
            }
          }
          info(
            "Install",
            "We will install dependencies, if you refuse, press ctrl+c to abort, and install dependencies by yourself. :>"
          );
          console.log();
          // require("./install")(mirror, done);
          done()
        } catch (e) {
          console.log(error(e));
        }
      })
      .resume();
  }

  function replaceSync(file, map) {
    let contents = fs.readFileSync(file).toString();
    Object.keys(map).forEach(fromKey => {
      contents = contents.replace(fromKey, map[fromKey]);
      fs.writeFileSync(file, contents);
    })
  }

  function done() {
    success(`Congratulation! "${componentName}" has been created successfully! `);
    console.log();
    console.log();

    console.log("Change directory command:");
    success(`cd ${componentName}`);
    console.log();
    console.log();

    console.log("install:");
    success(`npm install`);
    console.log();
    console.log();
    console.log("Development command:");
    success("npm run dev:package");
    console.log();
    console.log();
    console.log("Release command:");
    success("npm run build:package");
    console.log();
    console.log();
  }
}

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info("Copy", file.path.replace(cwd + "/", ""));
    this.push(file);
    cb();
  });
}

module.exports = init;
