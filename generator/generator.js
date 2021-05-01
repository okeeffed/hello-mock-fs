const _ = require("lodash");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const prettier = require("prettier");

const values = ["lorem.word", "lorem.words", "database.column"];

function generateFakerUtils() {
  ejs.renderFile(
    path.join(__dirname, "example.ejs"),
    {
      _: _,
      values: values,
    },
    {},
    (err, str) => {
      if (err) {
        throw err;
      }

      const output = prettier.format(str, {
        semi: true,
        parser: "babel",
      });
      fs.writeFileSync(
        path.join(__dirname, "../fakerUtil.js"),
        output,
        "utf-8"
      );
    }
  );
}

module.exports = {
  generateFakerUtils,
};
