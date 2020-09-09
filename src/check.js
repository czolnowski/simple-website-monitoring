const axios = require("axios");
const { collect } = require("./metrics");

const evaluateExpectedBody = (bodyShouldContains, body) =>
  bodyShouldContains
    .map((expectedBody) => body.includes(expectedBody))
    .filter(Boolean).length === bodyShouldContains.length;

const evaluateStatus = (website, status, responseTime, body) => {
  if (website.expectedStatus !== status) {
    return false;
  }

  if (responseTime > website.responseTimeLowerThan) {
    return false;
  }

  if (body.length < 1) {
    return false;
  }

  return evaluateExpectedBody(website.bodyShouldContains, body);
};

const check = (website) => {
  return setTimeout(() => {
    const startTime = new Date().getTime();

    axios({
      method: "get",
      url: website.url,
    })
      .then((response) => {
        const responseTime = new Date().getTime() - startTime;

        collect(
          website,
          evaluateStatus(website, response.status, responseTime, response.data),
          responseTime
        );

        check(website);
      })
      .catch((err) => {
        const responseTime = new Date().getTime() - startTime;

        collect(website, false, responseTime);

        check(website);

        console.warn(err); // eslint-disable-line no-console
      });
  }, website.interval);
};

module.exports = { check, evaluateStatus };
