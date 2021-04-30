const mock = require("mock-fs");
const path = require("path");
const faker = require("faker");
const { readFileSync } = require("fs");
const { writeTmpFile, writeTmpSpecificFile } = require("./index");

beforeEach(() => {
  mock({
    "tmp.txt": "",
    "tmp-specific.txt": "",
  });
});
afterEach(() => {
  mock.restore();
});

describe("writing tmp files from index", () => {
  test("writeTmpFile expects to output world world text file", () => {
    const target = path.resolve(process.cwd(), "tmp.txt");
    const tmpFile = () => readFileSync(target, "utf-8");

    expect(tmpFile()).toEqual("");

    writeTmpFile();
    const fileContents = tmpFile();
    expect(fileContents).toEqual("hello, world!");
  });

  test("writeTmpSpecificFile output remains consistent", () => {
    const target = path.resolve(process.cwd(), "tmp-specific.txt");
    const tmpFile = () => readFileSync(target, "utf-8");

    expect(tmpFile()).toEqual("");
    const contents = faker.lorem.paragraphs(10);

    writeTmpSpecificFile(contents);
    const fileContents = tmpFile();
    expect(fileContents).toEqual(contents);
  });

  test("writeTmpSpecificFile output matches specific snapshot", () => {
    const target = path.resolve(process.cwd(), "tmp-specific.txt");
    const tmpFile = () => readFileSync(target, "utf-8");

    faker.seed(123);
    const contents = faker.lorem.paragraphs(10);

    writeTmpSpecificFile(contents);
    const fileContents = tmpFile();

    // ensure snapshot is not mocked
    mock.restore();

    expect(fileContents).toMatchSnapshot();
  });
});
