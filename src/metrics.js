const metrics = [];

const computRawSizeForLastThreeDays = (interval) =>
  (3 * 24 * 60 * 60 * 1000) / interval;

const start = (website) => {
  metrics.push({
    website,
    rawSize: website.rawSize || computRawSizeForLastThreeDays(website.interval),
    computed: {},
    raw: [],
  });
};

const collect = (website, status, responseTime) => {
  const metric = metrics.find((element) => element.website.url === website.url);

  if (metric != null) {
    if (metric.raw.length >= metric.rawSize) {
      metric.raw.shift();
    }

    metric.raw.push({
      status,
      responseTime,
      ts: Date.now(),
    });
  }
};

const get = (url) => {
  const metric = metrics.find((element) => element.website.url === url);

  if (metric != null) {
    return {
      name: metric.website.name,
      url: metric.website.url,
      raw: metric.raw,
    };
  }

  throw new Error("Invalid URL");
};

module.exports = { start, collect, get };
