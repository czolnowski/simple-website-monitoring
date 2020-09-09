const express = require("express");

const { monitor } = require("./monitor");
const { get } = require("./metrics");

const port = process.env.API_PORT || 3000;

const app = express();
app.use(express.json());

app.get("/:url", (req, res) => {
  const { url } = req.params;

  try {
    res.json(get(url));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.post("/", (req, res) => {
  monitor(req.body);

  res.json(true);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

const start = () => {
  app.listen(port);
};

module.exports = { start };
