const { check } = require("./check");
const { start } = require("./metrics");

const runningChecks = [];

const isRunning = (website) => {
  return (
    runningChecks.findIndex((element) => {
      return element.url === website.url;
    }) > -1
  );
};

const monitor = (...websites) => {
  websites
    .filter((website) => !isRunning(website))
    .forEach((website) => {
      runningChecks.push(website);

      start(website);

      check(website);
    });
};

module.exports = { monitor };
