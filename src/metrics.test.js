const { start, collect, get } = require("./metrics");

describe("Metrics", () => {
  it("should throw error on invalid url", () => {
    expect(() => {
      get("invalid-url");
    }).toThrow("Invalid URL");
  });

  it("should add new website", () => {
    const website = {
      name: "test",
      url: "test-url",
      rawSize: 10,
    };

    start(website);

    expect(get("test-url")).toStrictEqual({
      name: "test",
      url: "test-url",
      raw: [],
    });
  });

  it("should collect metric", () => {
    const website = {
      name: "test-collect",
      url: "test-url-collect",
      rawSize: 10,
    };

    start(website);

    collect(website, true, 10);

    expect(get("test-url-collect").raw).toHaveLength(1);
  });

  it("should not overflow buffer", () => {
    const website = {
      name: "test-overflow",
      url: "test-url-overflow",
      rawSize: 2,
    };

    start(website);

    collect(website, true, 10);
    collect(website, true, 10);
    collect(website, true, 10);
    collect(website, true, 10);

    expect(get("test-url-overflow").raw).toHaveLength(2);
  });
});
