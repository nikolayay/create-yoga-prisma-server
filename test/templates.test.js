const shell = require("shelljs");
const run = require("../index");

afterAll(() => {
  shell.cd("..");
  shell.rm("-rf", "backend");
});

test("Config files generated correctly", () => {
  const src = shell
    .find(".")
    .filter(file => file.match(/^.*\.env.*$|^.*\.yml.*$|^.*\.prisma.*$|/));
  expect(src).toEqual(
    expect.arrayContaining([
      ".env",
      ".graphqlconfig.yml",
      "datamodel.prisma",
      "prisma.yml"
    ])
  );
});

test("Server files generated correctly", () => {
  const src = shell.find("src").filter(file => file.match(/^.+\.[a-z]+/));
  expect(src).toEqual(
    expect.arrayContaining([
      "src/createServer.js",
      "src/db.js",
      "src/index.js",
      "src/schema.graphql"
    ])
  );
});

test("Resolver files generated correctly", () => {
  // ignore the folders that return
  const src = shell.find("src").filter(file => file.match(/^.+\.[a-z]+/));
  expect(src).toEqual(
    expect.arrayContaining([
      "src/resolvers/Query.js",
      "src/resolvers/Mutation.js"
    ])
  );
});

test("Folder structure generated correcrly", () => {
  //   await createNewApp();
  const src = shell
    .find("src")
    .filter(file => file === "src" || file === "src/resolvers");
  expect(src).toEqual(expect.arrayContaining(["src", "src/resolvers"]));
});
