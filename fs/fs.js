const { writeFileSync } = require("fs");
const path = require("path");

function writeTmpFile() {
  writeFileSync(
    path.resolve(process.cwd(), "tmp.txt"),
    "hello, world!",
    "utf-8"
  );
}

function writeTmpSpecificFile(contents) {
  writeFileSync(
    path.resolve(process.cwd(), "tmp-specific.txt"),
    contents,
    "utf-8"
  );
}

module.exports = {
  writeTmpFile,
  writeTmpSpecificFile,
};
