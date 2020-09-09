const config = require("config-yml");

const { monitor } = require("./monitor");

const load = () => {
  if (config.websites != null) {
    monitor(...config.websites);
  }
};

module.exports = { load };
