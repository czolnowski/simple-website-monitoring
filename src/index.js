const { load: loadWebsitesFromConfig } = require("./load-from-config");
const { start: startAPIServer } = require("./server");

loadWebsitesFromConfig();
startAPIServer();
