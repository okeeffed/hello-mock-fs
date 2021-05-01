const mock = require("mock-fs");
const { generateFakerUtils } = require("./generator");
const path = require("path");
const fs = require("fs");

beforeEach(() => {
  mock({
    generator: {
      "example.ejs": mock.load(path.resolve(__dirname, "./example.ejs"), {
        lazy: false,
      }),
    },
    "fakerUtil.js": "",
    node_modules: mock.load(path.resolve(__dirname, "../node_modules")),
  });
});
afterEach(() => {
  mock.restore();
});

describe("generating a js file", () => {
  test("file output matches specific snapshot", () => {
    generateFakerUtils();
    const fileContents = fs.readFileSync(
      path.join(__dirname, "../fakerUtil.js"),
      "utf-8"
    );

    // ensure snapshot is not mocked
    mock.restore();

    expect(fileContents).toMatchSnapshot();
  });
});
