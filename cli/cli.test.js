const faker = require("faker");
const { execSync } = require("child_process");

describe("running the cli", () => {
  describe("without an argument", () => {
    test("returns non-zero code", () => {
      const run = () => execSync(`node cli/cli.js`);
      expect(run).toThrow();
    });

    test("displays useful error message", () => {
      try {
        execSync(`node cli/cli.js`);
      } catch (e) {
        expect(/CLI arg required/g.test(e.output.toString())).toBeTruthy();
      }
    });
  });

  describe("with an argument", () => {
    test("displays first cli argument", () => {
      const output = execSync(`node cli/cli.js hello`);
      expect(/arg: hello/g.test(output.toString())).toBeTruthy();
    });
  });
});
