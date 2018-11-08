#!/usr/bin/env node

const shell = require("shelljs");
const colors = require("colors");
const fs = require("fs"); //fs already comes included with node.
const clean = require("./lib");

const TEMPLATES = require("./templates/templates");
const APP_DIRECTORY = `${process.cwd()}/backend`;
const SCRIPTS = {
  start: "nodemon -e js,graphql -x node src/index.js",
  dev: "nodemon -e js,graphql -x node --inspect src/index.js",
  test: "jest",
  deploy: "prisma deploy --env-file .env"
};

// has config flag
const CONFIG_FILES = Object.keys(TEMPLATES).filter(file =>
  file.match(/config.*/)
);

// has server flag
const SERVER_FILES = Object.keys(TEMPLATES).filter(file =>
  file.match(/server.*/)
);

// has resolver flag
const RESOLVER_FILES = Object.keys(TEMPLATES).filter(file =>
  file.match(/resolver.*/)
);

const writeTemplate = (fileName, path) => {
  fs.writeFile(
    `${APP_DIRECTORY}${path}/${clean(fileName)}`,
    TEMPLATES[fileName],
    err => {
      if (err) {
        return console.log(err);
      }
    }
  );
};

const createNewApp = () => {
  console.log("Building templates...".yellow);

  // Make directory called backend, cd into it for the rest of the script.
  shell.mkdir("-p", `${process.cwd()}/backend`);
  shell.cd(`backend`);
  const folders = ["/src/resolvers"];
  shell.mkdir("-p", folders.map(e => `${APP_DIRECTORY}${e}`));
};

const installPackages = () => {
  packages = [
    "babel-preset-env",
    "bcryptjs",
    "cookie-parser",
    "dotenv",
    "graphql",
    "graphql-cli",
    "graphql-yoga",
    "jsonwebtoken",
    "nodemailer",
    "nodemon",
    "npm-run-all",
    "prisma",
    "prisma-binding"
  ];
  return new Promise(resolve => {
    console.log("Initialising npm...".yellow);
    shell.exec("npm init -y");
    console.log("Installing packages...".yellow);
    shell.exec(
      `npm install --save ${packages.join(" ")}`,
      { silent: false },
      (code, stdout, stderr) => {
        if (code !== 0) {
          console.log(`Fail. Exited the following error:`.red);
          console.log("Program stderr:", stderr);
          resolve(false);
        }
        resolve(true);
      }
    );
  });
};

const updateTemplates = () => {
  console.log("Writing scripts...");
  writeScripts();
  console.log("Updating templates...".yellow);
  return new Promise(resolve => {
    let promises = [];

    // Write custom template files
    Object.keys(TEMPLATES).forEach((fileName, i) => {
      promises[i] = new Promise(() => {
        if (CONFIG_FILES.includes(fileName)) {
          writeTemplate(fileName, "");
        } else if (SERVER_FILES.includes(fileName)) {
          writeTemplate(fileName, "/src");
        } else if (RESOLVER_FILES.includes(fileName)) {
          writeTemplate(fileName, "/src/resolvers");
        }
      });
      Promise.all(promises).then(() => {
        resolve();
      });
    });
  });
};

const writeScripts = () => {
  console.log("Installing dev scripts...".yellow);
  shell.exec(
    `json -I -f package.json -e 'this.scripts=${JSON.stringify(SCRIPTS)}'`,
    {
      silent: false
    }
  );
};

const run = async () => {
  await createNewApp();
  await installPackages();
  await updateTemplates();
};

run();

module.exports = run;
