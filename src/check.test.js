const { evaluateStatus } = require("./check");

describe("Evaluate status", () => {
  it("should return false on invalid status", () => {
    const website = {
      expectedStatus: 200,
    };

    expect(evaluateStatus(website, 300)).toBeFalsy();
  });

  it("should return false on longer resposne time than expected", () => {
    const website = {
      expectedStatus: 200,
      responseTimeLowerThan: 10,
    };

    expect(evaluateStatus(website, 200, 20)).toBeFalsy();
  });

  it("should return false on empty body", () => {
    const website = {
      expectedStatus: 200,
      responseTimeLowerThan: 10,
    };

    expect(evaluateStatus(website, 200, 20, "")).toBeFalsy();
  });

  it("should return false when body does not contains on of given strings", () => {
    const website = {
      expectedStatus: 200,
      responseTimeLowerThan: 10,
      bodyShouldContains: ["foo", "boo"],
    };

    expect(evaluateStatus(website, 200, 5, "boo")).toBeFalsy();
  });

  it("should return true when all params are matching", () => {
    const website = {
      expectedStatus: 200,
      responseTimeLowerThan: 10,
      bodyShouldContains: ["foo", "boo"],
    };

    expect(evaluateStatus(website, 200, 5, "boo foo")).toBeTruthy();
  });
});
